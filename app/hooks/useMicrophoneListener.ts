import { useEffect, useRef, useState } from "react";
import { YIN } from "pitchfinder";
import { Note } from "tonal";

export function useMicrophoneListener(initialListening: boolean = false) {
  const [isListening, setIsListening] = useState(initialListening);
  const [detectedNote, setDetectedNote] = useState<string | null>(null);
  const [frequency, setFrequency] = useState<number | null>(null);
  const [cents, setCents] = useState<number | null>(null);
  const [volume, setVolume] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const pitchDetectorRef = useRef<
    ((buffer: Float32Array) => number | null) | null
  >(null);
  const isListeningRef = useRef(false);

  const processAudio = () => {
    if (
      !analyserRef.current ||
      !pitchDetectorRef.current ||
      !isListeningRef.current
    ) {
      return;
    }

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);
    analyser.getFloatTimeDomainData(dataArray);

    // Calculate volume (RMS)
    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i] * dataArray[i];
    }
    const rms = Math.sqrt(sum / bufferLength);
    const volumeLevel = Math.min(rms * 10, 1); // Scale and cap at 1
    setVolume(volumeLevel);

    // Only detect pitch if volume is above threshold
    const VOLUME_THRESHOLD = 0.01;
    if (volumeLevel > VOLUME_THRESHOLD) {
      const detectPitch = pitchDetectorRef.current;
      const detectedFrequency = detectPitch(dataArray);

      if (detectedFrequency && detectedFrequency > 0) {
        setFrequency(detectedFrequency);

        // Convert frequency to note name
        const note = Note.fromFreq(detectedFrequency);
        if (note) {
          setDetectedNote(note);

          // Calculate cents deviation from target pitch
          const targetFreq = Note.freq(note);
          if (targetFreq) {
            const centsDeviation =
              1200 * Math.log2(detectedFrequency / targetFreq);
            setCents(centsDeviation);
          }
        }
      }
    } else {
      // Clear note when volume is too low
      setDetectedNote(null);
      setFrequency(null);
      setCents(null);
    }

    if (isListeningRef.current) {
      animationFrameRef.current = requestAnimationFrame(processAudio);
    }
  };

  const startListening = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      // Create AudioContext without specifying sample rate to avoid conflicts
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      // Initialize pitch detector with the actual sample rate
      const sampleRate = audioContext.sampleRate;
      pitchDetectorRef.current = YIN({ sampleRate });

      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 4096;
      analyser.smoothingTimeConstant = 0.3;
      source.connect(analyser);
      analyserRef.current = analyser;

      isListeningRef.current = true;
      setIsListening(true);
      processAudio();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to access microphone"
      );
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    analyserRef.current = null;
    isListeningRef.current = false;
    setIsListening(false);
    setDetectedNote(null);
    setFrequency(null);
    setCents(null);
    setVolume(0);
  };

  useEffect(() => {
    if (initialListening) {
      startListening();
    }
    return () => {
      stopListening();
    };
  }, []);

  return {
    isListening,
    detectedNote,
    frequency,
    cents,
    volume,
    error,
    startListening,
    stopListening,
  };
}
