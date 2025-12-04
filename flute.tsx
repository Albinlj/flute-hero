import { useRef, useEffect, useState, useMemo } from "react";
import { implicitKeys, keys, type Key } from "fingering";
import flute from "./flute.svg";
import "./flute.css";

type Props = {
  keysPressed: Key[];
  onKeyClick?: (keyId: Key) => void;
  showIdLabels?: boolean;
};

export const Flute = ({ keysPressed, onKeyClick, showIdLabels = false }: Props) => {
  const [svg, setSvg] = useState<SVGSVGElement | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

  const implicitlyPressed: Key[] = useMemo(() => {
    return keysPressed.flatMap((key) => implicitKeys[key]);
  }, [keysPressed]);

  console.log("KEYS", keysPressed);
  console.log("IMPLICITLY PRESSED", implicitlyPressed);

  console.log("IMP", implicitlyPressed);

  return (
    <>
      {keys.map((key) => (
        <FluteKey
          fluteKey={key}
          isPressed={keysPressed.includes(key)}
          isImplicitlyPressed={implicitlyPressed.includes(key)}
          svg={svg}
        />
      ))}
      <div ref={containerRef} aria-label="Flute" />;
    </>
  );
};

const FluteKey = ({
  fluteKey,
  isPressed,
  isImplicitlyPressed,
  svg,
}: {
  fluteKey: Key;
  isPressed: boolean;
  isImplicitlyPressed: boolean;
  svg: SVGSVGElement | undefined;
}) => {
  const [group, setGroup] = useState<SVGGElement | undefined>(undefined);

  console.log([fluteKey, isPressed, isImplicitlyPressed]);

  useEffect(() => {
    if (!svg) return;

    const element = svg.getElementById(fluteKey);
    if (!element) throw new Error(`Element ${fluteKey} not found in SVG`);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGroup(element as SVGGElement);
  }, [fluteKey, isPressed, svg]);

  useEffect(() => {
    if (!group) return;
    if (isPressed) {
      group.setAttribute("pressed", "true");
    } else if (isImplicitlyPressed) {
      console.log("implicitly pressed", fluteKey);
      group.setAttribute("implicitly-pressed", "true");
    } else {
      group.removeAttribute("pressed");
    }

    return () => {
      group?.removeAttribute("pressed");
    };
  }, [group, isPressed, isImplicitlyPressed, fluteKey]);

  return null;
};
