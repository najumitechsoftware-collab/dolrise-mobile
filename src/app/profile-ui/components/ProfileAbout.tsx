"use client";
import "./ProfileAbout.css";

export default function ProfileAbout({
  profile,
  stats,
}: {
  profile: any;
  stats: any;
}) {
  return (
    <section className="profile-about-wrapper">

      {/* ================= ESSENCE ================= */}
      <div className="about-essence-card">
        {profile.bio && (
          <p className="about-bio-large">
            {profile.bio}
          </p>
        )}

        <div className="about-identity-row">
          {profile.profession && (
            <span className="about-profession">
              {profile.profession}
            </span>
          )}

          {profile.pronouns && (
            <span className="about-pronouns">
              {profile.pronouns}
            </span>
          )}

          {profile.created_at && (
            <span className="about-joined">
              Joined{" "}
              {new Date(profile.created_at).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {/* ================= PRESENCE ================= */}
      <div className="about-presence-card">
        <div className="about-grid">

          {profile.location && (
            <div className="about-item">
              <span className="about-label">Location</span>
              <span className="about-value">
                {profile.location}
              </span>
            </div>
          )}

          {profile.website && (
            <div className="about-item">
              <span className="about-label">Website</span>
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="about-link"
              >
                {profile.website}
              </a>
            </div>
          )}

          {profile.instagram && (
            <div className="about-item">
              <span className="about-label">Instagram</span>
              <a
                href={`https://instagram.com/${profile.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="about-link"
              >
                @{profile.instagram}
              </a>
            </div>
          )}

          {profile.tiktok && (
            <div className="about-item">
              <span className="about-label">TikTok</span>
              <a
                href={`https://tiktok.com/@${profile.tiktok}`}
                target="_blank"
                rel="noopener noreferrer"
                className="about-link"
              >
                @{profile.tiktok}
              </a>
            </div>
          )}

          {profile.facebook && (
            <div className="about-item">
              <span className="about-label">Facebook</span>
              <span className="about-value">
                {profile.facebook}
              </span>
            </div>
          )}

          {profile.xhandle && (
            <div className="about-item">
              <span className="about-label">X</span>
              <a
                href={`https://x.com/${profile.xhandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="about-link"
              >
                @{profile.xhandle}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* ================= DOLRISE SIGNATURE ================= */}
      <div className="about-flow-card">
        <div className="flow-stat">
          <span className="flow-number">
            {stats?.flowCircle ?? 0}
          </span>
          <span className="flow-label">
            Flowed by
          </span>
        </div>

        <div className="flow-stat">
          <span className="flow-number">
            {stats?.flowLink ?? 0}
          </span>
          <span className="flow-label">
            Connected to
          </span>
        </div>

        <div className="flow-stat">
          <span className="flow-number">
            {stats?.posts ?? 0}
          </span>
          <span className="flow-label">
            Shared emotions
          </span>
        </div>
      </div>

    </section>
  );
}
