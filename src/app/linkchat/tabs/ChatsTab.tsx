"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChatItem from "../components/ChatItem";
import EmptyState from "../components/EmptyState";
import {
  fetchInbox,
  acceptRequest,
  declineRequest,
} from "../services/linkchat.api";
import type { Conversation } from "../types/linkchat.types";

export default function ChatsTab() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const currentUserId =
    typeof window !== "undefined"
      ? Number(localStorage.getItem("user_id"))
      : 0;

  async function loadInbox() {
    setLoading(true);
    try {
      const res = await fetchInbox();
      setConversations(res.conversations || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInbox();
  }, []);

const incoming = conversations.filter(
  (c) => c.status === "pending" && c.creator.id !== currentUserId,
);

const pending = conversations.filter(
  (c) => c.status === "pending" && c.creator.id === currentUserId,
);

  const active = conversations.filter(
    (c) => c.status === "active",
  );

  if (loading) {
    return <p className="soft-text">Preparing your conversations…</p>;
  }

  if (
    incoming.length === 0 &&
    pending.length === 0 &&
    active.length === 0
  ) {
    return <EmptyState />;
  }

  return (
    <div className="chat-list">
      {/* 📩 INCOMING */}
      {incoming.length > 0 && (
        <>
          <h4 className="section-title">Someone reached out to you</h4>
          {incoming.map((c) => (
            <ChatItem
              key={c.id}
              conversation={c}
              currentUserId={currentUserId}
              mode="incoming"
              onAccept={() => acceptRequest(c.id).then(loadInbox)}
              onDecline={() => declineRequest(c.id).then(loadInbox)}
            />
          ))}
        </>
      )}

      {/* ⏳ PENDING */}
      {pending.length > 0 && (
        <>
          <h4 className="section-title">Waiting for response</h4>
          {pending.map((c) => (
            <ChatItem
              key={c.id}
              conversation={c}
              currentUserId={currentUserId}
              mode="pending"
            />
          ))}
        </>
      )}

      {/* 💬 ACTIVE */}
      {active.length > 0 && (
        <>
          <h4 className="section-title">Conversations</h4>
          {active.map((c) => (
            <ChatItem
              key={c.id}
              conversation={c}
              currentUserId={currentUserId}
              mode="active"
              onOpen={() => router.push(`/linkchat/${c.id}`)}
            />
          ))}
        </>
      )}
    </div>
  );
}
