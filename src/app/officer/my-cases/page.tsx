"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import "./my-cases.css";

export default function MyCasesPage() {
  const [cases, setCases] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchCases = async () => {
    try {
      const res = await axios.get("/api/officer/moderation/my-cases");
      setCases(res.data || []);
    } catch {
      console.log("Failed to fetch cases");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const takeAction = async (action: string) => {
    if (!selected) return;

    try {
      await axios.post(
        `/api/officer/moderation/${selected.id}/action`,
        { action }
      );

      fetchCases();
      setSelected(null);
    } catch {
      alert("Action failed");
    }
  };

  return (
    <div className="cases-container">
      {/* LEFT SIDE */}
      <div className="cases-sidebar">
        <h3>My Cases</h3>

        {loading && <p>Loading...</p>}

        {!loading && cases.length === 0 && (
          <p className="empty">No assigned cases 🎉</p>
        )}

        {cases.map((c) => (
          <div
            key={c.id}
            className={`case-item severity-${c.severity} ${
              selected?.id === c.id ? "active" : ""
            }`}
            onClick={() => setSelected(c)}
          >
            <strong>{c.content_type}</strong>
            <p>{c.reason}</p>
            <span>{c.severity}</span>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE */}
      <div className="cases-details">
        {!selected && (
          <div className="empty-state">
            <h2>Select a case</h2>
          </div>
        )}

        {selected && (
          <>
            <h2>Case #{selected.id}</h2>

            <div className="case-box">
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

              <button onClick={() => takeAction("suspend")} className="danger">
                Suspend
              </button>

              <button onClick={() => takeAction("escalate")} className="escalate">
                Escalate
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
