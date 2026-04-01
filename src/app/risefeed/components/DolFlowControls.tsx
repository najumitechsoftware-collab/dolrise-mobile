"use client";
import { useRouter } from "next/navigation";


import { useState } from "react";

export default function DolFlowControls({ post }: any) {
  const router = useRouter();

  const [felt, setFelt] = useState<boolean>(post.is_felt_by_user || false);
  const [count, setCount] = useState<number>(post.feels_count || 0);

  /* ============================================================
        FEEL SYSTEM
  ============================================================ */
  const handleFeel = async () => {
    try {
      const url = `https://api.dolrise.com/api/feed/${post.id}/feel`;

      if (!felt) {
        const r = await fetch(url, { method: "POST", credentials: "include" });
        if (r.ok) {
          setFelt(true);
          setCount((n: number) => n + 1);
        }
      } else {
        const r = await fetch(url, {
          method: "DELETE",
          credentials: "include",
        });
        if (r.ok) {
          setFelt(false);
          setCount((n: number) => Math.max(n - 1, 0));
        }
      }
    } catch (err) {
      console.error("Feel error:", err);
    }
  };

  /* ============================================================
        REFLECT
  ============================================================ */
  const openReflect = () => {
    router.push(`/reflect/${post.id}`);
  };

  /* ============================================================
        REECHO
  ============================================================ */
  const openReEcho = () => {
    router.push(`/reecho/${post.id}`);
  };

  /* ============================================================
        MENU
  ============================================================ */
const openMenu = () => {
  router.push(`/dashboard/posts/${post.id}/menu`);
};
  /* ============================================================
        PROFILE
  ============================================================ */
  const openProfile = () => {
    router.push(`/profile/${post.author.username}`);
  };

  return (
    <div className="dolflow-controls">
      {/* FEEL */}
      <button
        className={felt ? "feel-btn active" : "feel-btn"}
        onClick={handleFeel}
      >
        💫 <span>{count}</span>
      </button>

      {/* REFLECT */}
      <button className="action-btn" onClick={openReflect}>
        ✨ <span>{post.reflects_count || 0}</span>
      </button>

      {/* REECHO */}
      <button className="action-btn" onClick={openReEcho}>
        🔁 <span>{post.reecho_count || 0}</span>
      </button>

      {/* MENU */}
      <button className="action-btn" onClick={openMenu}>
        ⋮
      </button>

      {/* PROFILE */}
      <img
        src={post.author.avatar_url || "/default-avatar.png"}
        className="dl-avatar"
        onClick={openProfile}
      />
    </div>
  );
}
