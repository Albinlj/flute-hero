export function parseNoteToVexFlow(note: string, octave: number): { noteName: string; accidental: string } | null {
  const match = note.match(/^([A-G])([#b]?)$/);
  if (!match) {
    console.warn("Could not parse note:", note);
    return null;
  }

  const [, noteLetter, accidental] = match;
  const noteName = `${noteLetter.toLowerCase()}${accidental}/${octave}`;
  return { noteName, accidental };
}
