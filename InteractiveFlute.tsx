import { useState } from "react";
import { Flute } from "./flute";
import type { Key, KeyState, KeyStates } from "./fingering";

export function InteractiveFlute() {
  const [keys, setKeys] = useState<KeyStates>({});

  const toggleKey = (keyId: Key) => {
    setKeys((prev) => {
      const currentState = prev[keyId];
      let newState: KeyState | undefined;

      // Cycle through states: undefined -> closed -> open -> undefined
      if (currentState === undefined || currentState === "open") {
        newState = "closed";
      } else if (currentState === "closed") {
        newState = "open";
      } else {
        // For "half" or "optional", cycle to closed
        newState = "closed";
      }

      return {
        ...prev,
        [keyId]: newState,
      };
    });
  };

  const resetKeys = () => {
    setKeys({});
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
        Click keys to toggle: closed (red) → open (gray) → closed
      </div>
    </div>
  );
}

