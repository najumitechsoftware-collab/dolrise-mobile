"use client";


import { useState } from "react";
import { toggleFlowLink } from "@/lib/api/flowlink";

export default function FlowLinkButton({ authorId, initialFollow }: any) {
  const [isFlowing, setFlowing] = useState(initialFollow);

  async function handleToggle() {
    try {
      const res = await toggleFlowLink(authorId);
      setFlowing(res.following);
    } catch {}
  }

  return (
    <button
      onClick={handleToggle}
      className={isFlowing ? "flow-btn following" : "flow-btn"}
    >
      {isFlowing ? "🌀 Flowing" : "➕ Flow"}
    </button>
  );
}
