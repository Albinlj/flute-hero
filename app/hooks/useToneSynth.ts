import { useEffect, useRef } from "react";
import * as Tone from "tone";
import { Note } from "tonal";

export function useToneSynth() {
  const synthRef = useRef<Tone.Synth | null>(null);

  // Initialize Tone.js synth
  useEffect(() => {
    synthRef.current = new Tone.Synth({
      oscillator: {
        type: "sine",
      },
      envelope: {
        attack: 0.1,
        decay: 0.2,
        sustain: 0.5,
        release: 0.3,
      },
    }).toDestination();

    return () => {
      if (synthRef.current) {
        synthRef.current.dispose();
      }
    };
  }, []);

  const playNote = (note: string, octave: number, duration: string | number = "8n") => {
    if (!synthRef.current) return;

    const noteName = `${note}${octave}`;
    const frequency = Note.freq(noteName);

    if (frequency) {
      // Ensure Tone.js context is started (required for browser autoplay policy)
      if (Tone.context.state !== "running") {
        Tone.start();
      }

      synthRef.current.triggerAttackRelease(frequency, duration);
    }
  };

  return { playNote };
}

