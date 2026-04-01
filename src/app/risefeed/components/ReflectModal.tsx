"use client";

import { useEffect, useRef, useState } from "react";
import VoiceRecorder from "@/app/risefeed/components/VoiceRecorder";
import "./ReflectModal.css";

const API = "https://api.dolrise.com/api";

export default function ReflectModal({ postId, onClose }: any) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showVoice, setShowVoice] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const sendText = async () => {
    if (!text.trim()) return;

    await fetch(`${API}/feed/${postId}/reflect`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        post_id: postId,
        reflect_type: "text",
        content: text,
      }),
    });

    setText("");
    setIsFocused(false);
  };

  const handleVoiceSend = async (blob: Blob) => {
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(",")[1];

      await fetch(`${API}/feed/${postId}/reflect`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post_id: postId,
          reflect_type: "voice",
          voice_blob: base64,
        }),
      });

      setShowVoice(false);
    };

    reader.readAsDataURL(blob);
  };

  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
  };

  const sendImage = async () => {
    if (!imagePreview) return;

    const res = await fetch(imagePreview);
    const blob = await res.blob();

    const form = new FormData();
    form.append("file", blob);

    await fetch(`${API}/feed/${postId}/reflect-image`, {
      method: "POST",
      credentials: "include",
      body: form,
    });

    setImagePreview(null);
  };

  return (
    <div className="reflect-overlay" onClick={onClose}>
      <div className="reflect-modal" onClick={(e) => e.stopPropagation()}>
        <div className="reflect-header">
          <h3>Reflect</h3>
          <button onClick={onClose}>✕</button>
        </div>

        {/* ✅ FIXED (no ReflectList) */}
        <div className="reflect-list-wrap">
          <p style={{ padding: 10, opacity: 0.7 }}>
            No reflects yet
          </p>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

        {imagePreview && (
          <div style={{ padding: 10 }}>
            <img
              src={imagePreview}
              style={{
                width: 80,
                height: 80,
                borderRadius: 10,
                objectFit: "cover",
              }}
            />
            <button onClick={sendImage}>Send Image</button>
          </div>
        )}

        {showVoice && (
          <div style={{ padding: 10 }}>
            <VoiceRecorder onSend={handleVoiceSend} />
          </div>
        )}

        <div className={`reflect-bottom-bar ${isFocused ? "active" : ""}`}>
          <img src="/default-avatar.png" className="bottom-avatar" />

          <div className="input-wrap">
            <input
              type="text"
              placeholder="Share your thoughts..."
              value={text}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                if (!text) setIsFocused(false);
              }}
              onChange={(e) => setText(e.target.value)}
            />

            {!isFocused && (
              <div className="input-icons">
                <span onClick={handlePickImage}>🖼</span>
                <span onClick={() => setText((t) => t + "😊")}>😊</span>
                <span onClick={() => setShowVoice(true)}>🎤</span>
              </div>
            )}
          </div>

          {isFocused && (
            <div className="expanded-actions">
              <div className="left">
                <span onClick={handlePickImage}>🖼</span>
                <span onClick={() => setText((t) => t + "😊")}>😊</span>
                <span onClick={() => setShowVoice(true)}>🎤</span>
              </div>

              <button
                className={`send-btn ${text.trim() ? "active" : ""}`}
                disabled={!text.trim()}
                onClick={sendText}
              >
                ➤
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
