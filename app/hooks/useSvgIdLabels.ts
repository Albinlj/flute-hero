import { useEffect, type RefObject } from "react";

/**
 * Hook that adds text labels above each SVG element that has an ID.
 * Useful for debugging and identifying SVG parts.
 */
export function useSvgIdLabels(svgRef: RefObject<SVGSVGElement | null>) {
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Find all elements with IDs in the SVG
    const elementsWithIds = svg.querySelectorAll("[id]");
    
    // Create a container group for all labels (for easy cleanup)
    const labelsGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    labelsGroup.setAttribute("class", "svg-id-labels");
    svg.appendChild(labelsGroup);

    // Get SVG viewBox to handle coordinate transformations
    const viewBox = svg.viewBox.baseVal;
    const svgRect = svg.getBoundingClientRect();
    const scaleX = viewBox.width / svgRect.width;
    const scaleY = viewBox.height / svgRect.height;

    elementsWithIds.forEach((element) => {
      if (!(element instanceof SVGElement)) return;

      const id = element.id;
      if (!id) return;

      try {
        // Get bounding box of the element in SVG coordinates
        let bbox: DOMRect;
        
        if (element instanceof SVGGraphicsElement && element.getBBox) {
          // Use getBBox() for SVG elements (more accurate for SVG coordinates)
          bbox = element.getBBox();
        } else {
          // Fallback to getBoundingClientRect() for non-SVG elements
          const rect = element.getBoundingClientRect();
          bbox = new DOMRect(
            (rect.left - svgRect.left) * scaleX + viewBox.x,
            (rect.top - svgRect.top) * scaleY + viewBox.y,
            rect.width * scaleX,
            rect.height * scaleY
          );
        }

        // Create text element
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        const textX = bbox.x + bbox.width / 2;
        const textY = bbox.y - 5; // Position above the element
        text.setAttribute("x", String(textX));
        text.setAttribute("y", String(textY));
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("font-size", "8");
        text.setAttribute("fill", "#000000");
        text.setAttribute("font-family", "Arial, sans-serif");
        text.setAttribute("pointer-events", "none"); // Don't interfere with interactions
        text.textContent = id;

        // Temporarily add text to get its bounding box
        labelsGroup.appendChild(text);
        const textBBox = text.getBBox();

        // Add background rectangle for better visibility
        const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bgRect.setAttribute("x", String(textBBox.x - 2));
        bgRect.setAttribute("y", String(textBBox.y - 2));
        bgRect.setAttribute("width", String(textBBox.width + 4));
        bgRect.setAttribute("height", String(textBBox.height + 4));
        bgRect.setAttribute("fill", "rgba(255, 255, 255, 0.8)");
        bgRect.setAttribute("stroke", "#000000");
        bgRect.setAttribute("stroke-width", "0.5");
        bgRect.setAttribute("pointer-events", "none");

        // Insert background before text
        labelsGroup.insertBefore(bgRect, text);
      } catch (error) {
        // Some elements might not have valid bounding boxes
        console.warn(`Could not get bounding box for element with id "${id}":`, error);
      }
    });

    // Cleanup function
    return () => {
      const labelsGroup = svg.querySelector(".svg-id-labels");
      if (labelsGroup) {
        labelsGroup.remove();
      }
    };
  }, [svgRef]);
}

