import { useEffect, type RefObject } from "react";
import * as Vex from "vexflow";

export function useVexNoteRenderer(
  rendererRef: RefObject<Vex.Renderer | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  detectedNote: string | null,
  frequency: number | null
) {
  useEffect(() => {
    if (!rendererRef.current || !detectedNote || !frequency) return;

    const renderer = rendererRef.current;
    const ctx = renderer.getContext();
    
    // Clear the canvas
    if (canvasRef.current) {
      const canvasCtx = canvasRef.current.getContext('2d');
      if (canvasCtx) {
        canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }

    const stave = new Vex.Stave(10, 40, 580);
    stave.addClef("treble");
    stave.setContext(ctx).draw();

    try {
      // Convert note name to VexFlow format (e.g., "A4" -> "a/4", "C#5" -> "c#/5")
      // Extract note letter, accidental, and octave
      const match = detectedNote.match(/^([A-G])([#b]?)(\d+)$/);
      if (!match) {
        console.warn("Could not parse note:", detectedNote);
        return;
      }

      const [, noteLetter, accidental, octave] = match;
      const noteName = `${noteLetter.toLowerCase()}${accidental}/${octave}`;

      const staveNote = new Vex.StaveNote({
        clef: "treble",
        keys: [noteName],
        duration: "w",
      });

      // Add accidental if needed (VexFlow v5 API)
      if (accidental === "#") {
        staveNote.addModifier(new Vex.Accidental("#"), 0);
      } else if (accidental === "b") {
        staveNote.addModifier(new Vex.Accidental("b"), 0);
      }

      const voice = new Vex.Voice({ numBeats: 4, beatValue: 4 });
      voice.addTickables([staveNote]);

      const formatter = new Vex.Formatter().joinVoices([voice]).format([voice], 550);
      voice.draw(ctx, stave);
    } catch (err) {
      console.error("Error rendering note:", err);
    }
  }, [rendererRef, canvasRef, detectedNote, frequency]);
}

