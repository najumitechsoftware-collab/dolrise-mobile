"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PostPage() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (!slug) return;

    const API = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${API}/posts/slug/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
      })
      .catch(() => {
        setPost(null);
      });
  }, [slug]);

  if (!slug) {
    return <p>Invalid post</p>;
  }

  if (!post) {
    return <p>Loading post...</p>;
  }

  return (
    <article style={{ padding: 20 }}>
      <h1>{post.title || slug}</h1>
      <p>{post.content || "Post content goes here..."}</p>
    </article>
  );
}
