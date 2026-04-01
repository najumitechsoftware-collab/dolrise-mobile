"use client";

import { useEffect, useRef, useState } from "react";
import "./VoiceRecorder.css";

export default function VoiceRecorder({ onSend, autoStart }: any) {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);
  const rafRef = useRef<any>(null);

  const audioCtxRef = useRef<any>(null);
  const analyserRef = useRef<any>(null);
  const dataArrayRef = useRef<any>(null);

  const [bars, setBars] = useState<number[]>(new Array(25).fill(4));

  /* =========================
     ⏱ FORMAT
  ========================= */
  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(
      s % 60
    ).padStart(2, "0")}`;

  /* =========================
     🎤 START
  ========================= */
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        clearInterval(timerRef.current);
        cancelAnimationFrame(rafRef.current);
      };

      recorder.start();
      mediaRef.current = recorder;

      // 🎧 AUDIO ANALYSER
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();

      analyser.fftSize = 64;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      source.connect(analyser);

      audioCtxRef.current = audioCtx;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;

      setRecording(true);
      setSeconds(0);

      timerRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);

      animateWaveform();
    } catch (err) {
      alert("Microphone permission denied");
      console.error(err);
    }
  };

  /* =========================
     ⏹ STOP
  ========================= */
  const stopRecording = () => {
    mediaRef.current?.stop();
    setRecording(false);
  };

  /* =========================
     📊 WAVEFORM LOOP
  ========================= */
  const animateWaveform = () => {
    if (!analyserRef.current) return;

    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    analyser.getByteFrequencyData(dataArray);

    const newBars = Array.from({ length: 25 }, (_, i) => {
      return Math.max(4, dataArray[i] / 5);
    });

    setBars(newBars);

    rafRef.current = requestAnimationFrame(animateWaveform);
  };

  /* =========================
     🗑 DELETE
  ========================= */
  const deleteRecording = () => {
    setAudioBlob(null);
    setSeconds(0);
  };

  /* =========================
     📤 SEND
  ========================= */
  const send = () => {
    if (!audioBlob) return;
    onSend(audioBlob);
    setAudioBlob(null);
    setSeconds(0);
  };

  /* =========================
     🔥 AUTO START
  ========================= */
  useEffect(() => {
    if (autoStart) {
      startRecording();
    }
  }, [autoStart]);

  /* =========================
     CLEANUP
  ========================= */
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      cancelAnimationFrame(rafRef.current);
      audioCtxRef.current?.close();
    };
  }, []);

  return (
    <div className="vr-box">

      {/* RECORDING */}
      {recording && (
        <div className="vr-recording">

          <span className="vr-time">{formatTime(seconds)}</span>

          <div className="vr-wave">
            {bars.map((h, i) => (
              <div
                key={i}
                className="vr-bar"
                style={{ height: h }}
              />
            ))}
          </div>

          <button className="vr-stop" onClick={stopRecording}>
            ⏹
          </button>
        </div>
      )}

      {/* PREVIEW */}
      {audioBlob && (
        <div className="vr-preview">

          <button className="vr-delete" onClick={deleteRecording}>
            🗑
          </button>

          <span>{formatTime(seconds)}</span>

          <audio controls src={URL.createObjectURL(audioBlob)} />

          <button className="vr-send" onClick={send}>
            ➤
          </button>
        </div>
      )}
    </div>
  );
}
