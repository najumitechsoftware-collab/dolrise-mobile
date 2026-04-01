"use client";
import { useState } from "react";
import useVoiceRecorder from "./useVoiceRecorder";

const API = "https://api.dolrise.com/api";

export default function ReflectInput({ postId, onNewReflect }: any) {
  const [text, setText] = useState("");

  const uploadVoice = async (blob: Blob) => {
    console.log("📤 uploading voice...");

    try {
      const formData = new FormData();
      formData.append("voice", blob, "voice.webm");

      const res = await fetch(`${API}/feed/${postId}/reflect`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      console.log("VOICE RESPONSE:", data);

      if (data.status === "reflected") {
        onNewReflect({
          reflect_type: "voice",
          voice_url: data.voice_url,
          created_at: new Date().toISOString(),
          user: { username: "You" },
        });
      }
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
    }
  };

  // ✅ THIS IS THE FIX
  const recorder = useVoiceRecorder(uploadVoice);

  const sendText = async () => {
    if (!text.trim()) return;

    const res = await fetch(`${API}/feed/${postId}/reflect`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text }),
    });

    const data = await res.json();

    if (data.status === "reflected") {
      onNewReflect({
        reflect_type: "text",
        content: text,
        created_at: new Date().toISOString(),
        user: { username: "You" },
      });
      setText("");
    }
  };

  return (
    <div style={{ width: "100%", position: "fixed", bottom: 0 }}>
      <div style={{ display: "flex", padding: 10 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write reflect…"
          style={{ flex: 1 }}
        />

        {text.trim() ? (
          <button onClick={sendText}>➤</button>
        ) : recorder.recording ? (
          <button onClick={recorder.stop}>⏹</button>
        ) : (
          <button onClick={recorder.start}>🎙️</button>
        )}
      </div>

      {recorder.recording && (
        <div>Recording… {recorder.timer}s</div>
      )}
    </div>
  );
}
