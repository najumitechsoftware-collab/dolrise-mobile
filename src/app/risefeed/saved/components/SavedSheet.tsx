"use client";

import "../styles/SavedSheet.css";
import { useEffect, useState } from "react";
import { getSavedPosts } from "../api/savedApi";
import SavedList from "./SavedList";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activePost?: any;
}

export default function SavedSheet({ isOpen, onClose, activePost }: Props) {
  const [savedPosts, setSavedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    getSavedPosts()
      .then(setSavedPosts)
      .finally(() => setLoading(false));
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="saved-backdrop" onClick={onClose}>
      <div
        className="saved-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="saved-header">
          <div className="saved-handle" />
          <h3>Saved</h3>
          <p>Your private space</p>
        </div>

        {activePost && (
          <div className="saved-active">
            <span>Recently saved</span>
            <div className="saved-mini">
              <img
                src={activePost.media_url}
                alt=""
              />
              <div>
                <strong>@{activePost.author?.username}</strong>
                <p>{activePost.content?.slice(0, 60)}…</p>
              </div>
            </div>
          </div>
        )}

        <div className="saved-divider" />

        {loading ? (
          <div className="saved-loading">Loading…</div>
        ) : (
          <SavedList posts={savedPosts} />
        )}
      </div>
    </div>
  );
}
