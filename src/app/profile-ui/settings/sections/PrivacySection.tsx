"use client";

import { useEffect, useState } from "react";
import "./PrivacySection.css";

type PrivacyData = {
  privacy_profile: "public" | "followers" | "private";
  privacy_posts: "public" | "followers" | "private";
  show_bio: boolean;
  show_location: boolean;
  show_birthday: boolean;
};

export default function PrivacySection({ onBack }: { onBack: () => void }) {
  const [data, setData] = useState<PrivacyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API}/settings/privacy/privacy`, {
      credentials: "include",
    })
      .then(async (r) => {
        if (!r.ok) throw new Error("Failed");
        return r.json();
      })
      .then(setData)
      .catch(() => setError("Failed to load privacy settings"))
      .finally(() => setLoading(false));
  }, []);

  async function save(next: Partial<PrivacyData>) {
    if (!data) return;
    const updated = { ...data, ...next };
    setData(updated);

    await fetch(`${API}/settings/privacy/privacy`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
  }

  if (loading) {
    return <p className="privacy-loading">Loading privacy…</p>;
  }

  if (error || !data) {
    return <p className="privacy-error">{error}</p>;
  }

  return (
    <div className="privacy-root">
      <header className="privacy-header">
        <button onClick={onBack}>← Back</button>
        <h2>Privacy & Visibility</h2>
        <p>Control who can see your profile & activity</p>
      </header>

      <section>
        <h4>Profile visibility</h4>
        <select
          value={data.privacy_profile}
          onChange={(e) =>
            save({ privacy_profile: e.target.value as any })
          }
        >
          <option value="public">Public</option>
          <option value="followers">Followers</option>
          <option value="private">Only me</option>
        </select>
      </section>

      <section>
        <h4>Posts visibility</h4>
        <select
          value={data.privacy_posts}
          onChange={(e) =>
            save({ privacy_posts: e.target.value as any })
          }
        >
          <option value="public">Public</option>
          <option value="followers">Followers</option>
          <option value="private">Only me</option>
        </select>
      </section>

      <section>
        <h4>Profile details</h4>

        <Toggle
          label="Show bio"
          value={data.show_bio}
          onChange={(v) => save({ show_bio: v })}
        />
        <Toggle
          label="Show location"
          value={data.show_location}
          onChange={(v) => save({ show_location: v })}
        />
        <Toggle
          label="Show birthday"
          value={data.show_birthday}
          onChange={(v) => save({ show_birthday: v })}
        />
      </section>
    </div>
  );
}

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="privacy-toggle">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
}
