"use client";

import { useRef, useState, useEffect } from "react";
import "./DolVoicePlayer.css";

interface DolVoicePlayerProps {
  src: string;
  mood?: string;
  title?: string;
  description?: string;
}

declare global {
  interface Window {
    __dolriseCurrentAudio?: HTMLAudioElement | null;
  }
}

export default function DolVoicePlayer({
  src,
  mood = "neutral",
  title = "Voice Moment",
  description = "",
}: DolVoicePlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState("0:00");
  const [progress, setProgress] = useState(0);

  /* ======================
     FORMAT TIME
  ====================== */
  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  /* ======================
     LOAD METADATA
  ====================== */
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    const handleLoaded = () => {
      setDuration(formatTime(audio.duration || 0));
    };

    const handleTimeUpdate = () => {
      const percent =
        (audio.currentTime / (audio.duration || 1)) * 100;
      setProgress(percent);
    };

    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoaded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  /* ======================
     SINGLE AUDIO CONTROL
  ====================== */
  const safePlay = () => {
    if (!audioRef.current) return;

    if (
      window.__dolriseCurrentAudio &&
      window.__dolriseCurrentAudio !== audioRef.current
    ) {
      window.__dolriseCurrentAudio.pause();
    }

    window.__dolriseCurrentAudio = audioRef.current;
    audioRef.current.play();
    setPlaying(true);
  };

  const safePause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setPlaying(false);
  };

  const togglePlay = () => {
    playing ? safePause() : safePlay();
  };

  /* ======================
     AUTO PLAY / STOP
  ====================== */
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!audioRef.current) return;

        if (entry.isIntersecting && entry.intersectionRatio > 0.65) {
          safePlay();
        } else {
          safePause();
        }
      },
      { threshold: [0.65] }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  /* ======================
     DOWNLOAD
  ====================== */
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = src;
    link.download = `${title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const moodClass = `mood-${mood.toLowerCase()}`;

  return (
    <div
      ref={containerRef}
      className={`voice-card ${moodClass} ${playing ? "playing" : ""}`}
    >
      <div className="voice-header">
        <span className="voice-mood">
          {mood.charAt(0).toUpperCase() + mood.slice(1)}
        </span>

        <button className="voice-download" onClick={handleDownload}>
          ⬇
        </button>
      </div>

      <h3 className="voice-title">{title}</h3>

      {description && (
        <p className="voice-description">{description}</p>
      )}

      <div className="voice-progress-bar">
        <div
          className="voice-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="voice-controls">
        <button className="voice-play-btn" onClick={togglePlay}>
          {playing ? "❚❚" : "▶"}
        </button>

        <div className="voice-meta">
          <span>
            {playing
              ? "Listening…"
              : "Listen"}
          </span>
          <span>{duration}</span>
        </div>
      </div>

      <audio ref={audioRef} src={src} preload="metadata" />
    </div>
  );
}
