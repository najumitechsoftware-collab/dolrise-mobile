"use client";

import { useEffect, useState } from "react";
import "./IdentitySection.css";

/* ======================
   TYPES
====================== */
type Props = {
  initial?: {
    display_name?: string;
    pronouns?: string;
  };
  saving: boolean;
  onSave: (data: {
    display_name?: string;
    pronouns?: string;
  }) => void;
  onBack: () => void;
};

/* ======================
   COMPONENT
====================== */
export default function IdentitySection({
  initial,
  saving,
  onSave,
  onBack,
}: Props) {
  const [displayName, setDisplayName] = useState("");
  const [pronouns, setPronouns] = useState("");

  /* ======================
     PREFILL FROM BACKEND
  ====================== */
  useEffect(() => {
    if (initial?.display_name) {
      setDisplayName(initial.display_name);
    }
    if (initial?.pronouns) {
      setPronouns(initial.pronouns);
    }
  }, [initial]);

  return (
    <div className="identity-sheet">
      {/* ======================
          HEADER
      ====================== */}
      <header className="identity-header">
        <button
          className="identity-back"
          onClick={onBack}
          aria-label="Back"
        >
          ← Back
        </button>

        <h2>Identity preferences</h2>
        <p className="identity-sub">
          Decide how your name and identity appear to others.
          You can always change this later.
        </p>
      </header>

      {/* ======================
          BODY
      ====================== */}
      <div className="identity-body">
        {/* DISPLAY NAME */}
        <div className="identity-field">
          <label>Display name</label>
          <input
            type="text"
            placeholder="How your name appears on DolRise"
            value={displayName}
            onChange={(e) =>
              setDisplayName(e.target.value)
            }
          />
          <small>
            This does not change your username.
          </small>
        </div>

        {/* PRONOUNS */}
        <div className="identity-field">
          <label>Pronouns (optional)</label>
          <input
            type="text"
            placeholder="e.g. she/her, he/him, they/them"
            value={pronouns}
            onChange={(e) =>
              setPronouns(e.target.value)
            }
          />
          <small>
            Helps people address you respectfully.
          </small>
        </div>
      </div>

      {/* ======================
          FOOTER
      ====================== */}
      <footer className="identity-footer">
        <button
          className="save-btn"
          disabled={saving}
          onClick={() =>
            onSave({
              display_name:
                displayName.trim() || undefined,
              pronouns:
                pronouns.trim() || undefined,
            })
          }
        >
          {saving ? "Saving…" : "Save identity"}
        </button>
      </footer>
    </div>
  );
}
