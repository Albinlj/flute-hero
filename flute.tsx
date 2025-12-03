import { useRef, useEffect, useState } from "react";
import type { Key } from "fingering";
import flute from "./flute.svg";
import "./flute.css";

type Props = {
  keys: Key[];
  onKeyClick?: (keyId: Key) => void;
  showIdLabels?: boolean;
};

export const Flute = ({ keys, onKeyClick, showIdLabels = false }: Props) => {
  const [svg, setSvg] = useState<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    fetch(flute)
      .then((res) => res.text())
      .then((svgText) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, "image/svg+xml");
        const svgElement = doc.querySelector("svg");
        if (svgElement) {
          svgElement.setAttribute("width", "100%");
          svgElement.setAttribute("height", "100%");
          svgElement.classList.add("flute");
          container.appendChild(svgElement);
          setSvg(svgElement as SVGSVGElement);
        }
      });

    return () => {
      container.innerHTML = "";
    };
  }, []);


  useEffect(() => {
    if (!svg) return;

    for (const key of keys) {
      console.log(key);
      const element = svg.getElementById(key);
      if (element) {
        element.setAttribute("pressed", "true");
      }
    }

    return () => {
      for (const key of keys) {
        const element = svg.getElementById(key);
        if (element) {
          element.removeAttribute("pressed");
        }
      }
    };
  }, [keys, svg]);

  return <div ref={containerRef} aria-label="Flute" />;
};
