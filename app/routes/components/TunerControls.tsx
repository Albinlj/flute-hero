interface TunerControlsProps {
  isListening: boolean;
  error: string | null;
  onStart: () => void;
  onStop: () => void;
}

export function TunerControls({
  isListening,
  error,
  onStart,
  onStop,
}: TunerControlsProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={isListening ? onStop : onStart}
        className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
          isListening
            ? "bg-red-600 hover:bg-red-700 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>

      {error && (
        <div className="text-red-600 text-sm text-center">{error}</div>
      )}

      {isListening && (
        <div className="flex items-center gap-2 text-green-600">
          <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
          <span className="text-sm">Listening...</span>
        </div>
      )}
    </div>
  );
}

