"use client";
import { useRef, useState } from "react";

export default function VoiceRecorder({ onFinish }: any) {
  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState(0);

  const mediaRecorderRef = useRef<any>(null);
  const audioChunksRef = useRef<any[]>([]);
  const streamRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e: any) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        finish();
      };

      mediaRecorder.start();
      setRecording(true);

      setTimer(0);
      timerRef.current = setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000);

      // 🔥 auto stop 60s
      setTimeout(() => {
        if (mediaRecorderRef.current) {
          stop();
        }
      }, 60000);

    } catch (err) {
      console.error("Mic error:", err);
      alert("Allow microphone access");
    }
  };

  const stop = () => {
    clearInterval(timerRef.current);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const finish = () => {
    setRecording(false);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t: any) => t.stop());
    }

    const blob = new Blob(audioChunksRef.current, {
      type: "audio/webm",
    });

    audioChunksRef.current = [];

    onFinish(blob);
  };

  return {
    start,
    stop,
    recording,
    timer,
  };
}
