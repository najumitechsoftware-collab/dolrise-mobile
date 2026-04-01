"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchConversation } from "./services/linkchat.api";

export default function ConversationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const conversationId = Number(
    searchParams.get("conversationId")
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [otherUser, setOtherUser] = useState<any>(null);

  useEffect(() => {
    if (!conversationId || isNaN(conversationId)) {
      setError("Conversation unavailable");
      setLoading(false);
      return;
    }

    fetchConversation(conversationId)
      .then((res) => {
        setMessages(res.messages || []);
        setOtherUser(res.otherUser);
      })
      .catch(() => {
        setError("Conversation unavailable");
      })
      .finally(() => setLoading(false));
  }, [conversationId]);

  if (!conversationId) {
    return <p style={{ padding: 20 }}>Invalid conversation</p>;
  }

  if (loading) {
    return <p>Opening conversation…</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => router.push("/linkchat")}>
          Back to chats
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <div>
        <strong>@{otherUser?.username}</strong>
      </div>

      <div>
        {messages.length === 0 && (
          <p>This space is open. You may begin gently.</p>
        )}

        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.content}
          </div>
        ))}
      </div>
    </div>
  );
}
