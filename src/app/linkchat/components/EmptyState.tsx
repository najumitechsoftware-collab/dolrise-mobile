"use client";
import { useRouter } from "next/navigation";

export default function EmptyState() {
  const router = useRouter();

  return (
    <div className="empty-state">
      <h3>No conversations yet</h3>
      <p>
        When you’re ready, you can gently reach out and connect with someone who
        feels right.
      </p>
      <button onClick={() => router.push("/linkchat/discover")}>
        Find someone to connect with
      </button>
    </div>
  );
}
