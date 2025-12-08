import { useLayoutEffect, useRef, type RefObject } from "react";
import * as Vex from "vexflow";

export function useVexStave(
  rendererRef: RefObject<Vex.Renderer | null>,
  x: number = 10,
  y: number = 40,
  width: number = 280,
  clef: string = "treble"
) {
  const staveRef = useRef<Vex.Stave | null>(null);

  useLayoutEffect(() => {
    if (!rendererRef.current) return;

    const renderer = rendererRef.current;
    const ctx = renderer.getContext();

    const stave = new Vex.Stave(x, y, width);
    stave.addClef(clef);
    stave.setContext(ctx).draw();
    staveRef.current = stave;

    return () => {
      if (rendererRef.current) {
        const cleanupCtx = rendererRef.current.getContext();
        // Clear the stave area (approximate height of 100px to cover stave and notes)
        cleanupCtx.clearRect(x - 5, y - 20, width + 10, 100);
      }
      staveRef.current = null;
    };
  }, [rendererRef, x, y, width, clef]);

  return staveRef;
}
