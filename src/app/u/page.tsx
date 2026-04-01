"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FeedItem from "@/app/risefeed/components/FeedItem/FeedItem";
import "./PublicProfile.css";

type Tab = "posts" | "about";

export default function PublicProfilePage() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  const router = useRouter();

  const [profile, setProfile] = useState<any | false | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [flowing, setFlowing] = useState(false);
  const [flowLoading, setFlowLoading] = useState(false);
  const [tab, setTab] = useState<Tab>("posts");
  const [posts, setPosts] = useState<any[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    if (!username) return;

    setLoadingProfile(true);
    setPosts([]);

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/profile/u/${username}`,
      { credentials: "include" }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data?.profile) {
          setProfile(false);
          return;
        }

        if (data.profile.isOwner) {
          router.replace("/profile-ui");
          return;
        }

        setProfile(data.profile);
        setFlowing(Boolean(data.profile?.isFlowing));
      })
      .catch(() => setProfile(false))
      .finally(() => setLoadingProfile(false));
  }, [username, router]);

  /* ================= LOAD POSTS ================= */
  useEffect(() => {
    if (!username || tab !== "posts") return;

    setLoadingPosts(true);

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/profile/${username}/posts`,
      { credentials: "include" }
    )
      .then((res) => res.json())
      .then((data) => {
        setPosts(Array.isArray(data.posts) ? data.posts : []);
      })
      .catch(() => setPosts([]))
      .finally(() => setLoadingPosts(false));
  }, [username, tab]);

  /* ================= FLOW ================= */
  const toggleFlow = async () => {
    if (!username || flowLoading) return;

    setFlowLoading(true);

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/flowlink/${username}`,
        {
          method: flowing ? "DELETE" : "POST",
          credentials: "include",
        }
      );

      setFlowing((f) => !f);
    } finally {
      setFlowLoading(false);
    }
  };

  /* ================= STATES ================= */
  if (!username) {
    return <p style={{ padding: 20 }}>Invalid profile</p>;
  }

  if (loadingProfile) {
    return (
      <div className="public-loader">
        <div className="luxury-spinner" />
      </div>
    );
  }

  if (profile === false) {
    return (
      <div className="public-error">
        This identity is not available.
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <main className="public-profile-page">
      <section className="public-hero">
        <div
          className="public-cover"
          style={{
            backgroundImage: profile.cover_url
              ? `url(${profile.cover_url})`
              : undefined,
          }}
        />

        <div className="public-hero-content">
          <img
            src={profile.avatar_url || "/default-avatar.png"}
            alt={profile.username}
            className="public-avatar"
          />

          <h1 className="public-name">
            {profile.full_name || "—"}
          </h1>

          <p className="public-username">
            @{profile.username}
          </p>

          <button onClick={toggleFlow}>
            {flowing ? "Flowing" : "Flow"}
          </button>
        </div>
      </section>

      <section>
        {posts.map((post, i) => (
          <FeedItem
            key={post.id}
            post={post}
            index={i}
            allPosts={posts}
            context="public"
          />
        ))}
      </section>
    </main>
  );
}
