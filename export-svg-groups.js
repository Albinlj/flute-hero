import fs from 'fs';
import { DOMParser, XMLSerializer } from '@xmldom/xmldom';
import puppeteer from 'puppeteer';

const SVG_FILE = './fingering.svg';
const OUTPUT_DIR = './exports';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Read SVG file
const svgContent = fs.readFileSync(SVG_FILE, 'utf-8');
const parser = new DOMParser();
const doc = parser.parseFromString(svgContent, 'image/svg+xml');

// Get root SVG element
const rootSvg = doc.documentElement;
const svgAttrs = {
  xmlns: rootSvg.getAttribute('xmlns'),
  'xmlns:xlink': rootSvg.getAttribute('xmlns:xlink'),
  'xmlns:inkscape': rootSvg.getAttribute('xmlns:inkscape'),
  version: rootSvg.getAttribute('version'),
  width: rootSvg.getAttribute('width'),
  height: rootSvg.getAttribute('height'),
  viewBox: rootSvg.getAttribute('viewBox'),
};

// Find all first-level <g> tags (direct children of root SVG)
const firstLevelGroups = Array.from(rootSvg.childNodes).filter(
  (node) => node.nodeName === 'g'
);

// Find all second-level <g> tags (direct children of first-level groups)
const secondLevelGroups = [];
for (const firstLevelGroup of firstLevelGroups) {
  const children = Array.from(firstLevelGroup.childNodes).filter(
    (node) => node.nodeName === 'g'
  );
  secondLevelGroups.push(...children);
}

console.log(`Found ${secondLevelGroups.length} second-level groups`);

// Find defs manually (xmldom doesn't support querySelector)
let defs = null;
for (const child of Array.from(rootSvg.childNodes)) {
  if (child.nodeName === 'defs') {
    defs = child;
    break;
  }
}

if (!defs) {
  console.log('Warning: defs section not found in SVG');
} else {
  console.log('Found defs section');
}

// Helper function to parse clip path bounds
function parseClipPathBounds(clipPathElement) {
  const pathElement = Array.from(clipPathElement.childNodes).find(
    (node) => node.nodeName === 'path'
  );
  if (!pathElement) return null;
  
  const transform = pathElement.getAttribute('transform') || '';
  let d = pathElement.getAttribute('d') || '';
  
  // Normalize whitespace - replace all whitespace with single spaces
  d = d.replace(/\s+/g, ' ').trim();
  
  // Parse rectangle from path: M x1 y1 H x2 V y2 H x1 Z
  // Handle both with and without spaces between commands
  // Pattern: M(number) (number)H(number)V(number)H(number)Z
  const match = d.match(/M\s*([\d.]+)\s+([\d.]+)\s*H\s*([\d.]+)\s*V\s*([\d.]+)\s*H\s*[\d.]+\s*Z/i);
  if (!match) {
    console.log(`Could not parse path: ${d}`);
    return null;
  }
  
  let x1 = parseFloat(match[1]);
  let y1 = parseFloat(match[2]);
  const x2 = parseFloat(match[3]);
  const y2 = parseFloat(match[4]);
  
  // Handle transform: matrix(1,0,0,-1,0,858.897) flips Y axis
  if (transform.includes('matrix(1,0,0,-1')) {
    const heightMatch = transform.match(/matrix\(1,0,0,-1,0,([\d.]+)\)/);
    if (heightMatch) {
      const svgHeight = parseFloat(heightMatch[1]);
      // Flip Y coordinates
      const tempY1 = svgHeight - y1;
      const tempY2 = svgHeight - y2;
      y1 = Math.min(tempY1, tempY2);
      const y2Flipped = Math.max(tempY1, tempY2);
      return {
        x: Math.min(x1, x2),
        y: y1,
        width: Math.abs(x2 - x1),
        height: Math.abs(y2Flipped - y1),
      };
    }
  }
  
  return {
    x: Math.min(x1, x2),
    y: Math.min(y1, y2),
    width: Math.abs(x2 - x1),
    height: Math.abs(y2 - y1),
  };
}

