import { useVexRenderer } from "~/hooks/useVexRenderer";
import { useMicrophoneListener } from "~/hooks/useMicrophoneListener";
import { useVexNoteRenderer } from "~/hooks/useVexNoteRenderer";
import { TunerControls } from "~/routes/components/TunerControls";
import { TunerDisplay } from "~/routes/components/TunerDisplay";

export function TunerPage() {
  const {
    isListening,
    detectedNote,
    frequency,
    cents,
    error,
    startListening,
    stopListening,
  } = useMicrophoneListener();

  const [rendererRef, setCanvasRef, canvasRef] = useVexRenderer();
  useVexNoteRenderer(rendererRef, canvasRef, detectedNote, frequency);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="max-w-2xl w-full space-y-8">
        <h1 className="text-4xl font-bold text-center">Flute Tuner</h1>

        <TunerControls
          isListening={isListening}
          error={error}
          onStart={startListening}
          onStop={stopListening}
        />

        <TunerDisplay
          canvasRef={setCanvasRef}
          detectedNote={detectedNote}
          frequency={frequency}
          cents={cents}
          isListening={isListening}
        />
      </div>
    </main>
  );
}
