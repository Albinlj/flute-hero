interface TuningFeedbackProps {
  cents: number | null;
  isActive: boolean;
}

export function TuningFeedback({ cents, isActive }: TuningFeedbackProps) {
  const absCents = cents !== null ? Math.abs(cents) : 0;
  const maxCents = 50; // Max deviation to show on gauge
  const percentage = Math.min(absCents / maxCents, 1) * 100;

  const getTuningColor = () => {
    if (absCents < 5) return "bg-green-500";
    if (absCents < 20) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getTuningText = () => {
    if (absCents < 5) return "In tune";
    if (cents && cents > 0) return "Sharp";
    return "Flat";
  };

  return (
    <div className="w-full max-w-md space-y-4">
      {/* Gauge */}
      <div className="relative">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex">
          {/* Left side (Flat) */}
          <div className="flex-1 relative">
            {isActive && cents !== null && cents < 0 && (
              <div
                className={`absolute right-0 h-full ${getTuningColor()} transition-all duration-150`}
                style={{ width: `${percentage}%` }}
              />
            )}
          </div>

          {/* Center indicator */}
          <div
            className={`w-1 z-10 ${isActive ? "bg-gray-800 dark:bg-gray-200" : "bg-gray-400"}`}
          />

          {/* Right side (Sharp) */}
          <div className="flex-1 relative">
            {isActive && cents !== null && cents > 0 && (
              <div
                className={`absolute left-0 h-full ${getTuningColor()} transition-all duration-150`}
                style={{ width: `${percentage}%` }}
              />
            )}
          </div>
        </div>

        {/* Labels */}
        <div
          className={`flex justify-between mt-2 text-sm ${isActive ? "text-gray-600 dark:text-gray-400" : "text-gray-400"}`}
        >
          <span>Flat</span>
          <span>Sharp</span>
        </div>
      </div>

      {/* Cents display */}
      <div className="text-center space-y-1">
        <div
          className={`text-2xl font-bold ${isActive ? "" : "text-gray-400"}`}
        >
          {isActive && cents !== null ? (
            <>
              {cents > 0 ? "+" : ""}
              {cents.toFixed(1)} cents
            </>
          ) : (
            "—"
          )}
        </div>
        <div
          className={`text-lg font-semibold ${
            isActive
              ? absCents < 5
                ? "text-green-600"
                : absCents < 20
                  ? "text-yellow-600"
                  : "text-red-600"
              : "text-gray-400"
          }`}
        >
          {isActive ? getTuningText() : "—"}
        </div>
      </div>
    </div>
  );
}
