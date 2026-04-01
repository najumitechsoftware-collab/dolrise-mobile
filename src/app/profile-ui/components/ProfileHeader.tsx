"use client";
import { useRouter } from "next/navigation";
import "./ProfileHeader.css";

/* ======================================================
   TYPES
====================================================== */
type Stats = {
  posts?: number;
  followers?: number;
  following?: number;
};

type Profile = {
  full_name?: string | null;
  username?: string | null;

  // support both formats
  avatar?: string | null;
  avatar_url?: string | null;

  cover_photo?: string | null;
  cover_url?: string | null;
};

/* ======================================================
   IMAGE RESOLVER (SMART)
====================================================== */
function resolveImageUrl(url?: string | null) {
  if (!url) return "";

  // already base64
  if (url.startsWith("data:")) return url;

  // 🔥 idan full URL ne amma http → maida shi https
  if (url.startsWith("http://")) {
    return url.replace("http://", "https://");
  }

  if (url.startsWith("https://")) {
    return url;
  }

  // 🔥 idan relative path ne
  return `https://api.dolrise.com${url}?t=${Date.now()}`;
}
/* ======================================================
   COMPONENT
====================================================== */
export default function ProfileHeader({
  profile,
  stats,
}: {
  profile: Profile;
  stats: Stats;
}) {
  const router = useRouter();

  // 🔥 FIX: support both naming styles
  const avatarRaw =
    profile?.avatar_url || profile?.avatar || null;

  const coverRaw =
    profile?.cover_url || profile?.cover_photo || null;

  const avatarUrl = resolveImageUrl(avatarRaw);
  const coverUrl = resolveImageUrl(coverRaw);

  return (
    <header className="profile-header">
      {/* BACK */}
      <button
        className="back-btn"
        onClick={() => router.push("/risefeed")}
      >
        ← Back
      </button>

      {/* COVER */}
      <div className="profile-cover">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt="Profile cover"
            className="profile-cover-img"
          />
        ) : (
          <div className="profile-cover-fallback" />
        )}

        {/* AVATAR */}
        <div className="profile-avatar-float">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Profile avatar"
              className="profile-avatar"
            />
          ) : (
            <div className="profile-avatar placeholder">
            </div>
          )}
        </div>
      </div>

      {/* IDENTITY */}
      <div className="profile-identity">
        <h1 className="profile-name">
          {profile?.full_name || "Your Name"}
        </h1>

        {profile?.username && (
          <p className="profile-username">
            @{profile.username}
          </p>
        )}

        <div className="profile-badge">
          ● DolRise Identity
        </div>
      </div>

      {/* STATS */}
      <div className="profile-stats">
        <div className="stat">
          <strong>{stats?.posts ?? 0}</strong>
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

      {/* 💰 EARNINGS */}
      <div className="profile-earnings">
        <button
          className="btn earnings"
          onClick={() => router.push("/earnings")}
        >
          💰 Earnings Dashboard
          <span className="earnings-sub">
            Track your growth & income
          </span>
        </button>
      </div>

      {/* ACTIONS */}
      <div className="profile-actions">
        <button
          className="btn primary"
          onClick={() => router.push("/profile-ui/edit")}
        >
          Edit Profile
        </button>

        <button
          className="btn ghost"
          onClick={() => router.push("/profile-ui/settings")}
        >
          Settings
        </button>

        <button
          className="btn link"
          onClick={() => router.push("/invite/dashboard")}
        >
          🔗 Invite
        </button>
      </div>
    </header>
  );
}
