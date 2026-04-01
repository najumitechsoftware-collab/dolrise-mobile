"use client";

import { useState } from "react";
import "./VisualSection.css";

type Props = {
  profile: {
    avatar_url?: string;
    cover_url?: string;
  };
  saving: boolean;
  onSave: (data: { avatar?: File; cover?: File }) => void;
  onBack: () => void;
};

export default function VisualSection({
  profile,
  saving,
  onSave,
  onBack,
}: Props) {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);

  const avatarPreview = avatar
    ? URL.createObjectURL(avatar)
    : profile.avatar_url
    ? `${process.env.NEXT_PUBLIC_API_URL}${profile.avatar_url}`
    : null;

  const coverPreview = cover
    ? URL.createObjectURL(cover)
    : profile.cover_url
    ? `${process.env.NEXT_PUBLIC_API_URL}${profile.cover_url}`
    : null;

  const submit = () => {
    const payload: { avatar?: File; cover?: File } = {};
    if (avatar) payload.avatar = avatar;
    if (cover) payload.cover = cover;
    onSave(payload);
  };

  return (
    <div className="visual-sheet">
      {/* HEADER */}
      <header className="visual-header">
        <button className="visual-back" onClick={onBack}>
          ← Back
        </button>
        <h2>Visual Identity</h2>
        <p className="visual-sub">
          Your photo and cover help people recognize you.
        </p>
      </header>

      {/* BODY */}
      <div className="visual-body">
        {/* COVER */}
        <div className="cover-upload">
          <div
            className="cover-preview"
            style={
              coverPreview
                ? { backgroundImage: `url(${coverPreview})` }
                : undefined
            }
          >
            {!coverPreview && (
              <span className="cover-placeholder">
                Cover photo
              </span>
            )}
          </div>

          <label className="upload-btn">
            Change cover
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                setCover(e.target.files?.[0] || null)
              }
            />
          </label>
        </div>

        {/* AVATAR */}
        <div className="avatar-upload">
          <div className="avatar-preview">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar preview" />
            ) : (
              <span className="avatar-placeholder">U</span>
            )}
          </div>

          <label className="upload-btn small">
            Change avatar
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                setAvatar(e.target.files?.[0] || null)
              }
            />
          </label>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="visual-footer">
        <button
          className="save-btn"
          disabled={saving || (!avatar && !cover)}
          onClick={submit}
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </footer>
    </div>
  );
}
