import type { Route } from "./+types/game";
import { useState, useEffect, useRef } from "react";
import { useMicrophoneListener } from "../hooks/useMicrophoneListener";
import { useToneSynth } from "../hooks/useToneSynth";
import { useVexRenderer } from "../hooks/useVexRenderer";
import { useVexNoteDisplay } from "../hooks/useVexNoteDisplay";
import { fingerings, getPreferredFingering } from "../../fingering";
import { Flute } from "../../flute";
import { Note } from "tonal";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Note Game - Flute Hero" },
    { name: "description", content: "Practice playing notes on your flute" },
  ];
}

// Normalize note name by removing octave and converting to enharmonic equivalent
// (e.g., "C4" -> "C", "C#5" -> "C#", "Bb4" -> "Bb")
function normalizeNoteName(note: string): string {
  const match = note.match(/^([A-G][#b]?)/);
  if (!match) return note;
  
  let noteName = match[1];
  
  // Convert enharmonic equivalents to match fingering chart format
  // The fingering chart uses: C, C#, D, D#, E, F, F#, G, G#, A, A#, B
  // Tonal might return: Bb instead of A#, Db instead of C#, etc.
  const enharmonicMap: Record<string, string> = {
    "Db": "C#",
    "Eb": "D#",
    "Gb": "F#",
    "Ab": "G#",
    "Bb": "A#",
  };
  
  return enharmonicMap[noteName] || noteName;
}

// Get a random note from available fingerings
function getRandomNote(): { note: string; octave: number } {
  const randomIndex = Math.floor(Math.random() * fingerings.length);
  const fingering = fingerings[randomIndex];
  return { note: fingering.note, octave: fingering.octave };
}

export default function Game() {
  const [targetNote, setTargetNote] = useState<{ note: string; octave: number } | null>(null);
  const [showFingering, setShowFingering] = useState(false);
  const [playAudio, setPlayAudio] = useState(true);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<number | null>(null);
  const progressStartTimeRef = useRef<number | null>(null);

  const {
    isListening,
    detectedNote,
    frequency,
    cents,
    error,
    startListening,
    stopListening,
  } = useMicrophoneListener();

  const { playNote } = useToneSynth();
  const audioIntervalRef = useRef<number | null>(null);
  const [rendererRef, setCanvasRef, canvasRef] = useVexRenderer();
  
  // Render music notation for target note
  useVexNoteDisplay(rendererRef, canvasRef, targetNote?.note || null, targetNote?.octave || null);

  // Play note continuously: 1 second on, 1 second off, repeat
  useEffect(() => {
    if (!targetNote || !playAudio) {
      // Clear interval if audio is disabled or no target note
      if (audioIntervalRef.current) {
        clearInterval(audioIntervalRef.current);
        audioIntervalRef.current = null;
      }
      return;
    }

    // Play immediately, then set up repeating pattern
    playNote(targetNote.note, targetNote.octave, 1);

    // Set up interval: play for 1 second, wait 1 second, repeat
    audioIntervalRef.current = window.setInterval(() => {
      playNote(targetNote.note, targetNote.octave, 1);
    }, 2000); // 2 seconds total (1 second play + 1 second wait)

    return () => {
      if (audioIntervalRef.current) {
        clearInterval(audioIntervalRef.current);
        audioIntervalRef.current = null;
      }
    };
  }, [targetNote, playAudio, playNote]);

  // Initialize with first note
  useEffect(() => {
    setTargetNote(getRandomNote());
  }, []);

  // Clear progress animation frame on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        cancelAnimationFrame(progressIntervalRef.current);
      }
    };
  }, []);

  // Update progress bar animation
  useEffect(() => {
    if (!isListening || !detectedNote || !targetNote) {
      // Reset progress if not listening or no note detected
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
      // Start progress tracking if not already started
      if (progressStartTimeRef.current === null) {
        progressStartTimeRef.current = Date.now();
      }

      // Animate progress bar
      const updateProgress = () => {
        if (progressStartTimeRef.current === null) return;

        const elapsed = Date.now() - progressStartTimeRef.current;
        const newProgress = Math.min(100, (elapsed / 1000) * 100);
        setProgress(newProgress);

        // If progress reaches 100%, advance to next note
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
          // Continue animating
          progressIntervalRef.current = requestAnimationFrame(updateProgress);
        }
      };

      // Start animation if not already running
      if (!progressIntervalRef.current) {
        progressIntervalRef.current = requestAnimationFrame(updateProgress);
      }
    } else {
      // Reset progress if note is wrong or out of tune
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
                {/* Music Notation */}
                <div className="flex justify-center mb-4">
                  <canvas ref={setCanvasRef} className="border border-gray-200 rounded" />
                </div>
                
                <div className="text-6xl font-bold text-blue-600 mb-2">
                  {targetNote.note}
                  <sub className="text-3xl text-gray-500 ml-2">{targetNote.octave}</sub>
                </div>
                {detectedNote && (
                  <div className="mt-4">
                    <div className="text-xl text-gray-700">
                      Detected: <span className="font-semibold">{detectedNote}</span>
                    </div>
                    {cents !== null && (
                      <div className={`text-sm mt-1 ${Math.abs(cents) < 50 ? "text-green-600" : "text-orange-600"}`}>
                        {cents > 0 ? "+" : ""}
                        {cents.toFixed(1)} cents
                      </div>
                    )}
                  </div>
                )}
                
                {/* Progress Bar */}
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

              {showFingering && preferredFingering && preferredFingering.keys && (
                <div className="mb-6 flex justify-center">
                  <Flute keys={preferredFingering.keys} />
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

