"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMyProfile } from "@/lib/api/profile";
import "./Invite.css";

export default function InviteDashboardPage() {
  const router = useRouter();

  const [username, setUsername] = useState<string | null>(null);
  const [copied, setCopied] = useState<null | "family" | "friends">(null);
  const [authFailed, setAuthFailed] = useState(false);

  /* ======================================
     SILENT PROFILE LOAD (NO BLOCKING UI)
  ====================================== */
  useEffect(() => {
    getMyProfile()
      .then((data) => {
        if (data?.profile?.username) {
          setUsername(data.profile.username);
        } else {
          setAuthFailed(true);
        }
      })
      .catch(() => {
        setAuthFailed(true);
      });
  }, []);

  /* ======================================
     INVITE LINKS — OFFICIAL /i GATEWAY
  ====================================== */
  const base = "https://www.dolrise.com";
  const familyLink = username
    ? `${base}/i/${username}?via=family`
    : "";
  const friendsLink = username
    ? `${base}/i/${username}?via=friends`
    : "";

  /* ======================================
     ACTIONS
  ====================================== */
  const copy = async (text: string, type: "family" | "friends") => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 1800);
  };

  const shareWhatsApp = (link: string) => {
    if (!link) return;
    const msg = encodeURIComponent(
      "I’ve been using DolRise — a calm space for reflection and emotional clarity 🌿\n\nYou’re welcome here:\n" +
        link
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  const shareX = (link: string) => {
    if (!link) return;
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}`,
      "_blank"
    );
  };

  const shareFacebook = (link: string) => {
    if (!link) return;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        link
      )}`,
      "_blank"
    );
  };

  /* ======================================
     AUTH FALLBACK (NO LOOPS)
  ====================================== */
  if (authFailed) {
    return (
      <main className="invite-page">
        <section className="invite-locked">
          <h2>This is your personal space</h2>
          <p>
            Sign in to access your invite links and share DolRise intentionally.
          </p>
          <button
            className="invite-primary"
            onClick={() => router.push("/auth/login")}
          >
            Sign in
          </button>
        </section>
      </main>
    );
  }

  /* ======================================
     RENDER — NO LOADING WALL
  ====================================== */
  return (
    <main className="invite-page">
      {/* HEADER */}
      <header className="invite-header">
        <h1>Invite into DolRise</h1>
        <p>
          Share DolRise gently — with people who value calm, meaning, and
          emotional clarity.
        </p>
      </header>

      {/* INVITE CARDS */}
      <section className="invite-cards">
        {/* FAMILY */}
        <div className="invite-card">
          <h2>Invite Family</h2>
          <p className="invite-desc">
            For people closest to you — a quiet, intentional invitation.
          </p>

          <div className="invite-link-box">{familyLink}</div>

          <div className="invite-actions">
            <button onClick={() => copy(familyLink, "family")}>
              {copied === "family" ? "Copied ✓" : "Copy link"}
            </button>
            <button onClick={() => shareWhatsApp(familyLink)}>
              WhatsApp
            </button>
          </div>
        </div>

        {/* FRIENDS */}
        <div className="invite-card">
          <h2>Invite Friends</h2>
          <p className="invite-desc">
            For friends, colleagues, and thoughtful communities.
          </p>

          <div className="invite-link-box">{friendsLink}</div>

          <div className="invite-actions">
            <button onClick={() => copy(friendsLink, "friends")}>
              {copied === "friends" ? "Copied ✓" : "Copy link"}
            </button>
            <button onClick={() => shareWhatsApp(friendsLink)}>
              WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* OTHER PLATFORMS */}
      <section className="invite-share">
        <h3>Share on other platforms</h3>
        <div className="share-buttons">
          <button onClick={() => shareFacebook(friendsLink)}>
            Facebook
          </button>
          <button onClick={() => shareX(friendsLink)}>X</button>
          <button onClick={() => copy(friendsLink, "friends")}>
            Instagram
          </button>
          <button onClick={() => copy(friendsLink, "friends")}>
            TikTok
          </button>
        </div>

        <p className="invite-note">
          DolRise grows through trust — not pressure, not algorithms.
        </p>
      </section>

      {/* PARTNER */}
      <section className="partner-cta">
        <h2>Become a DolRise Partner</h2>
        <p>
          Some people help DolRise grow by bringing aligned communities. Partners
          help shape the future of this space.
        </p>

        <button
          className="partner-btn"
          onClick={() => router.push("/partner")}
        >
          Learn how to become a partner
        </button>

        <span className="partner-footnote">
          Partnership is based on alignment, care, and contribution.
        </span>
      </section>
    </main>
  );
}
