"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import ReflectModal from "@/app/risefeed/components/ReflectModal";

export default function ReflectPage() {
  const searchParams = useSearchParams();
  const postId = Number(searchParams.get("postId"));

  const [showReflectModal, setShowReflectModal] = useState(false);

  if (!postId) {
    return <p style={{ padding: 20 }}>Invalid post</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Reflects</h2>

      <button
        onClick={() => setShowReflectModal(true)}
        style={{
          marginTop: 20,
          padding: "10px 16px",
          borderRadius: 8,
          border: "none",
          background: "#d4af37",
          color: "#000",
          fontWeight: "bold",
        }}
      >
        Add Reflect
      </button>

      {showReflectModal && (
        <ReflectModal
          postId={postId}
          onClose={() => setShowReflectModal(false)}
        />
      )}
    </div>
  );
}
