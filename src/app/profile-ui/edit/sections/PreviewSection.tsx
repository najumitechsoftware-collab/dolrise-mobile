"use client";

import { useState } from "react";
import "./PreviewSection.css";

/* ======================
   TYPES
====================== */
type Post = {
  id: number | string;
  content: string;
  created_at?: string;
};

type Stats = {
  posts?: number;
  followers?: number;
  following?: number;
};

type Profile = {
  full_name?: string;
  username?: string;
  avatar_url?: string;
  cover_url?: string;
  bio?: string;
  location?: string;
  website?: string;
  instagram?: string;
  tiktok?: string;
  facebook?: string;
  xhandle?: string;

  show_bio?: boolean;
  show_location?: boolean;
  show_social_links?: boolean;
  show_stats?: boolean;
};

type Props = {
  profile: Profile;
  posts: Post[];
  stats?: Stats;
  onBack: () => void;
};

/* ======================
   COMPONENT
====================== */
export default function PreviewSection({
  profile,
  posts,
  stats,
  onBack,
}: Props) {
  const [tab, setTab] = useState<"posts" | "about">("posts");

  return (
    <div className="preview-sheet">
      {/* HEADER */}
      <header className="preview-header">
        <button className="preview-back" onClick={onBack}>
          ← Back
        </button>
        <h2>Public profile preview</h2>
        <p className="preview-sub">
          This is how visitors see your profile.
        </p>
      </header>

      {/* COVER */}
      <div
        className="preview-cover"
        style={{
          backgroundImage: profile.cover_url
            ? `url(${profile.cover_url})`
            : undefined,
        }}
      />

      {/* AVATAR */}
      <div className="preview-avatar">
        {profile.avatar_url ? (
          <img src={profile.avatar_url} alt="Avatar" />
        ) : (
          <span className="avatar-fallback">
            {profile.full_name?.charAt(0) || "U"}
          </span>
        )}
      </div>

      {/* IDENTITY */}
      <div className="preview-identity">
        <h3>{profile.full_name || "Your name"}</h3>
        <span>@{profile.username || "username"}</span>
      </div>

      {/* STATS (SOCIAL PROOF) */}
      {profile.show_stats !== false && (
        <div className="preview-stats">
          <div className="stat">
            <strong>{stats?.posts ?? posts.length}</strong>
            <span>Posts</span>
          </div>
          <div className="stat">
            <strong>{stats?.followers ?? 0}</strong>
            <span>FlowCircle</span>
          </div>
          <div className="stat">
            <strong>{stats?.following ?? 0}</strong>
            <span>FlowLink</span>
          </div>
        </div>
      )}

      {/* TABS */}
      <div className="preview-tabs">
        <button
          className={tab === "posts" ? "active" : ""}
          onClick={() => setTab("posts")}
        >
          Posts
        </button>
        <button
          className={tab === "about" ? "active" : ""}
          onClick={() => setTab("about")}
        >
          About
        </button>
      </div>

      {/* POSTS TAB */}
      {tab === "posts" && (
        <div className="preview-posts">
          {posts.length === 0 && (
            <p className="empty">No public posts yet.</p>
          )}

          {posts.map((p) => (
            <div key={p.id} className="preview-post">
              {p.content}
            </div>
          ))}
        </div>
      )}

      {/* ABOUT TAB */}
      {tab === "about" && (
        <div className="preview-about">
          {profile.show_bio && profile.bio && (
            <p className="preview-bio">{profile.bio}</p>
          )}

          {profile.show_location && profile.location && (
            <div className="preview-row">
              📍 {profile.location}
            </div>
          )}

          {profile.show_social_links && (
            <div className="preview-links">
              {profile.website && (
                <a href={profile.website} target="_blank">
                  🌐 Website
                </a>
              )}
              {profile.instagram && (
                <span>📸 @{profile.instagram}</span>
              )}
              {profile.xhandle && (
                <span>🐦 @{profile.xhandle}</span>
              )}
              {profile.tiktok && (
                <span>🎵 @{profile.tiktok}</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
