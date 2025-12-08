import { useEffect, useRef, useState } from "react";
import { useMicrophoneListener } from "~/hooks/useMicrophoneListener";
import { useToneSynth } from "~/hooks/useToneSynth";
import { useVexRenderer } from "~/hooks/useVexRenderer";
import { useVexStave } from "~/hooks/useVexStave";
import { useVexStaveNote } from "~/hooks/useVexStaveNote";
import { fingerings, getPreferredFingering } from "~/lib/fingering";
import { Flute } from "~/components/flute/Flute";

function normalizeNoteName(note: string): string {
  const match = note.match(/^([A-G][#b]?)/);
  if (!match) return note;

  const noteName = match[1];

  const enharmonicMap: Record<string, string> = {
    Db: "C#",
    Eb: "D#",
    Gb: "F#",
    Ab: "G#",
    Bb: "A#",
  };

  return enharmonicMap[noteName] || noteName;
}

function getRandomNote(): { note: string; octave: number } {
  const randomIndex = Math.floor(Math.random() * fingerings.length);
  const fingering = fingerings[randomIndex];
  return { note: fingering.note, octave: fingering.octave };
}

export function GamePage() {
  const [targetNote, setTargetNote] = useState<{
    note: string;
    octave: number;
  } | null>(getRandomNote());
  const [showFingering, setShowFingering] = useState(false);
  const [playAudio, setPlayAudio] = useState(true);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<number | null>(null);
  const progressStartTimeRef = useRef<number | null>(null);

  const {
    isListening,
    detectedNote,
    cents,
    error,
    startListening,
    stopListening,
  } = useMicrophoneListener();

  const { playNote } = useToneSynth();
  const audioIntervalRef = useRef<number | null>(null);
  const [rendererRef, setCanvasRef, canvasRef] = useVexRenderer();

  const staveRef = useVexStave(rendererRef);
  useVexStaveNote(
    rendererRef,
    staveRef,
    targetNote?.note || null,
    targetNote?.octave || null
  );

  // Loop target note audio on when sound is enabled
  useEffect(() => {
    if (!targetNote || !playAudio) {
      if (audioIntervalRef.current) {
        clearInterval(audioIntervalRef.current);
        audioIntervalRef.current = null;
      }
      return;
    }

    playNote(targetNote.note, targetNote.octave, 1);

    audioIntervalRef.current = window.setInterval(() => {
      playNote(targetNote.note, targetNote.octave, 1);
    }, 2000);

    return () => {
      if (audioIntervalRef.current) {
        clearInterval(audioIntervalRef.current);
        audioIntervalRef.current = null;
      }
    };
  }, [targetNote, playAudio, playNote]);

  // Cleanup any running animation frame on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        cancelAnimationFrame(progressIntervalRef.current);
      }
    };
  }, []);

  // Drive progress bar based on detected note accuracy and timing
  useEffect(() => {
    if (!isListening || !detectedNote || !targetNote) {
      if (progressIntervalRef.current) {
        cancelAnimationFrame(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      setProgress(0);
      progressStartTimeRef.current = null;
      return;
    }

    const normalizedDetected = normalizeNoteName(detectedNote);
    const normalizedTarget = normalizeNoteName(targetNote.note);
    const isNoteCorrect = normalizedDetected === normalizedTarget;
    const isInTune = cents !== null && Math.abs(cents) < 50;

    if (isNoteCorrect && isInTune) {
      if (progressStartTimeRef.current === null) {
        progressStartTimeRef.current = Date.now();
      }

      const updateProgress = () => {
        if (progressStartTimeRef.current === null) return;

        const elapsed = Date.now() - progressStartTimeRef.current;
        const newProgress = Math.min(100, (elapsed / 1000) * 100);
        setProgress(newProgress);

        if (newProgress >= 100) {
          setScore((prev) => prev + 1);
          setTargetNote(getRandomNote());
          setProgress(0);
          progressStartTimeRef.current = null;
          if (progressIntervalRef.current) {
            cancelAnimationFrame(progressIntervalRef.current);
            progressIntervalRef.current = null;
          }
        } else {
          progressIntervalRef.current = requestAnimationFrame(updateProgress);
        }
      };

      if (!progressIntervalRef.current) {
        progressIntervalRef.current = requestAnimationFrame(updateProgress);
      }
    } else {
      if (progressIntervalRef.current) {
        cancelAnimationFrame(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      setProgress(0);
      progressStartTimeRef.current = null;
    }
  }, [detectedNote, targetNote, cents, isListening]);

  const handleStart = () => {
    startListening();
  };

  const handleStop = () => {
    stopListening();
    setProgress(0);
    progressStartTimeRef.current = null;
    if (progressIntervalRef.current) {
      cancelAnimationFrame(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const preferredFingering = targetNote
    ? getPreferredFingering(targetNote.note, targetNote.octave)
    : null;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Note Game</h1>
          <p className="text-lg text-gray-600">Play the note shown below</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {targetNote && (
            <>
              <div className="mb-6">
                <div className="flex justify-center mb-4">
                  <canvas
                    ref={setCanvasRef}
                    className="border border-gray-200 rounded"
                  />
                </div>

                <div className="text-6xl font-bold text-blue-600 mb-2">
                  {targetNote.note}
                  <sub className="text-3xl text-gray-500 ml-2">
                    {targetNote.octave}
                  </sub>
                </div>
                {detectedNote && (
                  <div className="mt-4">
                    <div className="text-xl text-gray-700">
                      Detected:{" "}
                      <span className="font-semibold">{detectedNote}</span>
                    </div>
                    {cents !== null && (
                      <div
                        className={`text-sm mt-1 ${
                          Math.abs(cents) < 50
                            ? "text-green-600"
                            : "text-orange-600"
                        }`}
                      >
                        {cents > 0 ? "+" : ""}
                        {cents.toFixed(1)} cents
                      </div>
                    )}
                  </div>
                )}

                {isListening && (
                  <div className="mt-6">
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-100 ease-linear ${
                          progress > 0 ? "bg-green-500" : "bg-gray-300"
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      Hold the note for 1 second to advance
                    </div>
                  </div>
                )}
              </div>

              {showFingering &&
                preferredFingering &&
                preferredFingering.keys && (
                  <div className="mb-6 flex justify-center">
                    <Flute keysPressed={preferredFingering.keys} />
                  </div>
                )}

              <div className="flex flex-col items-center gap-4">
                <div className="flex gap-4">
                  {!isListening ? (
                    <button
                      onClick={handleStart}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Start Listening
                    </button>
                  ) : (
                    <button
                      onClick={handleStop}
                      className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      Stop Listening
                    </button>
                  )}
                  <button
                    onClick={() => setShowFingering(!showFingering)}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                  >
                    {showFingering ? "Hide" : "Show"} Fingering
                  </button>
                  <button
                    onClick={() => setPlayAudio(!playAudio)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                      playAudio
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-gray-400 text-white hover:bg-gray-500"
                    }`}
                  >
                    {playAudio ? "🔊 Sound On" : "🔇 Sound Off"}
                  </button>
                </div>

                {error && (
                  <div className="text-red-600 text-sm mt-2">{error}</div>
                )}

                <div className="mt-4 text-lg">
                  <span className="font-semibold">Score: </span>
                  <span className="text-blue-600">{score}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
