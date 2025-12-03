import { useState } from "react";
import { Flute } from "./flute";
import type { Key } from "./fingering";

export function InteractiveFlute() {
  const [keys, setKeys] = useState<Key[]>([]);

  const toggleKey = (keyId: Key) => {
    setKeys((prev) => {
      if (prev.includes(keyId)) {
        return prev.filter((k) => k !== keyId);
      } else {
        return [...prev, keyId];
      }
    });
  };

  const resetKeys = () => {
    setKeys([]);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button
          onClick={resetKeys}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
        >
          Reset All Keys
        </button>
      </div>
      <Flute keys={keys} onKeyClick={toggleKey} />
      <div className="text-sm text-gray-600 mt-2">
        Click keys to toggle: pressed (red) → released (white)
      </div>
    </div>
  );
}

