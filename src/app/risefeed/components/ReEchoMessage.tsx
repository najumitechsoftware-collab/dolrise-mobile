"use client";


import { useState } from "react";

export default function ReEchoMessage({ postId, onClose }: any) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitMessage() {
    if (!text.trim()) {
      alert("Please enter a message.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `https://api.dolrise.com/api/feed/${postId}/reecho`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        },
      );

      if (!res.ok) {
        alert("Failed to submit message.");
        setLoading(false);
        return;
      }

      alert("ReEcho sent!");
      onClose();
    } catch (e) {
      console.error(e);
      alert("Network error.");
    }

    setLoading(false);
  }

  return (
    <div className="reecho-overlay" onClick={onClose}>
      <div className="reecho-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="reecho-title">Emotional Message</h3>

        <textarea
          placeholder="Write your emotional message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="reecho-textarea"
        />

        <button className="reecho-item" onClick={submitMessage}>
          {loading ? "Sending..." : "Send Message"}
        </button>

        <button className="reecho-cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
