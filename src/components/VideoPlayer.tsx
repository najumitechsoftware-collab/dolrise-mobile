"use client";
import { useEffect, useRef } from "react";

export default function VideoPlayer({ src, onEnded }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto play when video is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!videoRef.current) return;

        if (entry.isIntersecting) videoRef.current.play();
        else videoRef.current.pause();
      },
      { threshold: 0.7 },
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  const forward5 = () => {
    if (videoRef.current) videoRef.current.currentTime += 5;
  };

  const backward5 = () => {
    if (videoRef.current) videoRef.current.currentTime -= 5;
  };

  const openFullScreen = () => {
    if (videoRef.current?.requestFullscreen)
      videoRef.current.requestFullscreen();
  };

  return (
    <div style={{ position: "relative" }}>
      <video
        ref={videoRef}
        src={src}
        onEnded={onEnded}
        controls={false}
        style={{
          width: "100%",
          maxHeight: 600,
          objectFit: "contain",
          borderRadius: "14px",
          background: "black",
        }}
      />

      {/* Back 5s */}
      <button
        onClick={backward5}
        style={{
          position: "absolute",
          left: 10,
          bottom: 20,
          padding: 6,
          color: "white",
          fontSize: 18,
          background: "rgba(0,0,0,0.4)",
          borderRadius: 8,
          border: "none",
        }}
      >
        ⏪ 5s
      </button>

      {/* Forward 5s */}
      <button
        onClick={forward5}
        style={{
          position: "absolute",
          right: 10,
          bottom: 20,
          padding: 6,
          color: "white",
          fontSize: 18,
          background: "rgba(0,0,0,0.4)",
          borderRadius: 8,
          border: "none",
        }}
      >
        5s ⏩
      </button>

      {/* Fullscreen Button */}
      <button
        onClick={openFullScreen}
        style={{
          position: "absolute",
          right: 10,
          top: 10,
          padding: 6,
          color: "white",
          background: "rgba(0,0,0,0.4)",
          borderRadius: 8,
          border: "none",
        }}
      >
        ⛶
      </button>
    </div>
  );
}
