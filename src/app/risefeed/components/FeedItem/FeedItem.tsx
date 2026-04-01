"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  memo,
} from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import "./FeedItem.css";
import "./LumiSuggestion.css";
import LumiSuggestion from "./LumiSuggestion";
import DolFlowPlayer from "../DolFlowPlayer";
import FeelPanel from "./FeelPanel/FeelPanel";
import PostActions from "./PostActions";
import PostCaption from "./PostCaption";
import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";
import PostMenu from "../PostMenu/PostMenu";

/* 🔥 Lazy-loaded heavy modals */
const UpliftModal = dynamic(() => import("../UpliftModal"));
const ReEchoModal = dynamic(() => import("../ReEchoModal"));
const ReflectModal = dynamic(() => import("../ReflectModal"));

let feelAudio: HTMLAudioElement | null = null;
const noop = () => {};

interface FeedItemProps {
  post: any;
  index: number;
  allPosts: any[];
  onFlowGlobal?: (userId: number) => void;
  context?: "feed" | "public" | "profile" | "saved";
  paused?: boolean;
}

const FeedItem = memo(function FeedItem({
  post,
  index,
  allPosts,
  onFlowGlobal,
  context = "feed",
  paused = false,
}: FeedItemProps) {

  const router = useRouter();
  const postRef = useRef<HTMLDivElement | null>(null);

  /* ===============================
     STATE
  =============================== */

  const [felt, setFelt] = useState(!!post.user_has_felt);
  const [feelCount, setFeelCount] = useState(Number(post.feels_count) || 0);
  const [reflectCount, setReflectCount] = useState(Number(post.reflects_count) || 0);
  const [reechoCount, setReechoCount] = useState(Number(post.reecho_count) || 0);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showReflect, setShowReflect] = useState(false);
  const [showReEcho, setShowReEcho] = useState(false);
  const [showUplift, setShowUplift] = useState(false);
  const [showFS, setShowFS] = useState(false);
  const [showFeelPanel, setShowFeelPanel] = useState(false);

  /* ===============================
     Sync only when post.id changes
  =============================== */
	
  useEffect(() => {
    setFelt(!!post.user_has_felt);
    setFeelCount(Number(post.feels_count) || 0);
    setReflectCount(Number(post.reflects_count) || 0);
    setReechoCount(Number(post.reecho_count) || 0);
  }, [post.id]);

  /* ===============================
     Init Audio Once
  =============================== */
	
  useEffect(() => {
    if (!feelAudio) {
      feelAudio = new Audio("/sounds/feel.mp3");
    }
  }, []);

  /* ===============================
     Handlers (Stable)
  =============================== */

  const sendFeel = useCallback(async () => {
    try {
      await fetch(`/api/feed/${post.id}/feel`, {
        method: felt ? "DELETE" : "POST",
        credentials: "include",
      });
    } catch {}
  }, [post.id, felt]);

  const handleFlow = useCallback(() => {
    if (!paused && onFlowGlobal && post.author?.id) {
      onFlowGlobal(post.author.id);
    }
  }, [paused, onFlowGlobal, post.author?.id]);

  const handleMenuOpen = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (!paused) setMenuOpen(true);
    },
    [paused]
  );

  const handleFeelClick = useCallback(() => {
    if (paused) return;
    setShowFeelPanel(true);
    feelAudio?.play().catch(() => {});
  }, [paused]);

  const handleReflect = useCallback(() => {
    if (!paused) setShowReflect(true);
  }, [paused]);

  const handleReEcho = useCallback(() => {
    if (!paused) setShowReEcho(true);
	  }, [paused]);

  const handleUplift = useCallback(() => {
    if (!paused) setShowUplift(true);
  }, [paused]);

  const handleFSOpen = useCallback(() => {
    setShowFS(true);
  }, []);

  /* ===============================
     RENDER
  =============================== */

  return (
    <>
      <div
        id={`post-${post.id}`}
        ref={postRef}
        className={`feed-card feed-card-v2 mood-${(
          post.mood || "neutral"
        ).toLowerCase()} ${paused ? "paused" : ""}`}
      >

<div className="feed-header-wrapper">
  <PostHeader
    post={post}
  />

  {post.isOwner && (
    <button
      className="feed-menu-btn"
      aria-label="Post options"
      onClick={handleMenuOpen}
    >
      ⋮
    </button>
  )}
</div>

        {post.lumi_reason && (
          <LumiSuggestion reason={post.lumi_reason} />
        )}

        <PostCaption post={post} />

        <PostMedia
          post={post}
        />

        <PostActions
          felt={felt}
          disabled={paused}
          onFeel={paused ? noop : handleFeelClick}
          onReflect={paused ? noop : handleReflect}
          onReEcho={paused ? noop : handleReEcho}
          onUplift={paused ? noop : handleUplift}
        />

      </div>

      {showFS &&
        post?.type?.toLowerCase().includes("video") && (
          <DolFlowPlayer
            index={index}
            allPosts={allPosts}
            onClose={() => setShowFS(false)}
          />
        )}

      {showFeelPanel && !paused && (
        <FeelPanel
          onClose={() => setShowFeelPanel(false)}
          onSelect={() => {
            setShowFeelPanel(false);
            if (!felt) {
              setFelt(true);
              setFeelCount((c) => c + 1);
              sendFeel();
            }
          }}
        />
      )}

       {showReflect && !paused && (
  <div className="modal-layer">
    <ReflectModal
      postId={post.id}
      onClose={() => setShowReflect(false)}
      onReflectAdded={() => {}} // ❌ no re-render
    />
  </div>
)}

      {showReEcho && !paused && (
        <ReEchoModal
          postId={post.id}
          onClose={() => setShowReEcho(false)}
          onDirect={() => {
            setReechoCount((c) => c + 1);
            setShowReEcho(false);
          }}
          onMessage={() =>
            router.push(`/reecho/message/${post.id}`)
          }
          onUsers={noop}
          onCircle={noop}
          onShare={noop}
        />
      )}

        {showUplift && !paused && (
    <UpliftModal
  postId={post.id}
  receiverId={post.author?.id} // ✅ FIXED
  onClose={() => setShowUplift(false)}
/>
)}

      {menuOpen && !paused && (
        <PostMenu
          isOwner={post.isOwner}
          post={{
            ...post,
            shareUrl: `/post/${post.slug}`,
          }}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </>
  );
});

export default FeedItem;
