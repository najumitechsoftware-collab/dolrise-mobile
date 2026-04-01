"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LegacyPostRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) return;

    const API = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${API}/posts/${id}`)
      .then((res) => res.json())
      .then((post) => {
        if (post?.slug) {
          router.replace(`/post/${post.slug}`);
        } else {
          router.replace("/");
        }
      })
      .catch(() => {
        router.replace("/");
      });
  }, [id, router]);

  return (
    <main style={{ padding: 20 }}>
      <p>Loading post...</p>
    </main>
  );
}
