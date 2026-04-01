"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import StoryHeader from "./components/StoryHeader";
import StoryBody from "./components/StoryBody";
import StoryActions from "./components/StoryActions";
import StoryReflectionsPreview from "./components/StoryReflectionsPreview";
import StoryMore from "./components/StoryMore";

import "./story.css";

interface Story {
  id: number;
  content: string;
  mood?: string;
  author?: {
    username: string;
    avatar_url?: string;
  };
  created_at?: string;
}

export default function StoryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!id) return;

    let alive = true;

    async function load() {
      try {
        const res = await fetch(
          `https://api.dolrise.com/api/textlong/${id}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error();

        const data = await res.json();

        if (!alive) return;

        setStory(data);
      } catch {
        if (alive) setError(true);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();

    return () => {
      alive = false;
    };
  }, [id]);

  if (!id) {
    return <p style={{ padding: 20 }}>Invalid story</p>;
  }

  if (loading) {
    return (
      <main className="story-skeleton">
        <div className="skeleton-title" />
        <div className="skeleton-line" />
        <div className="skeleton-line short" />
      </main>
    );
  }

  if (error || !story) {
    return (
      <div className="story-error">
        <p>This reflection could not be found.</p>
        <button onClick={() => router.push("/risefeed")}>
          Return to Feed
        </button>
      </div>
    );
  }

  return (
    <main className="story-page">
      <button onClick={() => router.push("/risefeed")}>
        ← Back
      </button>

      <article className="story-container">
        <StoryHeader story={story} />
        <StoryBody content={story.content} />

        <StoryActions
          postId={story.id}
          onReflected={() => setRefreshKey(Date.now())}
        />

        <StoryReflectionsPreview
          postId={story.id}
          refreshKey={refreshKey}
        />

        <StoryMore
          mood={story.mood}
          currentId={story.id}
        />
      </article>
    </main>
  );
}
