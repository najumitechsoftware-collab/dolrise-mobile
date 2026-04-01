"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import "./InviteGateway.css";

type PublicProfile = {
  full_name?: string;
  username?: string;
  avatar_url?: string;
  bio?: string;
  posts?: any[];
};

export default function InviteGatewayPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  const [checkingSession, setCheckingSession] = useState(true);
  const [profile, setProfile] = useState<PublicProfile | null>(null);

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!username) return;

    fetch(`${API}/auth/session`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          router.replace(`/u?username=${username}`);
        } else {
          throw new Error("NO_SESSION");
        }
      })
      .catch(() => {
        fetch(`${API}/profile/u/${username}`)
          .then((res) => {
            if (!res.ok) throw new Error("NOT_FOUND");
            return res.json();
          })
          .then((data) => {
            setProfile({
              ...data.profile,
              posts: data.posts?.slice(0, 3) || [],
            });
          })
          .catch(() => {
            router.replace(`/auth/register`);
          })
          .finally(() => {
            setCheckingSession(false);
          });
      });
  }, [username, router, API]);

  if (!username) {
    return <p style={{ padding: 20 }}>Invalid link</p>;
  }

  if (checkingSession) {
    return (
      <main className="gateway-page">
        <div className="gateway-loading">
          <h2>Preparing a calm space</h2>
          <p>This won’t take a moment 🌿</p>
        </div>
      </main>
    );
  }

  if (!profile) return null;

  return (
    <main className="gateway-page">
      <section className="gateway-card">
        <img
          src={profile.avatar_url || "/default-avatar.png"}
          className="gateway-avatar"
        />

        <h1>{profile.full_name || `@${profile.username}`}</h1>
        <p>@{profile.username}</p>

        {profile.bio && <p>{profile.bio}</p>}

        <div className="gateway-actions">
          <button
            onClick={() =>
              router.push(`/auth/login?next=/u?username=${username}`)
            }
          >
            Continue
          </button>

          <button
            onClick={() =>
              router.push(`/auth/register?invite=${username}`)
            }
          >
            Join DolRise
          </button>
        </div>
      </section>
    </main>
  );
}
