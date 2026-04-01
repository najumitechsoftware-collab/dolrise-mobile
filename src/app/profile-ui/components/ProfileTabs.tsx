"use client";

type Tab = "posts" | "about" | "saved" | "reflections";

export default function ProfileTabs({
  active,
  onChange,
  isOwner,
}: {
  active: Tab;
  onChange: (tab: Tab) => void;
  isOwner?: boolean;
}) {
  return (
    <nav className="profile-tabs">
      <button
        className={`profile-tab ${active === "posts" ? "active" : ""}`}
        onClick={() => onChange("posts")}
      >
        Posts
      </button>

      <button
        className={`profile-tab ${active === "about" ? "active" : ""}`}
        onClick={() => onChange("about")}
      >
        About
      </button>

      {/* OWNER ONLY */}
      {isOwner && (
        <button
          className={`profile-tab ${active === "saved" ? "active" : ""}`}
          onClick={() => onChange("saved")}
        >
          Saved
        </button>
      )}

      {/* OWNER ONLY */}
      {isOwner && (
        <button
          className={`profile-tab ${
            active === "reflections" ? "active" : ""
          }`}
          onClick={() => onChange("reflections")}
        >
          Reflections
        </button>
      )}
    </nav>
  );
}
