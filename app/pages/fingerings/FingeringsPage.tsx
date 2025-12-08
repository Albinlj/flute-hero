import { Flute } from "~/components/flute/Flute";
import { fingerings } from "~/lib/fingering";
import { useVexRenderer } from "~/hooks/useVexRenderer";
import { useVexStave } from "~/hooks/useVexStave";
import { useVexStaveNote } from "~/hooks/useVexStaveNote";

function NoteDisplay({ note, octave }: { note: string; octave: number }) {
  const [rendererRef, setCanvasRef] = useVexRenderer(200, 200);
  const staveRef = useVexStave(rendererRef);
  useVexStaveNote(rendererRef, staveRef, note, octave);

  return (
    <canvas ref={setCanvasRef} className="border border-gray-200 rounded" />
  );
}

export function FingeringsPage() {
  const fingeringsByOctave = fingerings.reduce(
    (acc, fingering) => {
      if (!acc[fingering.octave]) {
        acc[fingering.octave] = [];
      }
      acc[fingering.octave].push(fingering);
      return acc;
    },
    {} as Record<number, typeof fingerings>
  );

  const octaves = Object.keys(fingeringsByOctave)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="fingerings-page p-8 max-w-[1400px] mx-auto">
      <h1 className="mb-8 text-2xl font-bold">Flute Fingerings Chart</h1>

      {octaves.map((octave) => {
        const octaveFingerings = fingeringsByOctave[octave];

        return (
          <div key={octave} className="mb-12">
            <h2 className="text-xl font-bold mb-6 pb-2 border-b-2 border-gray-300">
              Octave {octave}
            </h2>
            <div className="flex flex-col gap-6">
              {octaveFingerings.map((fingering) => {
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
                      <NoteDisplay
                        note={fingering.note}
                        octave={fingering.octave}
                      />
                    </div>
                    {fingering.alternatives.length > 0 ? (
                      <div className="flex-1 flex flex-wrap gap-8 justify-center items-center">
                        {fingering.alternatives.map((alternative, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center gap-2"
                          >
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
                              <span className="text-xs text-gray-600">
                                Alt {index}
                              </span>
                            )}
                            <Flute keysPressed={alternative.keys} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex-1 p-4 text-gray-600 text-center">
                        No fingering available
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
