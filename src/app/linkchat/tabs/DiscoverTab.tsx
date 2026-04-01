"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchInbox,
  searchUsers,
  sendChatRequest,
} from "../services/linkchat.api";
import type { Conversation, User } from "../types/linkchat.types";

type Relation = {
  status: "pending" | "active";
  conversationId: number;
  createdByMe: boolean;
};

export default function DiscoverTab() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [relations, setRelations] = useState<Record<number, Relation>>({});
  const [sending, setSending] = useState<number | null>(null);

  const currentUserId =
    typeof window !== "undefined"
      ? Number(localStorage.getItem("user_id"))
      : 0;
    async function loadRelations() {
  const inboxRes = await fetchInbox();
  const conversations: Conversation[] = inboxRes.conversations || [];

  const map: Record<number, Relation> = {};

  conversations.forEach((c) => {
    // ❌ completely ignore rejected conversations
    if (c.status === "rejected") return;

    let other: User | null = null;

    if (c.created_by === currentUserId) {
      // pending / active SENT by me
      other =
        c.participants
          ?.map((p) => p.user)
          .find((u) => u.id !== currentUserId) || null;
    } else {
      // pending / active INCOMING
      other = c.creator || null;
    }

    if (!other) return;

    map[other.id] = {
      status: c.status as "pending" | "active",
      conversationId: c.id,
      createdByMe: c.created_by === currentUserId,
    };
  });

  setRelations(map);
}

  async function init() {
    await loadRelations();
    const res = await searchUsers(query);
    setUsers(res.users || []);
  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const t = setTimeout(async () => {
      const res = await searchUsers(query);
      setUsers(res.users || []);
    }, 400);
    return () => clearTimeout(t);
  }, [query]);

  async function handleSend(user: User) {
    setSending(user.id);
    await sendChatRequest(user.id);
    await loadRelations();
    setSending(null);
  }

  function renderAction(user: User) {
    const rel = relations[user.id];

    if (!rel) {
      return (
        <button
          disabled={sending === user.id}
          onClick={() => handleSend(user)}
        >
          {sending === user.id ? "Sending…" : "Reach out gently"}
        </button>
      );
    }

    if (rel.status === "pending") {
      return (
        <span className="pending">
          {rel.createdByMe ? "Pending" : "Incoming"}
        </span>
      );
    }

    return (
      <button
        className="chat-btn"
        onClick={() =>
          router.push(`/linkchat/${rel.conversationId}`)
        }
      >
        💬 Chat
      </button>
    );
  }

  const suggested = users.filter(
    (u) => u.id !== currentUserId && !relations[u.id],
  );

  return (
    <div className="discover">
      <h3>Discover people</h3>

      <input
        placeholder="Search by username, name, or email…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {suggested.map((u) => (
        <div key={u.id} className="discover-user">
          <div className="user-info">
            {u.avatar_url ? (
              <img src={u.avatar_url} className="avatar-small" />
            ) : (
              <div className="avatar-small placeholder">
                {u.username?.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <strong>{u.username}</strong>
              {u.full_name && (
                <div className="muted">{u.full_name}</div>
              )}
            </div>
          </div>
          <div className="actions">{renderAction(u)}</div>
        </div>
      ))}
    </div>
  );
}
