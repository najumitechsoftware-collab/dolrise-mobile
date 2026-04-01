"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./Invite.css";

export default function InviteDashboardPage() {
  const router = useRouter();

  const [username, setUsername] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  /* ======================================
     LOAD USERNAME — INSTANT (NO API)
  ====================================== */
  useEffect(() => {
    const stored = localStorage.getItem("dolrise:username");

    if (!stored) {
      // Wannan ba zai faru ba, amma kariya ce
      router.replace("/profile-ui");
      return;
    }

    setUsername(stored);
  }, [router]);

  if (!username) {
    return (
      <main className="invite-page">
        <p className="invite-loading">Opening your invite space…</p>
      </main>
    );
  }

  /* ======================================
     LINKS
  ====================================== */
  const inviteLink = `https://www.dolrise.com/${username}`;

  const copy = async () => {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const share = (platform: string) => {
    const message = encodeURIComponent(
      "I’ve been using DolRise — a calm space for reflection and emotional clarity 🌿\n\nYou’re welcome here:\n" +
        inviteLink
    );

    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${message}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${inviteLink}`,
      twitter: `https://twitter.com/intent/tweet?text=${message}`,
      instagram: inviteLink,
      tiktok: inviteLink,
    };

    window.open(urls[platform], "_blank");
  };

  return (
    <main className="invite-page">
      {/* HEADER */}
      <header className="invite-header">
        <h1>Invite into DolRise</h1>
        <p>
          Share DolRise gently — with people who value calm, meaning,
          and emotional clarity.
        </p>
      </header>

      {/* LINK CARD */}
      <section className="invite-cards">
        <div className="invite-card">
          <h2>Your personal invite link</h2>

          <div className="invite-link-box">{inviteLink}</div>

          <div className="invite-actions">
            <button onClick={copy}>
              {copied ? "Copied ✓" : "Copy link"}
            </button>
            <button onClick={() => share("whatsapp")}>
              WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* SHARE */}
      <section className="invite-share">
        <h3>Share on other platforms</h3>
        <div className="share-buttons">
          <button onClick={() => share("facebook")}>Facebook</button>
          <button onClick={() => share("twitter")}>X</button>
          <button onClick={() => share("instagram")}>Instagram</button>
          <button onClick={() => share("tiktok")}>TikTok</button>
        </div>

        <p className="invite-note">
          DolRise grows through trust — not pressure, not numbers.
        </p>
      </section>

      {/* PARTNER */}
      <section className="partner-cta">
        <h2>Become a DolRise Partner</h2>
        <p>
          Some people help DolRise grow by inviting aligned communities.
          Partners help shape the future of this space.
        </p>

        <button className="partner-btn">
          Learn how to become a partner
        </button>

        <span className="partner-footnote">
          Partnership is based on alignment, care, and contribution.
        </span>
      </section>
    </main>
  );
}
