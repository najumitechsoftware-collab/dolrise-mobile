"use client";

import { useState, useCallback, useEffect } from "react";
import "./Profile.css";
import ProfileHeader from "./components/ProfileHeader";
import ProfileTabs from "./components/ProfileTabs";
import ProfileAbout from "./components/ProfileAbout";
import ReflectionCard from "./components/ReflectionCard";
import FeedItem from "@/app/risefeed/components/FeedItem/FeedItem";
import { apiFetch } from "@/lib/apiClient";

type Tab = "posts" | "about" | "saved" | "reflections";

interface Props {
  initialData: any;
}

export default function ProfileClient({ initialData }: Props) {
  /* ================= CONFIG ================= */
  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000/api";

  const MEDIA_BASE = API_BASE.replace("/api", "");

  /* ================= STATE ================= */
  const [activeTab, setActiveTab] = useState<Tab>("posts");
  const [profile, setProfile] = useState(initialData?.profile ?? null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const [posts] = useState<any[]>(
    Array.isArray(initialData?.posts) ? initialData.posts : []
  );

  const [savedPosts, setSavedPosts] = useState<any[] | null>(null);
  const [reflections, setReflections] = useState<any[] | null>(null);

  const [loadingSaved, setLoadingSaved] = useState(false);
  const [loadingReflections, setLoadingReflections] = useState(false);

  /* ================= SAFE PROFILE ================= */
  const safeProfile = profile
    ? {
        ...profile,
        avatar_url: profile.avatar_url
          ? `${MEDIA_BASE}${profile.avatar_url}`
          : "/default-avatar.png",
        cover_url: profile.cover_url
          ? `${MEDIA_BASE}${profile.cover_url}`
          : "",
      }
    : null;

  const stats = {
    posts: initialData?.stats?.posts ?? 0,
    followers: initialData?.stats?.flowCircle ?? 0,
    following: initialData?.stats?.flowLink ?? 0,
  };

  /* ================= REFRESH PROFILE ================= */
useEffect(() => {
  const refreshProfile = async () => {
    try {
      setLoadingProfile(true);

      const data = await apiFetch<{
        profile: any;
        stats?: any;
      }>("/profile/me/view");

      if (data?.profile) {
        setProfile(data.profile);
      } else {
        console.error("❌ No profile returned");
      }
    } catch (err) {
      console.error("❌ Profile error:", err);
    } finally {
      setLoadingProfile(false);
    }
  };

  refreshProfile();
}, []);

  /* ================= LOAD SAVED ================= */
  const loadSavedPosts = useCallback(async () => {
    if (savedPosts !== null) return;

    try {
      setLoadingSaved(true);

      const res = await fetch(`${API_BASE}/profile/saved`, {
        credentials: "include",
      });

      if (!res.ok) {
        setSavedPosts([]);
        return;
      }

      const data = await res.json();
      setSavedPosts(Array.isArray(data?.posts) ? data.posts : []);
    } catch {
      setSavedPosts([]);
    } finally {
      setLoadingSaved(false);
    }
  }, [savedPosts, API_BASE]);

  /* ================= LOAD REFLECTIONS ================= */
  const loadReflections = useCallback(async () => {
    if (reflections !== null) return;

    try {
      setLoadingReflections(true);

      const res = await fetch(`${API_BASE}/profile/reflections`, {
        credentials: "include",
      });

      if (!res.ok) {
        setReflections([]);
        return;
      }

      const data = await res.json();

      setReflections(
        Array.isArray(data?.reflections) ? data.reflections : []
      );
    } catch {
      setReflections([]);
    } finally {
      setLoadingReflections(false);
    }
  }, [reflections, API_BASE]);

  /* ================= TAB ================= */
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);

    if (tab === "saved") loadSavedPosts();
    if (tab === "reflections") loadReflections();
  };

  /* ================= LOADING ================= */
  if (loadingProfile && !safeProfile) {
    return <div style={{ padding: 40 }}>Loading profile...</div>;
  }

  /* ================= ERROR ================= */
  if (!safeProfile) {
    return <div style={{ padding: 40 }}>Unable to load profile</div>;
  }

  /* ================= RENDER ================= */
  return (
    <main className="profile-page">
      <ProfileHeader
        key={safeProfile.avatar_url}
        profile={safeProfile}
        stats={stats}
      />

      <ProfileTabs
        active={activeTab}
        onChange={handleTabChange}
        isOwner
      />

      {/* POSTS */}
      {activeTab === "posts" && (
        <section className="profile-posts">
          {posts.map((post, i) => (
            <FeedItem
              key={post.id}
              post={post}
              index={i}
              allPosts={posts}
              context="profile"
            />
          ))}
        </section>
      )}

      {/* SAVED */}
      {activeTab === "saved" && (
        <section className="profile-posts">
          {loadingSaved && <p>Loading saved…</p>}
          {savedPosts?.map((post, i) => (
            <FeedItem
              key={post.id}
              post={post}
              index={i}
              allPosts={savedPosts}
              context="profile"
            />
          ))}
        </section>
      )}

      {/* REFLECTIONS */}
      {activeTab === "reflections" && (
        <section className="profile-posts">
          {loadingReflections && <p>Loading reflections…</p>}
          {reflections?.map((r) => (
            <ReflectionCard key={r.id} reflection={r} />
          ))}
        </section>
      )}

      {/* ABOUT */}
      {activeTab === "about" && (
        <ProfileAbout profile={safeProfile} stats={stats} />
      )}
    </main>
  );
}
