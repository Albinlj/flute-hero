export const implicitKeys: Record<Key, [Key[], Key[]]> = {
  "roller-key": [["c#-key"], []],
  "d#-lever": [[], ["d#-key"]],
  "d-trill-lever": [[], ["d-trill-key"]],
  "d#-trill-lever": [[], ["d#-trill-key"]],
  "e-mechanism-arm": [[], []],
  "ice-lever-a#": [["b♭-key"], []],
  "briccialdi-key": [["b-key", "ice-lever-a#", "b♭-key"], []],
  "g#-key": [[], []],
  "g-key": [["g#-key"], []],
  "g#-lever": [["g#-lever"], []],
  "b-key": [[], []],
  "c-key": [["c-lid"], []],
  "c#-key": [[], []],
  "d-key": [["f#-key"], []],
  "d#-key": [[], []],
  "e-key": [["g#-key", "f#-key"], []],
  "f-key": [["f#-key"], []],
  "f#-key": [[], []],
  "c-lid": [["c-key"], []],
  "low-c-key": [["c#-key", "roller-key", "roller"], []],
  "a-key": [["b♭-key", "ice-lever-a#"], []],
  roller: [["roller-key", "c#-key", "low-c-key"], []],
  "d#-trill-key": [[], []],
  "d-trill-key": [[], []],
  "b♭-key": [["ice-lever-a#"], []],
};

export const keys = [
  "c-key",
  "b♭-key",
  "a-key",
  "g-key",
  "g#-key",
  "f#-key",
  "f-key",
  "e-key",
  "d-key",
  "d#-key",
  "c#-key",
  "low-c-key",

  "g#-lever",
  "ice-lever-a#",
  "d-trill-lever",
  "d#-trill-lever",
  "d#-lever",
  "roller-key",
  "roller",

  "d#-trill-key",
  "d-trill-key",
  "briccialdi-key",
  "e-mechanism-arm",
  "b-key",
  "c-lid",
] as const;

export type Key = (typeof keys)[number];

/**
 * Represents a single alternative fingering for a note
 * The first alternative in the array is considered the preferred fingering
 */
export interface FingeringAlternative {
  /** Keys that are pressed (closed) for this fingering */
  keys: Key[];
  /** Whether this fingering is useful for trills */
  trillFriendly?: boolean;
  /** Optional description or use case for this alternative */
  description?: string;
}

/**
 * Represents a fingering pattern for a specific note
 */
export interface Fingering {
  /** Note name (e.g., "C", "C#", "Bb") */
  note: string;
  /** Octave number (typically 4-7 for flute) */
  octave: number;
  /** Array of alternative fingerings for this note */
  alternatives: FingeringAlternative[];
}

/**
 * Flute fingering chart data
 *
 * Note: This is a template structure. Actual fingering data should be populated
 * from the fingering.pdf file. Each note can have multiple alternative fingerings.
 */
