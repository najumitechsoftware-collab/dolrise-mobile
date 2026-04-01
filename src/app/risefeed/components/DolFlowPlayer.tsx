"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import FeelPanel from "./FeedItem/FeelPanel/FeelPanel";
import ReflectModal from "./ReflectModal";
import ReEchoModal from "./ReEchoModal";
import PostMenu from "./PostMenu/PostMenu";
import "./DolFlowPlayer.css";

interface Props {
  index: number;
  allPosts: any[];
  onClose: () => void;
}

export default function DolFlowPlayer({
  index,
  allPosts,
  onClose,
}: Props) {
  const router = useRouter();

  const VIDEO_TYPES = ["video", "moodcast_video"];

  const videoPosts = useMemo(
    () => allPosts.filter((p) => VIDEO_TYPES.includes(p.type)),
    [allPosts]
  );

  const startIndex = Math.max(
    0,
    videoPosts.findIndex((v) => v.id === allPosts[index]?.id)
  );

  const [activeIndex, setActiveIndex] = useState(startIndex);
  const [activated, setActivated] = useState<number | null>(null);

  const [showFeel, setShowFeel] = useState(false);
  const [showReflect, setShowReflect] = useState(false);
  const [showReEcho, setShowReEcho] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const activePost = videoPosts[activeIndex];
  if (!activePost) return null;

  /* 🔒 IMMERSIVE MODE */
  useEffect(() => {
    document.body.classList.add("dolflow-open");
    return () => {
      document.body.classList.remove("dolflow-open");

      videoRefs.current.forEach((v) => {
        if (v) {
          v.pause();
          v.removeAttribute("src");
          v.load();
        }
      });
    };
  }, []);

  /* 🎯 ONLY ACTIVE VIDEO PLAYS */
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;

      if (i === activeIndex) {
        setActivated(i);
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
        video.removeAttribute("src");
        video.load();
      }
    });
  }, [activeIndex]);

  /* ⚡ SMART SCROLL */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;

      requestAnimationFrame(() => {
        const height = el.clientHeight;
        const newIndex = Math.round(el.scrollTop / height);

        if (
          newIndex !== activeIndex &&
          newIndex >= 0 &&
          newIndex < videoPosts.length
        ) {
          setActiveIndex(newIndex);
        }

        ticking = false;
      });

      ticking = true;
    };

    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      el.removeEventListener("scroll", onScroll);
    };
  }, [activeIndex, videoPosts.length]);

  /* 🔮 PRELOAD NEXT VIDEO ONLY */
  const preloadNext = useCallback(() => {
    const nextIndex = activeIndex + 1;
    if (nextIndex >= videoPosts.length) return;

    const nextVideo = videoRefs.current[nextIndex];
    if (!nextVideo) return;

    if (!nextVideo.src) {
      nextVideo.src = videoPosts[nextIndex].media_url;
      nextVideo.preload = "metadata";
    }
  }, [activeIndex, videoPosts]);

  useEffect(() => {
    preloadNext();
  }, [activeIndex, preloadNext]);

  return (
    <div className="dfp-wrapper">
      {/* TOP BAR */}
      <div className="dfp-top">
        <button className="dfp-back" onClick={onClose}>
          ←
        </button>
        <img
          className="dfp-avatar"
          src={
            activePost.author?.avatar_url ||
            "/default-avatar.png"
          }
          onClick={() => {
            onClose();
            router.push(`/profile/${activePost.author.username}`);
          }}
        />
      </div>

      {/* VIDEO STACK */}
      <div className="dfp-scroll" ref={containerRef}>
        {videoPosts.map((post, i) => (
          <section className="dfp-item" key={post.id}>
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={
                i === activeIndex
                  ? post.media_url
                  : undefined
              }
              className="dfp-video"
              playsInline
              preload="none"
              muted
            />
          </section>
        ))}
      </div>

      {/* RIGHT ACTIONS */}
      <div className="dfp-right">
        <button onClick={() => setShowFeel(true)}>💛</button>
        <button onClick={() => setShowReflect(true)}>💬</button>
        <button onClick={() => setShowReEcho(true)}>🔁</button>
        <button onClick={() => setMenuOpen(true)}>⋮</button>
      </div>

      {/* MODALS */}
      {showFeel && (
        <FeelPanel
          onClose={() => setShowFeel(false)}
          onSelect={() => setShowFeel(false)}
        />
      )}

      {showReflect && (
        <ReflectModal
          postId={activePost.id}
          onClose={() => setShowReflect(false)}
        />
      )}

      {showReEcho && (
        <ReEchoModal
          postId={activePost.id}
          onClose={() => setShowReEcho(false)}
          onDirect={() => setShowReEcho(false)}
          onMessage={() =>
            router.push(`/reecho/message/${activePost.id}`)
          }
          onUsers={() => {}}
          onCircle={() => {}}
          onShare={() => {}}
        />
      )}

      {menuOpen && (
        <PostMenu
          isOwner={activePost.isOwner}
          post={{
            ...activePost,
            shareUrl: `https://dolrise.com/post/${activePost.slug}`,
          }}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
}
