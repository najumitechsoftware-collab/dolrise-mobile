"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  acceptRequest,
  declineRequest,
  getIncomingRequests,
} from "../services/linkchat.api";
import type { User } from "../types/linkchat.types";

type IncomingRequest = {
  id: number; // conversationId
  creator: User;
};

export default function IncomingTab() {
  const router = useRouter();

  const [requests, setRequests] = useState<IncomingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await getIncomingRequests();
      setRequests(res.requests || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAccept(conversationId: number) {
    setNotice(null);
    await acceptRequest(conversationId);
    setNotice("This connection is now open.");
    await load();
  }

  async function handleDecline(conversationId: number) {
    setNotice(null);
    await declineRequest(conversationId);
    setNotice("The request was declined. Your space was respected.");
    await load();
  }

  return (
    <div className="incoming">
      <div className="incoming-intro">
        <h3>Incoming requests</h3>
        <p>
          These people reached out to you — gently, and with respect.
        </p>
      </div>

      {notice && <p className="soft-notice">{notice}</p>}
      {loading && <p className="soft-text">Loading requests…</p>}

      {!loading && requests.length === 0 && (
        <p className="soft-text">
          No one is waiting right now.
        </p>
      )}

      {requests.map((req) => (
        <div key={req.id} className="discover-user">
          <div className="user-info">
            {req.creator.avatar_url ? (
              <img
                src={req.creator.avatar_url}
                className="avatar-small"
              />
            ) : (
              <div className="avatar-small placeholder">
                {req.creator.username?.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <strong>{req.creator.username}</strong>
              {req.creator.full_name && (
                <div className="muted">
                  {req.creator.full_name}
                </div>
              )}
            </div>
          </div>

          <div className="actions">
            <button
              className="chat-btn"
              onClick={() => handleAccept(req.id)}
            >
              Accept
            </button>
            <button
              className="danger"
              onClick={() => handleDecline(req.id)}
            >
              Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
