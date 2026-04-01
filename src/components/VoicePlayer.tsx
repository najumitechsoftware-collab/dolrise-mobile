"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export default function VoicePlayer({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<any>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    waveRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#888",
      progressColor: "#FFD166",
      height: 40,
      barWidth: 2,
      cursorWidth: 0,
    });

    waveRef.current.load(url);

    waveRef.current.on("finish", () => {
      setPlaying(false);
    });

    return () => {
      waveRef.current.destroy();
    };
  }, [url]);

  const togglePlay = () => {
    if (!waveRef.current) return;
    waveRef.current.playPause();
    setPlaying(!playing);
  };

  return (
    <div
      style={{
        background: "#111",
        padding: 10,
        borderRadius: 10,
        marginTop: 8,
      }}
    >
      <button
        onClick={togglePlay}
        style={{
          background: "transparent",
          border: "1px solid #FFD166",
          color: "#FFD166",
          padding: "6px 10px",
          borderRadius: 8,
          marginBottom: 8,
        }}
      >
        {playing ? "⏸ Pause" : "▶️ Play"}
      </button>

      <div ref={containerRef} />
    </div>
  );
}
