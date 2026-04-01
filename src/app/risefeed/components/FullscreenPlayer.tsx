"use client";

import { useEffect, useRef, useState } from "react";

let activeFSVideo: HTMLVideoElement | null = null;

export default function FullscreenPlayer({
  posts,
  index,
  onClose,
  onFeel,
  onFlow,
}: any) {
  const [currentIndex, setCurrentIndex] = useState(index);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const post = posts[currentIndex];

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (activeFSVideo && activeFSVideo !== v) {
      activeFSVideo.pause();
    }

    activeFSVideo = v;

    v.currentTime = 0;
    v.muted = false;
    v.play().catch(() => {});
  }, [currentIndex]);

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  const nextVideo = () => {
    if (currentIndex < posts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevVideo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="fs-container">
      <video
        ref={videoRef}
        src={post.media_url}
        className="fs-video"
        autoPlay
        playsInline
      />

      <button className="fs-exit" onClick={onClose}>
        ←
      </button>
    </div>
  );
}
