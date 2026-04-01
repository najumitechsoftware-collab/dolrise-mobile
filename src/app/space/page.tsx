"use client";

import { useSearchParams } from "next/navigation";

export default function SpacePage() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  if (!slug) {
    return <p style={{ padding: 20 }}>Invalid space</p>;
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>#{slug}</h1>
      <p>Public posts in this space</p>
    </main>
  );
}
