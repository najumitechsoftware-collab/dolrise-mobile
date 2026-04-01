"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function WatchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const videoRef = useRef<HTMLVideoElement>(null);

  const postId = Number(searchParams.get("postId"));

  const [videos, setVideos] = useState<any[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("https://api.dolrise.com/api/feed/all", {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        const moodVideos = data.filter((p: any) =>
          ["video", "moodcast_video"].includes(p.type)
        );

        const idx = moodVideos.findIndex(
          (v: any) => v.id === postId
        );

        setVideos(moodVideos);
        setIndex(idx >= 0 ? idx : 0);
      });
  }, [postId]);

  const current = videos[index];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [index]);

  useEffect(() => {
    let startY = 0;

    const touchStart = (e: any) => {
      startY = e.touches[0].clientY;
    };

    const touchEnd = (e: any) => {
      const endY = e.changedTouches[0].clientY;
      const diff = startY - endY;

      if (diff > 60 && index < videos.length - 1) {
        setIndex((i) => i + 1);
      }

      if (diff < -60 && index > 0) {
        setIndex((i) => i - 1);
      }
    };

    window.addEventListener("touchstart", touchStart);
    window.addEventListener("touchend", touchEnd);

    return () => {
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchend", touchEnd);
    };
  }, [index, videos.length]);

  if (!postId) {
    return <p style={{ padding: 20 }}>Invalid video</p>;
  }

  if (!current)
    return (
      <div
        style={{
          height: "100vh",
          background: "black",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading…
      </div>
    );

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        background: "black",
        position: "relative",
        overflow: "hidden",
        touchAction: "none",
      }}
    >
      <video
        ref={videoRef}
        src={current.media_url}
        style={{ height: "100%", width: "100%", objectFit: "cover" }}
        muted={false}
        controls={false}
        autoPlay
      />

      <div
        style={{
          position: "absolute",
          top: 30,
          left: 20,
          right: 20,
          color: "white",
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        {current.content || "No caption"}
      </div>

      <div
        style={{
          position: "absolute",
          right: 10,
          top: "40%",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          color: "white",
        }}
      >
        <div>💫 {current.feels_count}</div>
        <div>✨ {current.reflects_count}</div>
        <div>🔁 {current.reecho_count}</div>
      </div>

      <div
        onClick={() => router.back()}
        style={{
          position: "absolute",
          top: 20,
          left: 10,
          fontSize: 26,
          color: "white",
        }}
      >
        ←
      </div>
    </div>
  );
}
