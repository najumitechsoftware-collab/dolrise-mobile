"use client";


import { useEffect, useMemo } from "react";

export default function ReviewPanel({ state }: any) {
  /* 🔒 GUARD: idan state bai zo ba */
  if (!state) return null;

  const {
    mood = "",
    type = "",
    text = "",
    description = "",
    mediaFiles = [],
    audioFile = null,
    visibility = "Public",
    reflect = "on",
    reecho = "on",
    location = "",
  } = state;

  /* 🧠 Create preview URLs safely */
  const mediaPreviews = useMemo(() => {
    if (!Array.isArray(mediaFiles)) return [];
    return mediaFiles.map((file: File) => ({
  url: URL.createObjectURL(file),
  type: file.type,
}));
  }, [mediaFiles]);

  const audioPreview = useMemo(() => {
    return audioFile ? URL.createObjectURL(audioFile) : null;
  }, [audioFile]);

  /* 🧹 Cleanup object URLs (VERY IMPORTANT) */
   useEffect(() => {
  return () => {
    mediaPreviews.forEach((m) => {
      URL.revokeObjectURL(m.url);
    });

    if (audioPreview) {
      URL.revokeObjectURL(audioPreview);
    }
  };
}, [mediaPreviews, audioPreview]);

  return (
    <div className="review-box">
      <h3 className="rv-title">🔍 Review Before Publishing</h3>

      <div className="rv-item">
        <span className="rv-label">Mood:</span>
        <span className="rv-value">{mood || "Not selected"}</span>
      </div>

      <div className="rv-item">
        <span className="rv-label">Type:</span>
        <span className="rv-value">{type || "No type"}</span>
      </div>

      {(text || description) && (
        <div className="rv-item">
          <span className="rv-label">Caption:</span>
          <span className="rv-value">{text || description}</span>
        </div>
      )}

      {location && (
        <div className="rv-item">
          <span className="rv-label">Location:</span>
          <span className="rv-value">{location}</span>
        </div>
      )}

      {/* 📸 MEDIA PREVIEW */}
      {mediaPreviews.length > 0 && (
        <div className="rv-media-section">
          <span className="rv-label">Media:</span>
          <div className="rv-media-grid">
            {mediaPreviews.map((m, i) => (
              <div className="rv-media-item" key={i}>
                {m.type.startsWith("image") ? (
                  <img src={m.url} alt="preview" />
                ) : (
                  <video src={m.url} controls />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🎤 AUDIO PREVIEW */}
      {audioPreview && (
        <div className="rv-media-section">
          <span className="rv-label">Audio:</span>
          <audio controls src={audioPreview} className="rv-audio" />
        </div>
      )}

      {/* ⚙️ SETTINGS */}
      <div className="rv-item">
        <span className="rv-label">Visibility:</span>
        <span className="rv-value">{visibility}</span>
      </div>

      <div className="rv-item">
        <span className="rv-label">Reflect:</span>
        <span className="rv-value">{reflect}</span>
      </div>

      <div className="rv-item">
        <span className="rv-label">ReEcho:</span>
        <span className="rv-value">{reecho}</span>
      </div>
    </div>
  );
}
