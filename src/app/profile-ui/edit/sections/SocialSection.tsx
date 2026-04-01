"use client";

import { useEffect, useState } from "react";
import "./SocialSection.css";

type Props = {
  profile: {
    instagram?: string;
    xhandle?: string;
    website?: string;
  };
  saving: boolean;
  onSave: (data: {
    instagram?: string;
    xhandle?: string;
    website?: string;
  }) => void;
  onBack: () => void;
};

export default function SocialSection({
  profile,
  saving,
  onSave,
  onBack,
}: Props) {
  const [instagram, setInstagram] = useState("");
  const [xhandle, setXhandle] = useState("");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    setInstagram(profile.instagram || "");
    setXhandle(profile.xhandle || "");
    setWebsite(profile.website || "");
  }, [profile]);

  return (
    <div className="social-sheet">
      {/* HEADER */}
      <header className="social-header">
        <button
          className="social-back"
          onClick={onBack}
          aria-label="Back"
        >
          ← Back
        </button>

        <h2>Social links</h2>
        <p className="social-emotion">
          Add only the platforms you want people to find you on.
          These links are optional and public.
        </p>
      </header>

      {/* BODY */}
      <div className="social-body">
        {/* INSTAGRAM */}
        <div className="social-field">
          <label>Instagram</label>
          <div className="social-input">
            <span>@</span>
            <input
              placeholder="username"
              value={instagram}
              onChange={(e) =>
                setInstagram(e.target.value)
              }
            />
          </div>
        </div>

        {/* X / TWITTER */}
        <div className="social-field">
          <label>X (Twitter)</label>
          <div className="social-input">
            <span>@</span>
            <input
              placeholder="username"
              value={xhandle}
              onChange={(e) =>
                setXhandle(e.target.value)
              }
            />
          </div>
        </div>

        {/* WEBSITE */}
        <div className="social-field">
          <label>Website</label>
          <div className="social-input">
            <span>🌐</span>
            <input
              placeholder="https://your-site.com"
              value={website}
              onChange={(e) =>
                setWebsite(e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="social-footer">
        <button
          className="save-btn"
          disabled={saving}
          onClick={() =>
            onSave({
              instagram: instagram.trim() || undefined,
              xhandle: xhandle.trim() || undefined,
              website: website.trim() || undefined,
            })
          }
        >
          {saving ? "Saving…" : "Save links"}
        </button>
      </footer>
    </div>
  );
}
