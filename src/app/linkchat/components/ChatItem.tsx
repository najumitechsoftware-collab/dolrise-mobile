"use client";

import type { Conversation } from "../types/linkchat.types";

type Props = {
  conversation: Conversation;
  currentUserId: number;
  mode: "incoming" | "pending" | "active";
  onAccept?: () => void;
  onDecline?: () => void;
  onOpen?: () => void;
};

export default function ChatItem({
  conversation,
  currentUserId,
  mode,
  onAccept,
  onDecline,
  onOpen,
}: Props) {
  const other =
    conversation.participants
      ?.map((p) => p.user)
      .find((u) => u.id !== currentUserId) ||
    conversation.creator;

  if (!other) return null;

  return (
    <div className="chat-item">
      <div className="chat-avatar">
        {other.avatar_url ? (
          <img src={other.avatar_url} />
        ) : (
          <div className="avatar-placeholder">
            {other.username?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className="chat-main">
        <strong>@{other.username}</strong>

        {mode === "incoming" && (
          <div className="muted">
            Reached out gently
          </div>
        )}

        {mode === "pending" && (
          <div className="muted">
            ⏳ Waiting for response
          </div>
        )}

        {mode === "active" && (
          <div className="muted">
            Tap to continue chat
          </div>
        )}
      </div>

      <div className="chat-actions">
        {mode === "incoming" && (
          <>
            <button onClick={onAccept}>
              Accept
            </button>
            <button
              className="danger"
              onClick={onDecline}
            >
              Decline
            </button>
          </>
        )}

        {mode === "active" && (
          <button onClick={onOpen}>💬</button>
        )}
      </div>
    </div>
  );
}
