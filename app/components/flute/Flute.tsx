import { useRef, useEffect, useState, useMemo } from "react";
import { implicitKeys, keys, type Key } from "~/lib/fingering";
import flute from "./flute.svg";
import "./flute.css";

type Props = {
  keysPressed: Key[];
  onKeyClick?: (keyId: Key) => void;
  showIdLabels?: boolean;
};

const useFluteSvg = () => {
  const [svg, setSvg] = useState<SVGSVGElement | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let appendedSvg: SVGSVGElement | null = null;

    const container = containerRef.current;
    if (!container) return;

    const abortController = new AbortController();

    fetch(flute, { signal: abortController.signal })
      .then((res) => res.text())
      .then((svgText) => {
        if (abortController.signal.aborted) return;

        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, "image/svg+xml");
        const svgElement = doc.querySelector("svg");
        if (
          svgElement &&
          containerRef.current === container &&
          !container.hasChildNodes()
        ) {
          svgElement.setAttribute("width", "100%");
          svgElement.setAttribute("height", "100%");
          svgElement.classList.add("flute");
          container.appendChild(svgElement);
          appendedSvg = svgElement as SVGSVGElement;
          setSvg(appendedSvg);
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          throw err;
        }
      });

    return () => {
      abortController.abort();
      if (container && appendedSvg && container.contains(appendedSvg)) {
        container.removeChild(appendedSvg);
      }
    };
  }, []);

  return { svg, containerRef };
};

export const Flute = ({
  keysPressed,
  onKeyClick: _onKeyClick,
  showIdLabels: _showIdLabels = false,
}: Props) => {
  const { svg, containerRef } = useFluteSvg();

  const implicitlyPressed: Key[] = useMemo(() => {
    const pressed = keysPressed.flatMap((key) => implicitKeys[key][0]);
    const notPressed = keys
      .filter((key) => !keysPressed.includes(key))
      .flatMap((key) => implicitKeys[key][1]);
    return [...pressed, ...notPressed];
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
  const group = useFluteGroup(fluteKey, svg);

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
  }, [fluteKey, group, isImplicitlyPressed, isPressed]);

  return null;
};

const useFluteGroup = (fluteKey: Key, svg?: SVGSVGElement) =>
  useMemo(() => {
    if (!svg) return undefined;
    const element = svg.getElementById(fluteKey);
    if (!element) throw new Error(`Element ${fluteKey} not found in SVG`);
    return element as SVGGElement;
  }, [fluteKey, svg]);
