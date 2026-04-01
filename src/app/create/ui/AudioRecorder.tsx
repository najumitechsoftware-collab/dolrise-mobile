"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AudioRecorder.module.css";

interface Props {
  audioFile: File | null;
  setAudioFile: (f: File | null) => void;
}

export default function AudioRecorder({ audioFile, setAudioFile }: Props) {
  const MAX_RECORD_TIME = 15 * 60;

  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  /* FORMAT TIME */
  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(
      s % 60
    ).padStart(2, "0")}`;

  /* START */
  async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    recorderRef.current = recorder;
    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const file = new File([blob], "voice.webm", { type: "audio/webm" });
      setAudioFile(file);
      setAudioURL(URL.createObjectURL(blob));
    };

    recorder.start();
    setRecording(true);
    setSeconds(0);
  }

  /* STOP */
  function stop() {
    recorderRef.current?.stop();
    setRecording(false);
  }

  /* TIMER */
  useEffect(() => {
    if (!recording) return;
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s >= MAX_RECORD_TIME) {
          stop();
          return s;
        }
        return s + 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [recording]);

  /* UPLOAD */
  function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f || !f.type.startsWith("audio/")) return;
    setAudioFile(f);
    setAudioURL(URL.createObjectURL(f));
  }

  /* RESET */
  function reset() {
    setAudioFile(null);
    setAudioURL(null);
    setSeconds(0);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.title}>🎙 Voice moment</div>
        <div className={styles.sub}>
          Speak freely · Up to 15 minutes
        </div>
      </div>

      {!audioFile && (
        <div className={styles.recordZone}>
          <button
            className={`${styles.micButton} ${
              recording ? styles.recording : ""
            }`}
            onClick={recording ? stop : start}
          >
            {recording ? "■" : "🎤"}
          </button>

          <div className={styles.timer}>
            {fmt(seconds)} / {fmt(MAX_RECORD_TIME)}
          </div>

          <label className={styles.uploadBtn}>
            Upload audio
            <input type="file" accept="audio/*" hidden onChange={upload} />
          </label>
        </div>
      )}

      {audioFile && audioURL && (
        <div className={styles.preview}>
          <audio className={styles.player} controls src={audioURL} />
          <div className={styles.meta}>Ready to share</div>
          <button className={styles.remove} onClick={reset}>
            Remove audio
          </button>
        </div>
      )}
    </div>
  );
}
