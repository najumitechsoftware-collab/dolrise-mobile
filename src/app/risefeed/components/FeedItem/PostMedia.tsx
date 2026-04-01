"use client";
import { useEffect, useRef, useState } from "react";
import DolVoicePlayer from "../DolVoicePlayer";
import "./PostMedia.luxury.css";

/* GLOBAL CONTROL */
let activeVideo: HTMLVideoElement | null = null;
let globalSoundEnabled =
  typeof window !== "undefined" &&
  localStorage.getItem("globalSound") === "on";

/* FIX media_url */
const getMediaUrl = (url: any): string | null => {
  if (!url) return null;
  if (typeof url === "string") return url;
  if (Array.isArray(url)) return url.length ? url[0] : null;
  return null;
};

interface PostMediaProps {
  post: {
    id: number;
    type: string;
    media_url?: any;
    mood?: string;
    background?: string;
    location?: string; // ✅ ADD THIS
  };
}

function formatTime(time: number) {
  if (!time || isNaN(time)) return "0:00";
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export default function PostMedia({ post }: PostMediaProps) {
  const mediaUrl = getMediaUrl(post.media_url);
  const type = (post.type || "").toLowerCase();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isVideo = type === "video" || type === "moodcast_video";
  const isImage =
    type === "photo" ||
    type === "image" ||
    type === "moodcast_photo";
  const isAudio =
    type === "voicemoment" ||
    type === "voice_upload";

  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoCurrent, setVideoCurrent] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsPlaying(false);
  }, [mediaUrl]);

  useEffect(() => {
    if (!isVideo) return;

    const video = videoRef.current;
    const el = containerRef.current;
    if (!video || !el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (activeVideo && activeVideo !== video) {
            activeVideo.pause();
          }
          activeVideo = video;

          video.muted = !globalSoundEnabled;
          setIsMuted(video.muted);

          video.play().catch(() => {});
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isVideo, mediaUrl]);

  const toggleControls = () => {
    setShowControls((prev) => !prev);

    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

    hideTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const skipForward = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime += 10;
  };

  const skipBack = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime -= 10;
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;

    globalSoundEnabled = !globalSoundEnabled;

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "globalSound",
        globalSoundEnabled ? "on" : "off"
      );
    }

    v.muted = !globalSoundEnabled;
    setIsMuted(v.muted);
  };

  const poster =
    post.background ||
    (mediaUrl?.endsWith(".mp4")
      ? mediaUrl.replace(".mp4", "_thumb.jpg")
      : undefined);

  return (
    <div className="feed-media" ref={containerRef}>
      {/* IMAGE */}
      {isImage && mediaUrl && (
        <img
          src={mediaUrl}
          loading="lazy"
          style={{
            width: "100%",
            height: "80vh",
            objectFit: "cover",
          }}
        />
      )}

      {/* VIDEO */}
      {isVideo && mediaUrl && (
        <div className="lux-video-wrap" onClick={toggleControls}>
          <video
            key={mediaUrl}
            ref={videoRef}
            poster={poster}
            className="lux-video"
            playsInline
            muted
            autoPlay
            loop
            preload="auto"
            src={mediaUrl}
            onLoadedData={(e) => {
              const v = e.currentTarget;
              setVideoDuration(v.duration || 0);
            }}
            onTimeUpdate={(e) => {
              setVideoCurrent(e.currentTarget.currentTime);
            }}
            style={{
              width: "100%",
              height: "80vh",
              objectFit: "cover",
              background: "#000",
            }}
          />

          {showControls && (
            <div className="lux-center-controls">
              <button onClick={(e) => { e.stopPropagation(); skipBack(); }}>⟲ 10s</button>
              <button onClick={(e) => { e.stopPropagation(); togglePlay(); }}>
                {isPlaying ? "❚❚" : "▶"}
              </button>
              <button onClick={(e) => { e.stopPropagation(); skipForward(); }}>
                10s ⟳
              </button>
            </div>
          )}

          <div className="lux-bottom-bar">
            <span>{formatTime(videoCurrent)}</span>
            <div className="lux-progress">
              <div
                className="lux-progress-fill"
                style={{
                  width:
                    videoDuration > 0
                      ? `${(videoCurrent / videoDuration) * 100}%`
                      : "0%",
                }}
              />
            </div>
            <span>{formatTime(videoDuration)}</span>
          </div>

          {/* 📍 LOCATION (NEW) */}
          {post.location && (
            <div className="lux-location">
              📍 {post.location}
            </div>
          )}

          {/* 🔊 SOUND BUTTON */}
          <button
            className="lux-sound-btn"
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div>
      )}

      {/* AUDIO */}
      {isAudio && mediaUrl && (
        <div className="post-audio-wrap">
          <DolVoicePlayer
            src={mediaUrl}
            mood={post.mood || "neutral"}
          />
        </div>
      )}
    </div>
  );
}
