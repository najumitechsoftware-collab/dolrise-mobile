"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import "./moderation.css";

export default function OfficerModerationPage() {
  const [queue, setQueue] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchQueue = async () => {
    try {
      const res = await axios.get("/api/officer/moderation/queue");
      setQueue(res.data || []);
    } catch (err) {
      console.error("Queue error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const takeAction = async (action: string) => {
    if (!selected) return;

    try {
      await axios.post(
        `/api/officer/moderation/${selected.id}/action`,
        { action }
      );

      fetchQueue();
      setSelected(null);
    } catch {
      alert("Action failed");
    }
  };

  return (
    <div className="mod-container">
      {/* LEFT QUEUE */}
      <div className="mod-sidebar">
        <h3>Moderation Queue</h3>

        {loading && <p>Loading...</p>}

        {queue.map((q) => (
          <div
            key={q.id}
            className={`mod-item severity-${q.severity}`}
            onClick={() => setSelected(q)}
          >
            <strong>{q.content_type}</strong>
            <p>{q.reason}</p>
            <span>{q.severity}</span>
          </div>
        ))}
      </div>

      {/* RIGHT DETAILS */}
      <div className="mod-details">
        {!selected && (
          <div className="empty">
            <h2>Select a case</h2>
          </div>
        )}

        {selected && (
          <>
            <h2>Case #{selected.id}</h2>

            <div className="detail-box">
              <p><b>Type:</b> {selected.content_type}</p>
              <p><b>Reason:</b> {selected.reason}</p>
              <p><b>Severity:</b> {selected.severity}</p>
              <p><b>Status:</b> {selected.status}</p>
              <p><b>AI Score:</b> {selected.ai_confidence || "N/A"}</p>
            </div>

            {/* ACTIONS */}
            <div className="actions">
              <button onClick={() => takeAction("approve")} className="approve">
                Approve
              </button>

              <button onClick={() => takeAction("remove")} className="remove">
                Remove
              </button>

              <button onClick={() => takeAction("shadow_ban")} className="warn">
                Shadow Ban
              </button>

              <button onClick={() => takeAction("escalate")} className="danger">
                Escalate
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
