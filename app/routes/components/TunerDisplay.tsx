import { TuningFeedback } from "./TuningFeedback";

interface TunerDisplayProps {
  detectedNote: string | null;
  frequency: number | null;
  cents: number | null;
  volume: number;
  isListening: boolean;
}

function VolumeGauge({ volume }: { volume: number }) {
  const percentage = volume * 100;

  return (
    <div className="w-full max-w-md space-y-2">
      <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
        Volume
      </div>
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-100"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function TunerDisplay({
  detectedNote,
  frequency,
  cents,
  volume,
  isListening,
}: TunerDisplayProps) {
  const hasNote = detectedNote && frequency;

  return (
    <div className="flex flex-col items-center gap-6">
      {isListening && <VolumeGauge volume={volume} />}

      {isListening && (
        <div className="text-center space-y-6 w-full">
          <div
            className={`text-8xl font-bold ${!hasNote ? "text-gray-400" : ""}`}
          >
            {hasNote ? detectedNote : "—"}
          </div>
          <div className="text-xl text-gray-600 dark:text-gray-400">
            {hasNote
              ? `${frequency.toFixed(2)} Hz`
              : "Waiting for audio input..."}
          </div>
          <TuningFeedback cents={cents} isActive={!!hasNote} />
        </div>
      )}
    </div>
  );
}
