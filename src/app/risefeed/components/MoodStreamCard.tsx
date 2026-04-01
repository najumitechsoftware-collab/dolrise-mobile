"use client";
import { useRouter } from "next/navigation";


import { useEffect, useRef, useState } from "react";
import DolFlowControls from "./DolFlowControls";

export default function MoodStreamCard({ post }: any) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const router = useRouter();

  const VIDEO_TYPES = ["video", "moodcast_video"];

  useEffect(() => {
    if (!VIDEO_TYPES.includes(post.type)) return;

    const v = videoRef.current;
    if (!v) return;

    v.muted = false;
    v.play().catch(() => {});
  }, [post]);

  return (
    <div className="dolstream-card">
      {/* MEDIA */}
      {VIDEO_TYPES.includes(post.type) && (
        <video
          ref={videoRef}
          src={post.media_url}
          className="dolstream-video"
          autoPlay
          playsInline
        />
      )}

      {/* USER */}
      <div
        className="dolstream-user"
        onClick={() => router.push(`/profile/${post.author.username}`)}
      >
        <img
          src={post.author.avatar_url || "/default-avatar.png"}
          className="dol-avatar"
        />
        <div className="dol-user-info">
          <h4>@{post.author.username}</h4>
          <span>{post.mood || "Mood"}</span>
        </div>
      </div>

      {/* CONTROLS */}
      <DolFlowControls post={post} />
    </div>
  );
}
