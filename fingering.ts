export const implicitKeys: Record<Key, Key[]> = {
  "roller-key": ["roller-key", "roller"],
  "d#-lever": ["d#-lever", "d#-trill-lever"],
  "d-trill-lever": ["d-trill-lever", "d#-trill-lever"],
  "e-mechanism-ar": ["e-mechanism-ar"],
  "ice-lever-a#": ["ice-lever-a#"],
  "briccialdi-key": ["briccialdi-key"],
  "g#-key": ["g#-key"],
  "g-key": ["g-key"],
  "g#-lever": ["g#-lever"],
  "b-key": ["b-key"],
  "c-key": ["c-key", "briccialdi-key"],
  "c#-key": ["c#-key"],
  "d-key": ["d-key"],
  "d#-key": ["d#-key"],
  "e-key": ["e-key", "d#-key"],
  "f-key": ["f-key", "f#-key"],
  "f#-key": ["f#-key", "f-key"],
  "c-lid": ["c-lid", "c-key"],
  "low-c-key": ["low-c-key"],
  "a-key": ["a-key"],
  "d#-trill-lever": ["d#-trill-lever"],
  roller: ["roller-key", "roller"],
};

export const keys = [
  "roller-key",
  "roller",
  "d#-lever",
  "low-c-key",
  "c#-key",
  "d#-key",
  "d-key",
  "e-key",
  "f-key",
  "f#-key",
  "a-key",
  "d#-trill-lever",
  "d-trill-lever",
  "e-mechanism-ar",
  "ice-lever-a#",
  "briccialdi-key",
  "g#-key",
  "g-key",
  "g#-lever",
  "b-key",
  "c-key",
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
        ],
      },
    ],
  },
  {
    note: "C#",
    octave: 4,
    alternatives: [
      {
        keys: ["c#-key", "d-key", "e-key", "f-key", "g-key", "a-key", "b-key"],
      },
    ],
  },
  {
    note: "D",
    octave: 4,
    alternatives: [
      {
        keys: ["c-key", "d-key", "e-key", "f-key", "g-key", "a-key", "b-key"],
      },
    ],
  },
  {
    note: "D#",
    octave: 4,
    alternatives: [
      {
        keys: ["c-key", "d#-key", "e-key", "f-key", "g-key", "a-key", "b-key"],
      },
    ],
  },
  {
    note: "E",
    octave: 4,
    alternatives: [
      {
        keys: ["c-key", "d-key", "e-key", "f-key", "g-key", "a-key"],
      },
    ],
  },
  {
    note: "F",
    octave: 4,
    alternatives: [
      {
        keys: ["c-key", "d-key", "e-key", "f-key", "g-key"],
      },
    ],
  },
  {
    note: "F#",
    octave: 4,
    alternatives: [
      {
        keys: ["c-key", "d-key", "e-key", "f#-key", "g-key"],
      },
    ],
  },
  {
    note: "G",
    octave: 4,
    alternatives: [
      {
        keys: ["c-key", "d-key", "e-key", "g-key"],
      },
    ],
  },
  {
    note: "G#",
    octave: 4,
    alternatives: [
      {
        keys: ["c-key", "d-key", "e-key", "g#-key"],
      },
      {
        keys: ["c-key", "d-key", "e-key", "g#-lever"],
        description: "Using G# lever",
      },
    ],
  },
  {
    note: "A",
    octave: 4,
    alternatives: [
      {
        keys: ["c-key", "d-key", "e-key", "a-key"],
      },
    ],
  },
  {
    note: "A#",
    octave: 4,
    alternatives: [
      {
        keys: ["c-key", "d-key", "e-key", "ice-lever-a#"],
        description: "Using Ice lever (A#)",
      },
    ],
  },
  {
    note: "B",
    octave: 4,
    alternatives: [
      {
        keys: ["c-key", "d-key", "b-key"],
      },
    ],
  },
  {
    note: "C",
    octave: 5,
    alternatives: [
      {
        keys: ["c-key"],
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
