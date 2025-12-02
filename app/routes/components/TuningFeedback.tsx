interface TuningFeedbackProps {
  cents: number | null;
}

export function TuningFeedback({ cents }: TuningFeedbackProps) {
  const getTuningColor = () => {
    if (cents === null) return "text-gray-500";
    const absCents = Math.abs(cents);
    if (absCents < 5) return "text-green-600";
    if (absCents < 20) return "text-yellow-600";
    return "text-red-600";
  };

  const getTuningText = () => {
    if (cents === null) return "";
    const absCents = Math.abs(cents);
    if (absCents < 5) return "In tune";
    if (cents > 0) return `${cents.toFixed(1)} cents sharp`;
    return `${Math.abs(cents).toFixed(1)} cents flat`;
  };

  if (cents === null) return null;

  return (
    <div className={`text-xl font-semibold ${getTuningColor()}`}>
      {getTuningText()}
    </div>
  );
}

