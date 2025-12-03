/**
 * Flute Fingering Chart Data Structure
 * 
 * This file contains type definitions and data for transverse flute fingerings,
 * including parts/key names and fingering patterns with alternative fingerings.
 */

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Represents a flute key/part with its name and position information
 */
export interface FlutePart {
  /** Unique identifier for the key/part */
  id: string;
  /** Display name of the key/part */
  name: string;
  /** Position description (e.g., "left hand thumb", "right hand index") */
  position: string;
  /** Optional description or notes about this part */
  description?: string;
}

/**
 * Represents the state of a single key in a fingering pattern
 */
export type KeyState = "open" | "closed" | "half" | "optional";

/**
 * Union type of all valid flute key names
 * Keys are named after the notes they produce, not after fingers
 */
export type KeyName =
  | "B♭ key"
  | "C key"
  | "Low C key"
  | "C# key"
  | "D key"
  | "D# key"
  | "D trill key"
  | "D# trill key"
  | "D trill lever"
  | "D# trill lever"
  | "D# lever"
  | "E key"
  | "F key"
  | "F# key"
  | "G key"
  | "G# key"
  | "G# lever"
  | "A key"
  | "B key"
  | "Ice lever"
  | "Roller key"
  | "Briccialdi key"
  | "F# connection plate"
  | "E mechanism arm";

/**
 * Union type of all valid flute key IDs
 * These are the unique identifiers for each key/part
 */
export type KeyId =
  | "b-flat-key"
  | "c-key"
  | "low-c-key"
  | "c-sharp-key"
  | "d-key"
  | "d-sharp-key"
  | "d-trill-key"
  | "d-sharp-trill-key"
  | "d-trill-lever"
  | "d-sharp-trill-lever"
  | "d-sharp-lever"
  | "e-key"
  | "f-key"
  | "f-sharp-key"
  | "g-key"
  | "g-sharp-key"
  | "g-sharp-lever"
  | "a-key"
  | "b-key"
  | "ice-lever"
  | "roller-key"
  | "briccialdi-key"
  | "f-sharp-connection-plate"
  | "e-mechanism-arm";

/**
 * Represents the state of all keys for a fingering pattern
 * Keys are indexed by their KeyId
 */
export type KeyStates = Partial<Record<KeyId, KeyState>>;

/**
 * Represents a single alternative fingering for a note
 * The first alternative in the array is considered the preferred fingering
 */
