import { TuningFeedback } from "./TuningFeedback";

interface TunerDisplayProps {
  canvasRef: (element: HTMLCanvasElement | null) => void;
  detectedNote: string | null;
  frequency: number | null;
  cents: number | null;
  isListening: boolean;
}

export function TunerDisplay({
  canvasRef,
  detectedNote,
  frequency,
  cents,
  isListening,
}: TunerDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      {detectedNote && frequency ? (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full">
            <canvas
              ref={canvasRef}
              className="w-full border border-gray-200 dark:border-gray-700 rounded"
            />
          </div>

          <div className="text-center space-y-2">
            <div className="text-5xl font-bold">{detectedNote}</div>
            <div className="text-lg text-gray-600 dark:text-gray-400">
              {frequency.toFixed(2)} Hz
            </div>
            <TuningFeedback cents={cents} />
          </div>
        </>
      ) : isListening ? (
        <div className="text-center text-gray-500">
          Waiting for audio input...
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full">
          <canvas
            ref={canvasRef}
            className="w-full border border-gray-200 dark:border-gray-700 rounded"
          />
        </div>
      )}
    </div>
  );
}

