"use client";


import { useEffect, useState } from "react";
import {
  acceptRequest,
  declineRequest,
  getIncomingRequests,
} from "../services/linkchat.api";

export default function IncomingRequests({
  onHandled,
}: {
  onHandled?: () => void;
}) {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const res: any = await getIncomingRequests();
    setRequests(res.requests || []);
    setLoading(false);
  }

  async function handleAccept(id: number) {
    await acceptRequest(id);
    await load();
    onHandled?.();
  }

  async function handleDecline(id: number) {
    await declineRequest(id);
    await load();
  }

  if (loading) return <p>Loading requests...</p>;

  if (requests.length === 0) return null;

  return (
    <div className="incoming-requests">
      <h4>Incoming requests</h4>

      {requests.map((req) => (
        <div key={req.id} className="discover-user">
          <div className="user-info">
            {req.creator.avatar_url ? (
              <img src={req.creator.avatar_url} />
            ) : (
              <div className="avatar-placeholder">
                {req.creator.username?.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <strong>{req.creator.username}</strong>
              {req.creator.full_name && (
                <div className="muted">{req.creator.full_name}</div>
              )}
            </div>
          </div>

          <div className="actions">
            <button onClick={() => handleAccept(req.id)}>Accept</button>
            <button className="danger" onClick={() => handleDecline(req.id)}>
              Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