export const fingerings: Fingering[] = [
  // Standard flute fingerings - based on Boehm system
  // Note: Only closed (pressed) keys are included
  {
    note: "C",
    octave: 4,
    alternatives: [
      {
        keys: [
          "c-key",
          // "b♭-key",
          "a-key",
          "g-key",
          // "g#-key",
          // "f#-key",
          "f-key",
          "e-key",
          "d-key",
          "d#-key",
          "c#-key",
          "low-c-key",

          // "g#-lever",
          // "e-mechanism-arm",
          // "ice-lever-a#",
          // "d-trill-lever",
          // "d#-trill-lever",

          // "d#-lever",
          "roller-key",
          "roller",

          // "d#-trill-key",
          // "d-trill-key",
          // "briccialdi-key",
          "b-key",
          // "c-lid",
        ],
      },
    ],
  },
  {
    note: "C#",
    octave: 4,
    alternatives: [
      {
        keys: [
          "c-key",
          // "b♭-key",
          "a-key",
          "g-key",
          // "g#-key",
          // "f#-key",
          "f-key",
          "e-key",
          "d-key",
          "d#-key",
          "c#-key",
          "low-c-key",

          // "g#-lever",
          // "e-mechanism-arm",
          // "ice-lever-a#",
          // "d-trill-lever",
          // "d#-trill-lever",

          // "d#-lever",
          "roller-key",
          // "roller",

          // "d#-trill-key",
          // "d-trill-key",
          // "briccialdi-key",
          "b-key",
          // "c-lid",
        ],
      },
    ],
  },
  {
    note: "D",
    octave: 4,
    alternatives: [
      {
        keys: [
          "c-key",
          // "b♭-key",
          "a-key",
          "g-key",
          // "g#-key",
          // "f#-key",
          "f-key",
          "e-key",
          "d-key",
          "d#-key",
          "c#-key",
          "low-c-key",

          // "g#-lever",
          // "e-mechanism-arm",
          // "ice-lever-a#",
          // "d-trill-lever",
          // "d#-trill-lever",

          // "d#-lever",
          // "roller-key",
          // "roller",

          // "d#-trill-key",
          // "d-trill-key",
          // "briccialdi-key",
          "b-key",
          // "c-lid",
        ],
      },
    ],
  },
  {
    note: "D#",
    octave: 4,
    alternatives: [
      {
        keys: [
          "c-key",
          // "b♭-key",
          "a-key",
          "g-key",
          // "g#-key",
          // "f#-key",
          "f-key",
          "e-key",
          "d-key",
          "d#-key",
          "c#-key",
          "low-c-key",

          // "g#-lever",
          // "e-mechanism-arm",
          // "ice-lever-a#",
          // "d-trill-lever",
          // "d#-trill-lever",

          "d#-lever",
          // "roller-key",
          // "roller",

          // "d#-trill-key",
          // "d-trill-key",
          // "briccialdi-key",
          "b-key",
          // "c-lid",
        ],
      },
    ],
  },
  {
    note: "E",
    octave: 4,
    alternatives: [
      {
        keys: [
          "c-key",
          // "b♭-key",
          "a-key",
          "g-key",
          // "g#-key",
          // "f#-key",
          "f-key",
          "e-key",
          // "d-key",
          "d#-key",
          "c#-key",
          "low-c-key",

          // "g#-lever",
          // "e-mechanism-arm",
          // "ice-lever-a#",
          // "d-trill-lever",
          // "d#-trill-lever",

          "d#-lever",
          // "roller-key",
          // "roller",

          // "d#-trill-key",
          // "d-trill-key",
          // "briccialdi-key",
          "b-key",
          // "c-lid",
        ],
      },
    ],
  },
  {
    note: "F",
    octave: 4,
    alternatives: [
      {
        keys: [
          "c-key",
          // "b♭-key",
          "a-key",
          "g-key",
          // "g#-key",
          // "f#-key",
          "f-key",
          // "e-key",
          // "d-key",
          "d#-key",
          "c#-key",
          "low-c-key",

          // "g#-lever",
          // "e-mechanism-arm",
          // "ice-lever-a#",
          // "d-trill-lever",
          // "d#-trill-lever",

          "d#-lever",
          // "roller-key",
          // "roller",

          // "d#-trill-key",
          // "d-trill-key",
          // "briccialdi-key",
          "b-key",
          // "c-lid",
        ],
      },
    ],
  },
  {
    note: "F#",
    octave: 4,
    alternatives: [
      {
        keys: [
          "c-key",
          // "b♭-key",
          "a-key",
          "g-key",
          // "g#-key",
          // "f#-key",
          // "f-key",
          // "e-key",
          "d-key",
          "d#-key",
          // "c#-key",
          // "low-c-key",

          // "g#-lever",
          // "e-mechanism-arm",
          // "ice-lever-a#",
          // "d-trill-lever",
          // "d#-trill-lever",

          "d#-lever",
          // "roller-key",
          // "roller",

          // "d#-trill-key",
          // "d-trill-key",
          // "briccialdi-key",
          "b-key",
          // "c-lid",
        ],
      },
      {
        keys: [
          "c-key",
          // "b♭-key",
          "a-key",
          "g-key",
          // "g#-key",
          // "f#-key",
          // "f-key",
          "e-key",
          // "d-key",
          "d#-key",
          // "c#-key",
          // "low-c-key",

          // "g#-lever",
          // "e-mechanism-arm",
          // "ice-lever-a#",
          // "d-trill-lever",
          // "d#-trill-lever",

          "d#-lever",
          // "roller-key",
          // "roller",

          // "d#-trill-key",
          // "d-trill-key",
          // "briccialdi-key",
          "b-key",
          // "c-lid",
        ],
      },
    ],
  },
  {
    note: "G",
    octave: 4,
    alternatives: [
      {
        keys: [
          "c-key",
          // "b♭-key",
          "a-key",
          "g-key",
          // "g#-key",
          // "f#-key",
          // "f-key",
          // "e-key",
          // "d-key",
          // "d#-key",
          // "c#-key",
          // "low-c-key",

          // "g#-lever",
          // "e-mechanism-arm",
          // "ice-lever-a#",
          // "d-trill-lever",
          // "d#-trill-lever",

          "d#-lever",
          // "roller-key",
          // "roller",

          // "d#-trill-key",
          // "d-trill-key",
          // "briccialdi-key",
          "b-key",
          // "c-lid",
        ],
      },
    ],
  },
  {
    note: "G#",
    octave: 4,
    alternatives: [
      {
        keys: [
          "c-key",
          // "b♭-key",
          "a-key",
          "g-key",
          // "g#-key",
          // "f#-key",
          // "f-key",
          // "e-key",
          // "d-key",
          // "d#-key",
          // "c#-key",
          // "low-c-key",

          "g#-lever",
          // "e-mechanism-arm",
          // "ice-lever-a#",
          // "d-trill-lever",
          // "d#-trill-lever",

          "d#-lever",
          // "roller-key",
          // "roller",

          // "d#-trill-key",
          // "d-trill-key",
          // "briccialdi-key",
          "b-key",
          // "c-lid",
        ],
      },
    ],
  },
  {
    note: "A",
    octave: 4,
    alternatives: [
      {
        keys: [
          "c-key",
          // "b♭-key",
          "a-key",
          // "g-key",
          // "g#-key",
          // "f#-key",
          // "f-key",
          // "e-key",
          // "d-key",
          // "d#-key",
          // "c#-key",
          // "low-c-key",

          // "g#-lever",
          // "e-mechanism-arm",
          // "ice-lever-a#",
          // "d-trill-lever",
          // "d#-trill-lever",

          "d#-lever",
          // "roller-key",
          // "roller",

          // "d#-trill-key",
          // "d-trill-key",
          // "briccialdi-key",
          "b-key",
          // "c-lid",
        ],
      },
      {
        keys: [
          "c-key",
          // "b♭-key",
          "a-key",
          // "g-key",
          // "g#-key",
          // "f#-key",
          "f-key",
          // "e-key",
          "d-key",
          // "d#-key",
          // "c#-key",
          // "low-c-key",

          "g#-lever",
          // "e-mechanism-arm",
          // "ice-lever-a#",
          // "d-trill-lever",
          // "d#-trill-lever",

          "d#-lever",
          // "roller-key",
          // "roller",

          // "d#-trill-key",
          // "d-trill-key",
          // "briccialdi-key",
          "b-key",
          // "c-lid",
        ],
        description: "Using G# lever",
      },
    ],
  },
  {
    note: "A#",
    octave: 4,
    alternatives: [
      {
        keys: [
          "c-key",
          // "b♭-key",
          // "a-key",
          // "g-key",
          // "g#-key",
          // "f#-key",
          "f-key",
          // "e-key",
          // "d-key",
          // "d#-key",
          // "c#-key",
          // "low-c-key",

          // "g#-lever",
          // "e-mechanism-arm",
          // "ice-lever-a#",
          // "d-trill-lever",
          // "d#-trill-lever",

          "d#-lever",
          // "roller-key",
          // "roller",

          // "d#-trill-key",
          // "d-trill-key",
          // "briccialdi-key",
          "b-key",
          // "c-lid",
        ],
        description: "Using G# lever",
      },
    ],
  },
  {
    note: "B",
    octave: 4,
    alternatives: [
      {
        keys: [
          "c-key",
          // "b♭-key",
          // "a-key",
          // "g-key",
          // "g#-key",
          // "f#-key",
          // "f-key",
          // "e-key",
          // "d-key",
          // "d#-key",
          // "c#-key",
          // "low-c-key",

          // "g#-lever",
          // "e-mechanism-arm",
          // "ice-lever-a#",
          // "d-trill-lever",
          // "d#-trill-lever",

          "d#-lever",
          // "roller-key",
          // "roller",

          // "d#-trill-key",
          // "d-trill-key",
          // "briccialdi-key",
          "b-key",
          // "c-lid",
        ],
      },
    ],
  },
  {
    note: "C",
    octave: 5,
    alternatives: [
      {
        keys: [
          "c-key",
          // "b♭-key",
          // "a-key",
          // "g-key",
          // "g#-key",
          // "f#-key",
          // "f-key",
          // "e-key",
          // "d-key",
          // "d#-key",
          // "c#-key",
          // "low-c-key",

          // "g#-lever",
          // "e-mechanism-arm",
          // "ice-lever-a#",
          // "d-trill-lever",
          // "d#-trill-lever",

          "d#-lever",
          // "roller-key",
          // "roller",

          // "d#-trill-key",
          // "d-trill-key",
          // "briccialdi-key",
          // "b-key",
          // "c-lid",
        ],
      },
      {
        keys: [
          "c-key",
          // "b♭-key",
          "a-key",
          "g-key",
          // "g#-key",
          // "f#-key",
          "f-key",
          "e-key",
          "d-key",
          // "d#-key",
          // "c#-key",
          // "low-c-key",

          // "g#-lever",
          // "e-mechanism-arm",
          // "ice-lever-a#",
          // "d-trill-lever",
          // "d#-trill-lever",

          // "d#-lever",
          "roller-key",
          "roller",

          // "d#-trill-key",
          // "d-trill-key",
          // "briccialdi-key",
          // "b-key",
          // "c-lid",
        ],
      },
    ],
  },
  // Add more fingerings here based on fingering.pdf
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Find fingerings for a specific note and octave
 */
export function findFingering(
  note: string,
  octave: number
): Fingering | undefined {
  return fingerings.find((f) => f.note === note && f.octave === octave);
}

/**
 * Get all alternative fingerings for a note
 */
export function getAlternatives(
  note: string,
  octave: number
): FingeringAlternative[] {
  const fingering = findFingering(note, octave);
  return fingering?.alternatives || [];
}

/**
 * Get the preferred fingering for a note
 * The preferred fingering is the first alternative in the array
 */
export function getPreferredFingering(
  note: string,
  octave: number
): FingeringAlternative | undefined {
  const alternatives = getAlternatives(note, octave);
  return alternatives[0];
}

/**
 * Get all fingerings for a specific octave
 */
export function getFingeringsByOctave(octave: number): Fingering[] {
  return fingerings.filter((f) => f.octave === octave);
}

/**
 * Get all unique note names across all octaves
 */
export function getAllNoteNames(): string[] {
  const noteSet = new Set(fingerings.map((f) => f.note));
  return Array.from(noteSet).sort();
}
