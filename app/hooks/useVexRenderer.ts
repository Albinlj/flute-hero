import { useEffect, useRef, useCallback } from "react";
import * as Vex from "vexflow";

export function useVexRenderer(width = 600, height = 200) {
  const rendererRef = useRef<Vex.Renderer | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const initializeRenderer = useCallback(() => {
    if (!canvasRef.current || rendererRef.current) return;

    const renderer = new Vex.Renderer(
      canvasRef.current,
      Vex.Renderer.Backends.CANVAS,
    );
    rendererRef.current = renderer;


    renderer.resize(width, height);
  }, [width, height]);

  useEffect(() => {
    initializeRenderer();

    return () => {
      rendererRef.current = null;
    };
  }, [initializeRenderer]);

  const setCanvasRef = useCallback((element: HTMLCanvasElement | null) => {
    canvasRef.current = element;
    if (element && !rendererRef.current) {
      initializeRenderer();
    }
  }, [initializeRenderer]);

  return [rendererRef, setCanvasRef, canvasRef] as const;
}