// Helper function to find clipPath by ID
function findClipPath(clipPathId) {
  if (!defs) return null;
  for (const child of Array.from(defs.childNodes)) {
    if (child.nodeName === 'clipPath' && child.getAttribute('id') === clipPathId) {
      return child;
    }
  }
  return null;
}

// Launch browser
const browser = await puppeteer.launch();
const page = await browser.newPage();

// Set viewport size based on SVG dimensions
const width = parseFloat(svgAttrs.width) || 612.288;
const height = parseFloat(svgAttrs.height) || 858.897;
await page.setViewport({ width: Math.ceil(width), height: Math.ceil(height) });

// Export each group
for (let i = 0; i < secondLevelGroups.length; i++) {
  const group = secondLevelGroups[i];
  
  // Extract clip path ID
  const clipPathAttr = group.getAttribute('clip-path');
  let clipBounds = null;
  if (clipPathAttr) {
    const clipPathIdMatch = clipPathAttr.match(/url\(#([^)]+)\)/);
    if (clipPathIdMatch) {
      const clipPathId = clipPathIdMatch[1];
      const clipPathElement = findClipPath(clipPathId);
      if (clipPathElement) {
        clipBounds = parseClipPathBounds(clipPathElement);
        if (!clipBounds) {
          console.log(`Warning: Could not parse clip path bounds for ${clipPathId}`);
        }
      } else {
        console.log(`Warning: Could not find clip path ${clipPathId}`);
      }
    }
  }
  
  // Create a new SVG with just this group
  const newSvg = doc.createElement('svg');
  Object.entries(svgAttrs).forEach(([key, value]) => {
    if (value) {
      newSvg.setAttribute(key, value);
    }
  });
  
  // Clone the defs section if it exists
  if (defs) {
    const clonedDefs = defs.cloneNode(true);
    newSvg.appendChild(clonedDefs);
  }
  
  // Clone the group
  const clonedGroup = group.cloneNode(true);
  newSvg.appendChild(clonedGroup);
  
  // Serialize to string
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(newSvg);
  
  try {
    // Ensure viewport matches SVG dimensions exactly for correct coordinate mapping
    const svgWidth = parseFloat(svgAttrs.width) || 612.288;
    const svgHeight = parseFloat(svgAttrs.height) || 858.897;
    await page.setViewport({ 
      width: Math.ceil(svgWidth), 
      height: Math.ceil(svgHeight) 
    });
    
    // Set SVG content directly with a simpler wait strategy
    await page.setContent(svgString, { 
      waitUntil: 'load',
      timeout: 10000 
    });
    
    // Small delay to ensure rendering
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Take screenshot
    const outputPath = `${OUTPUT_DIR}/group-${i.toString().padStart(3, '0')}.png`;
    const screenshotOptions = {
      path: outputPath,
      type: 'png',
      fullPage: false,
    };
    
    // Crop to clip path bounds if available
    if (clipBounds) {
      // Convert SVG coordinates to pixel coordinates
      // Since viewport matches SVG dimensions, coordinates map 1:1
      const clipX = Math.max(0, Math.round(clipBounds.x));
      const clipY = Math.max(0, Math.round(clipBounds.y));
      const clipWidth = Math.min(Math.ceil(svgWidth) - clipX, Math.round(clipBounds.width));
      const clipHeight = Math.min(Math.ceil(svgHeight) - clipY, Math.round(clipBounds.height));
      
      screenshotOptions.clip = {
        x: clipX,
        y: clipY,
        width: clipWidth,
        height: clipHeight,
      };
    }
    
    await page.screenshot(screenshotOptions);
    
    console.log(`Exported ${outputPath}${clipBounds ? ` (cropped to ${clipBounds.width.toFixed(2)}x${clipBounds.height.toFixed(2)} at ${clipBounds.x.toFixed(2)},${clipBounds.y.toFixed(2)})` : ' (no clip path)'}`);
  } catch (error) {
    console.error(`Error exporting group ${i}: ${error.message}`);
  }
}

await browser.close();
console.log('Done!');

