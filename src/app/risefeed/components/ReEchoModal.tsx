"use client";

import "./ReEchoModal.css";
import { useState } from "react";

interface Props {
  postId: number;
  onClose: () => void;
  onDirect: () => void;
  onMessage: () => void;
  onUsers: () => void;
  onCircle: () => void;
  onShare: () => void;
}

export default function ReEchoModal({
  postId,
  onClose,
  onDirect,
  onMessage,
  onUsers,
  onCircle,
}: Props) {
  const [loading, setLoading] = useState(false);

  // ⚡ INSTANT ReEcho (Optimistic UX)
  const handleReEchoNow = async () => {
    if (loading) return;
    setLoading(true);

    // ✅ instant feedback (no wait)
    onDirect();
    onClose();

    try {
      await fetch(`https://api.dolrise.com/api/feed/${postId}/reecho`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // ❌ silent fail (UX-first)
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
      const link = `https://dolrise.com/p/${postId}`;
    if (navigator.share) {
      await navigator.share({
        title: "DolRise",
        text: "Feel this moment 💫",
        url: link,
      });
    } else {
      navigator.clipboard.writeText(link);
    }
    onClose();
  };

  return (
    <div className="reecho-overlay">
      <div className="reecho-modal scale-in">
        <div className="reecho-header">
          <h3>ReEcho</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* MAIN ACTION */}
        <button
          className="reecho-primary"
          disabled={loading}
          onClick={handleReEchoNow}
        >
          🔁 {loading ? "ReEchoing..." : "ReEcho Now"}
        </button>

        {/* SECONDARY */}
        <button className="reecho-item" onClick={onMessage}>
          📝 Emotional Message
        </button>

        <div className="reecho-divider" />

        {/* SHARE OPTIONS */}
        <div className="reecho-row">
          <button onClick={onUsers}>
            👥 <span>FlowLink</span>
          </button>
          <button onClick={onCircle}>
            👨‍👩‍👧 <span>Circle</span>
          </button>
          <button onClick={handleShare}>
            📤 <span>Share</span>
          </button>
        </div>

        <button className="reecho-cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
