import { useMicrophoneListener } from "~/hooks/useMicrophoneListener";
import { TunerControls } from "~/routes/components/TunerControls";
import { TunerDisplay } from "~/routes/components/TunerDisplay";

export function TunerPage() {
  const {
    isListening,
    detectedNote,
    frequency,
    cents,
    volume,
    error,
    startListening,
    stopListening,
  } = useMicrophoneListener();

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
          detectedNote={detectedNote}
          frequency={frequency}
          cents={cents}
          volume={volume}
          isListening={isListening}
        />
      </div>
    </main>
  );
}
