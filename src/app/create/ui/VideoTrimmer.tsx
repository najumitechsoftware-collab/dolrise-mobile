"use client";

import { useEffect, useRef, useState } from "react";

interface VideoTrimmerProps {
  file: File;
  onChange: (range: { start: number; end: number }) => void;
}

export default function VideoTrimmer({ file, onChange }: VideoTrimmerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [duration, setDuration] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  const videoURL = URL.createObjectURL(file);

  /* =========================================
     LOAD METADATA
  ========================================= */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => {
      setDuration(video.duration);
      setStart(0);
      setEnd(video.duration);
      onChange({ start: 0, end: video.duration });
    };

    video.addEventListener("loadedmetadata", handleLoaded);
    return () => video.removeEventListener("loadedmetadata", handleLoaded);
  }, [file]);

  /* =========================================
     SYNC TRIM
  ========================================= */
  useEffect(() => {
    if (start >= end) return;
    onChange({ start, end });
  }, [start, end]);

  /* =========================================
     SEEK PREVIEW
  ========================================= */
  function previewAt(time: number) {
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
  }

  /* =========================================
     UI
  ========================================= */
  return (
    <div className="video-trim-card">
      <div className="video-trim-header">
        <h4>✂️ Trim Video</h4>
        <span className="video-trim-sub">
          Select the part you want to share
        </span>
      </div>

      <video ref={videoRef} src={videoURL} controls className="video-preview" />

      {/* RANGE */}
      <div className="trim-controls">
        <div className="trim-line">
          <label>Start</label>
          <input
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={start}
            onChange={(e) => {
              const v = Number(e.target.value);
              setStart(v);
              previewAt(v);
            }}
          />
          <span>{start.toFixed(1)}s</span>
        </div>

        <div className="trim-line">
          <label>End</label>
          <input
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={end}
            onChange={(e) => {
              const v = Number(e.target.value);
              setEnd(v);
              previewAt(v);
            }}
          />
          <span>{end.toFixed(1)}s</span>
        </div>
      </div>

      <div className="trim-summary">
        Final length: <strong>{(end - start).toFixed(1)} seconds</strong>
      </div>
    </div>
  );
}
