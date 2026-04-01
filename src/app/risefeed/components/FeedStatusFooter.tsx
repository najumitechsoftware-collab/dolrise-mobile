"use client";
import "./FeedStatusFooter.css";

export default function FeedStatusFooter({
  status,
}: {
  status: "healthy" | "limited" | "paused";
}) {
  if (status === "healthy") return null;

  const text =
    status === "limited"
      ? "We’re taking a quiet moment to tune things. You can keep reading."
      : "New actions are paused briefly. Reading is always open.";

  return (
    <div className="feed-status-footer">
      {text}
    </div>
  );
}
