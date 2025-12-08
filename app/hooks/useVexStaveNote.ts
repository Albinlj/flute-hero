import { useLayoutEffect, type RefObject } from "react";
import * as Vex from "vexflow";
import { parseNoteToVexFlow } from "~/lib/utils";

export function useVexStaveNote(
  rendererRef: RefObject<Vex.Renderer | null>,
  staveRef: RefObject<Vex.Stave | null>,
  note: string | null,
  octave: number | null
) {
  useLayoutEffect(() => {
    if (!rendererRef.current || !staveRef.current || !note || octave === null) return;

    const renderer = rendererRef.current;
    const ctx = renderer.getContext();
    const stave = staveRef.current;

    try {
      const parsed = parseNoteToVexFlow(note, octave);
      if (!parsed) return;

      const { noteName, accidental } = parsed;

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

      new Vex.Formatter().joinVoices([voice]).format([voice], 550);
      voice.draw(ctx, stave);
    } catch (err) {
      console.error("Error rendering note:", err);
    }

  }, [rendererRef, staveRef, note, octave]);
}
