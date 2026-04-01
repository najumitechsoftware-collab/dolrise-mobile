"use client";
import { useState } from "react";
import "./VisibilitySection.css";

type VisibilityState = {
  show_bio: boolean;
  show_location: boolean;
  show_birthday: boolean;
  show_social_links: boolean;
  show_stats: boolean;
};

type Props = {
  initial: Partial<VisibilityState>;
  saving: boolean;
  onSave: (data: VisibilityState) => void;
  onBack: () => void;
};

export default function VisibilitySection({
  initial,
  saving,
  onSave,
  onBack,
}: Props) {
  const [state, setState] = useState<VisibilityState>({
    show_bio: initial.show_bio ?? true,
    show_location: initial.show_location ?? true,
    show_birthday: initial.show_birthday ?? false,
    show_social_links: initial.show_social_links ?? true,
    show_stats: initial.show_stats ?? true,
  });

  const toggle = (key: keyof VisibilityState) => {
    setState((s) => ({ ...s, [key]: !s[key] }));
  };

  return (
    <div className="visibility-section">
      {/* HEADER */}
      <header className="visibility-header">
        <button className="visibility-back" onClick={onBack}>
          ← Back
        </button>
        <h2>Visibility</h2>
        <p className="visibility-sub">
          Control what visitors can see on your profile.
          You always see everything.
        </p>
      </header>

      {/* BODY */}
      <div className="visibility-body">
        <Row
          title="Show my bio"
          desc="If disabled, visitors won’t see your About section."
          checked={state.show_bio}
          onChange={() => toggle("show_bio")}
        />

        <Row
          title="Show my location"
          desc="If disabled, your location stays private."
          checked={state.show_location}
          onChange={() => toggle("show_location")}
        />

        <Row
          title="Show my birthday"
          desc="If disabled, your birthday is hidden."
          checked={state.show_birthday}
          onChange={() => toggle("show_birthday")}
        />

        <Row
          title="Show social links"
          desc="If disabled, external profiles are hidden."
          checked={state.show_social_links}
          onChange={() => toggle("show_social_links")}
        />

        <Row
          title="Show profile stats"
          desc="If disabled, posts & FlowCircle counts are hidden."
          checked={state.show_stats}
          onChange={() => toggle("show_stats")}
        />
      </div>

      {/* FOOTER */}
      <footer className="visibility-footer">
        <div className="visibility-note">
          🔒 These settings help build trust.
        </div>
        <button
          className="save-btn"
          disabled={saving}
          onClick={() => onSave(state)}
        >
          {saving ? "Saving…" : "Done"}
        </button>
      </footer>
    </div>
  );
}

/* ======================
   ROW
====================== */
function Row({
  title,
  desc,
  checked,
  onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="visibility-row">
      <div className="visibility-text">
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
      <label className="visibility-toggle">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span />
      </label>
    </div>
  );
}
