"use client";

import { useEffect, useRef, useState } from "react";

interface AudioTrimProps {
  audioFile: File;
  onChange: (range: { start: number; end: number }) => void;
}

export default function AudioTrim({ audioFile, onChange }: AudioTrimProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [duration, setDuration] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  /* ===============================
     LOAD METADATA
  =============================== */
  useEffect(() => {
    const url = URL.createObjectURL(audioFile);
    const audio = new Audio(url);

    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
      setEnd(audio.duration);
    };

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [audioFile]);

  /* ===============================
     SYNC TO PARENT
  =============================== */
  useEffect(() => {
    if (end > start) {
      onChange({ start, end });
    }
  }, [start, end]);

  /* ===============================
     PREVIEW TRIM
  =============================== */
  const playPreview = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = start;
    audio.play();

    const stopAt = end;
    const handler = () => {
      if (audio.currentTime >= stopAt) {
        audio.pause();
        audio.removeEventListener("timeupdate", handler);
      }
    };

    audio.addEventListener("timeupdate", handler);
  };

const fmt = (sec: number) => {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(Math.floor(sec % 60)).padStart(2, "0");
  return `${m}:${s}`;
};

  return (
    <div className="audio-trim-card">
      <h4 className="trim-title">Trim Audio</h4>

      <audio
        ref={audioRef}
        src={URL.createObjectURL(audioFile)}
        controls
        className="trim-audio"
      />

      <div className="trim-controls">
        <div className="trim-row">
          <label>Start</label>
          <input
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={start}
            onChange={(e) =>
              setStart(Math.min(Number(e.target.value), end - 0.1))
            }
          />
          <span>{fmt(start)}</span>
        </div>

        <div className="trim-row">
          <label>End</label>
          <input
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={end}
            onChange={(e) =>
              setEnd(Math.max(Number(e.target.value), start + 0.1))
            }
          />
          <span>{fmt(end)}</span>
        </div>
      </div>

      <button className="btn-secondary" onClick={playPreview}>
        ▶ Preview Selection
      </button>
    </div>
  );
}
