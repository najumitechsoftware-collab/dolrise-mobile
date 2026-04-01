"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./story-view.css";

type Story = {
  id: number;
  title: string;
  content: string;
  author?: {
    username: string;
    avatar_url?: string;
  };
  created_at?: string;
};

export default function StoryPage() {
  const { id } = useParams();
  const router = useRouter();

  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchStory() {
      try {
        const res = await fetch(
          `https://api.dolrise.com/api/story/${id}`
        );
        const data = await res.json();

        // adjust depending on backend
        setStory(data.story || data);
      } catch (err) {
        console.error("Story load error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStory();
  }, [id]);

  if (loading) {
    return (
      <div className="story-loading">
        <h2>Opening story...</h2>
        <p>Preparing a calm reading space 🌿</p>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="story-error">
        <h2>Story not found</h2>
        <button onClick={() => router.back()}>Go back</button>
      </div>
    );
  }

  return (
    <main className="story-page">
      {/* HEADER */}
      <header className="story-header">
        <button onClick={() => router.back()} className="back-btn">
          ←
        </button>

        <div className="story-author">
          <img
            src={story.author?.avatar_url || "/default-avatar.png"}
            alt="avatar"
          />
          <div>
            <p className="username">@{story.author?.username}</p>
            <span className="date">
              {story.created_at
                ? new Date(story.created_at).toDateString()
                : ""}
            </span>
          </div>
        </div>
      </header>

      {/* TITLE */}
      <section className="story-title-section">
        <h1>{story.title}</h1>
      </section>

      {/* CONTENT */}
      <article className="story-content">
        {story.content.split("\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </article>

      {/* FOOTER */}
      <footer className="story-footer">
        <button onClick={() => router.back()}>
          ← Back to feed
        </button>
      </footer>
    </main>
  );
}