export interface FingeringAlternative {
  /** Key states for this fingering, indexed by KeyId */
  keys: KeyStates;
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
 * Complete fingering chart data structure
 */
export interface FingeringChart {
  /** Metadata about the chart */
  metadata: {
    /** Instrument type */
    instrument: string;
    /** Version of the chart data */
    version: string;
    /** Optional description */
    description?: string;
  };
  /** Flute parts/keys information */
  parts: FlutePart[];
  /** Fingering patterns for all notes */
  fingerings: Fingering[];
}

// ============================================================================
// Flute Parts Data
// ============================================================================

export const parts: FlutePart[] = [
  {
    id: "b-flat-key",
    name: "B♭ key",
    position: "left hand thumb",
    description: "B-flat key",
  },
  {
    id: "c-key",
    name: "C key",
    position: "main tube",
    description: "C key",
  },
  {
    id: "low-c-key",
    name: "Low C key",
    position: "foot joint",
    description: "Low C key",
  },
  {
    id: "c-sharp-key",
    name: "C# key",
    position: "main tube",
    description: "C# key",
  },
  {
    id: "d-key",
    name: "D key",
    position: "main tube",
    description: "D key",
  },
  {
    id: "d-sharp-key",
    name: "D# key",
    position: "main tube",
    description: "D# key",
  },
  {
    id: "d-trill-key",
    name: "D trill key",
    position: "main tube",
    description: "D trill key",
  },
  {
    id: "d-sharp-trill-key",
    name: "D# trill key",
    position: "main tube",
    description: "D# trill key",
  },
  {
    id: "d-trill-lever",
    name: "D trill lever",
    position: "main tube",
    description: "D trill lever",
  },
  {
    id: "d-sharp-trill-lever",
    name: "D# trill lever",
    position: "main tube",
    description: "D# trill lever",
  },
  {
    id: "d-sharp-lever",
    name: "D# lever",
    position: "main tube",
    description: "D# lever",
  },
  {
    id: "e-key",
    name: "E key",
    position: "main tube",
    description: "E key",
  },
  {
    id: "f-key",
    name: "F key",
    position: "main tube",
    description: "F key",
  },
  {
    id: "f-sharp-key",
    name: "F# key",
    position: "main tube",
    description: "F# key",
  },
  {
    id: "g-key",
    name: "G key",
    position: "main tube",
    description: "G key",
  },
  {
    id: "g-sharp-key",
    name: "G# key",
    position: "main tube",
    description: "G# key",
  },
  {
    id: "g-sharp-lever",
    name: "G# lever",
    position: "main tube",
    description: "G# lever",
  },
  {
    id: "a-key",
    name: "A key",
    position: "main tube",
    description: "A key",
  },
  {
    id: "b-key",
    name: "B key",
    position: "main tube",
    description: "B key",
  },
  {
    id: "ice-lever",
    name: "Ice lever",
    position: "main tube",
    description: "Ice lever (A#)",
  },
  {
    id: "roller-key",
    name: "Roller key",
    position: "foot joint",
    description: "Roller key",
  },
  {
    id: "briccialdi-key",
    name: "Briccialdi key",
    position: "main tube",
    description: "Briccialdi key",
  },
  {
    id: "f-sharp-connection-plate",
    name: "F# connection plate",
    position: "main tube",
    description: "F# connection plate",
  },
  {
    id: "e-mechanism-arm",
    name: "E mechanism arm",
    position: "main tube",
    description: "E mechanism arm",
  },
];

// ============================================================================
// Fingering Patterns Data
// ============================================================================

/**
 * Flute fingering chart data
 * 
 * Note: This is a template structure. Actual fingering data should be populated
 * from the fingering.pdf file. Each note can have multiple alternative fingerings.
 */
export const fingerings: Fingering[] = [
  // Standard flute fingerings - based on Boehm system
  // Note: "closed" means key is pressed down, "open" means key is not pressed
  {
    note: "C",
    octave: 4,
    alternatives: [
      {
        keys: {
          "b-flat-key": "closed",
          "c-key": "closed",
          "d-key": "closed",
          "e-key": "closed",
          "f-key": "closed",
          "g-key": "closed",
          "a-key": "closed",
          "b-key": "closed",
          "low-c-key": "closed",
        },
      },
    ],
  },
  {
    note: "C#",
    octave: 4,
    alternatives: [
      {
        keys: {
          "b-flat-key": "closed",
          "c-sharp-key": "closed",
          "d-key": "closed",
          "e-key": "closed",
          "f-key": "closed",
          "g-key": "closed",
          "a-key": "closed",
          "b-key": "closed",
        },
      },
    ],
  },
  {
    note: "D",
    octave: 4,
    alternatives: [
      {
        keys: {
          "b-flat-key": "open",
          "c-key": "closed",
          "d-key": "closed",
          "e-key": "closed",
          "f-key": "closed",
          "g-key": "closed",
          "a-key": "closed",
          "b-key": "closed",
        },
      },
    ],
  },
  {
    note: "D#",
    octave: 4,
    alternatives: [
      {
        keys: {
          "b-flat-key": "open",
          "c-key": "closed",
          "d-sharp-key": "closed",
          "e-key": "closed",
          "f-key": "closed",
          "g-key": "closed",
          "a-key": "closed",
          "b-key": "closed",
        },
      },
    ],
  },
  {
    note: "E",
    octave: 4,
    alternatives: [
      {
        keys: {
          "b-flat-key": "open",
          "c-key": "closed",
          "d-key": "closed",
          "e-key": "closed",
          "f-key": "closed",
          "g-key": "closed",
          "a-key": "closed",
          "b-key": "open",
        },
      },
    ],
  },
  {
    note: "F",
    octave: 4,
    alternatives: [
      {
        keys: {
          "b-flat-key": "open",
          "c-key": "closed",
          "d-key": "closed",
          "e-key": "closed",
          "f-key": "closed",
          "g-key": "closed",
          "a-key": "open",
          "b-key": "open",
        },
      },
    ],
  },
  {
    note: "F#",
    octave: 4,
    alternatives: [
      {
        keys: {
          "b-flat-key": "open",
          "c-key": "closed",
          "d-key": "closed",
          "e-key": "closed",
          "f-sharp-key": "closed",
          "g-key": "closed",
          "a-key": "open",
          "b-key": "open",
        },
      },
    ],
  },
  {
    note: "G",
    octave: 4,
    alternatives: [
      {
        keys: {
          "b-flat-key": "open",
          "c-key": "closed",
          "d-key": "closed",
          "e-key": "closed",
          "f-key": "open",
          "g-key": "closed",
          "a-key": "open",
          "b-key": "open",
        },
      },
    ],
  },
  {
    note: "G#",
    octave: 4,
    alternatives: [
      {
        keys: {
          "b-flat-key": "open",
          "c-key": "closed",
          "d-key": "closed",
          "e-key": "closed",
          "f-key": "open",
          "g-sharp-key": "closed",
          "a-key": "open",
          "b-key": "open",
        },
      },
      {
        keys: {
          "b-flat-key": "open",
          "c-key": "closed",
          "d-key": "closed",
          "e-key": "closed",
          "f-key": "open",
          "g-sharp-lever": "closed",
          "a-key": "open",
          "b-key": "open",
        },
        description: "Using G# lever (Ice lever)",
      },
    ],
  },
  {
    note: "A",
    octave: 4,
    alternatives: [
      {
        keys: {
          "b-flat-key": "open",
          "c-key": "closed",
          "d-key": "closed",
          "e-key": "closed",
          "f-key": "open",
          "g-key": "open",
          "a-key": "closed",
          "b-key": "open",
        },
      },
    ],
  },
  {
    note: "A#",
    octave: 4,
    alternatives: [
      {
        keys: {
          "b-flat-key": "open",
          "c-key": "closed",
          "d-key": "closed",
          "e-key": "closed",
          "f-key": "open",
          "g-key": "open",
          "ice-lever": "closed",
          "b-key": "open",
        },
        description: "Using Ice lever (A#)",
      },
    ],
  },
  {
    note: "B",
    octave: 4,
    alternatives: [
      {
        keys: {
          "b-flat-key": "open",
          "c-key": "closed",
          "d-key": "closed",
          "e-key": "open",
          "f-key": "open",
          "g-key": "open",
          "a-key": "open",
          "b-key": "closed",
        },
      },
    ],
  },
  {
    note: "C",
    octave: 5,
    alternatives: [
      {
        keys: {
          "b-flat-key": "open",
          "c-key": "closed",
          "d-key": "open",
          "e-key": "open",
          "f-key": "open",
          "g-key": "open",
          "a-key": "open",
          "b-key": "open",
        },
      },
    ],
  },
  // Add more fingerings here based on fingering.pdf
];

// ============================================================================
// Complete Chart Export
// ============================================================================

export const fingeringChart: FingeringChart = {
  metadata: {
    instrument: "transverse flute",
    version: "1.0.0",
    description: "Fingering chart for transverse flute with alternative fingerings",
  },
  parts,
  fingerings,
};

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
  return fingerings.find(
    (f) => f.note === note && f.octave === octave
  );
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

