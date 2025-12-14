import { Flute } from "~/components/flute/Flute";
import { fingerings } from "~/lib/fingering";
import { useVexRenderer } from "~/hooks/useVexRenderer";
import { useVexStave } from "~/hooks/useVexStave";
import { useVexStaveNote } from "~/hooks/useVexStaveNote";

export function NoteDisplay({
  note,
  octave,
}: {
  note: string;
  octave: number;
}) {
  const [rendererRef, setCanvasRef] = useVexRenderer(100, 100);
  const staveRef = useVexStave(rendererRef, 0, 0, 99, "treble");
  useVexStaveNote(rendererRef, staveRef, note, octave);

  return <canvas ref={setCanvasRef} />;
}

export function FingeringsPage() {
  return (
    <div className="fingerings-page p-8 max-w-[1400px] mx-auto">
      <h1 className="mb-8 text-2xl font-bold">Flute Fingerings Chart</h1>

      <div className="flex flex-col gap-4">
        {fingerings.reverse().map((fingering) => {
          return (
            <div
              key={`${fingering.note}-${fingering.octave}`}
              className="bg-white p-6 rounded-lg shadow-md flex flex-row items-center gap-8"
            >
              <div className="flex flex-row items-center gap-4 min-w-[250px]">
                <h3 className="text-xl font-bold text-gray-800 min-w-[80px]">
                  {fingering.note}
                  <sub className="text-xs ml-1">{fingering.octave}</sub>
                </h3>
                <NoteDisplay note={fingering.note} octave={fingering.octave} />
              </div>
              <div className="flex-1 flex flex-wrap gap-8 justify-center items-center">
                {fingering.alternatives.map((alternative, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    {index === 0 && (
                      <span className="text-xs text-gray-600 font-bold">
                        Primary
                      </span>
                    )}
                    {index > 0 && alternative.description && (
                      <span className="text-xs text-gray-600">
                        {alternative.description}
                      </span>
                    )}
                    {index > 0 && !alternative.description && (
                      <span className="text-xs text-gray-600">Alt {index}</span>
                    )}
                    <Flute keysPressed={alternative.keys} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
