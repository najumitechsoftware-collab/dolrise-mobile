"use client";

import { useEffect, useState } from "react";
import "./styles/earnings.css";

export default function EarningsPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEarnings();
  }, []);

  async function loadEarnings() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        "https://api.dolrise.com/api/earnings/dashboard",
        { credentials: "include" }
      );

      if (res.status === 401) {
        setError("Not authenticated");
        return;
      }

      const json = await res.json();

      if (!json.success) {
        setError(json.error || "Failed to load earnings");
        return;
      }

      setData(json.data);
    } catch (err) {
      console.error(err);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="earnings-loader">Loading...</div>;
  }

  if (error) {
    return (
      <div className="earnings-error">
        <p>{error}</p>
        <button onClick={loadEarnings}>Retry</button>
      </div>
    );
  }

  if (!data) {
    return <div className="earnings-empty">No data</div>;
  }

  const summary = data.summary || {};
  const history = data.history || [];

  return (
    <div className="earnings-page">
      {/* HEADER */}
      <div className="earnings-header">
        <h1>💰 Earnings</h1>
        <p>Your value is growing quietly</p>
      </div>

      {/* CARDS */}
      <div className="earnings-cards">
        <div className="card">
          <span>Total Earned</span>
          <strong>{summary.total ?? 0} NC</strong>
        </div>

        <div className="card highlight">
          <span>Available</span>
          <strong>{summary.available ?? 0} NC</strong>
        </div>

        <div className="card">
          <span>Pending</span>
          <strong>{summary.pending ?? 0} NC</strong>
        </div>

        <div className="card">
          <span>In Review</span>
          <strong>{summary.review ?? 0} NC</strong>
        </div>
      </div>

      {/* MOVE TO WALLET */}
      <div className="move-section">
        <p>{summary.available ?? 0} NC ready</p>

        <button
          disabled={!summary.available}
          onClick={async () => {
            try {
              await fetch(
                "https://api.dolrise.com/api/earnings/move",
                {
                  method: "POST",
                  credentials: "include",
                }
              );

              await loadEarnings();
            } catch (err) {
              console.error(err);
              alert("Failed to move earnings");
            }
          }}
        >
          Move to Wallet
        </button>
      </div>

      {/* HISTORY */}
      <div className="earnings-history">
        <h3>Earnings History</h3>

        {history.length > 0 ? (
          history.map((item: any) => (
            <div key={item.id} className="history-card">
              {/* LEFT: POST PREVIEW */}
              <div className="history-media">
                {item.post_preview_url ? (
                  <img
                    src={item.post_preview_url}
                    alt="post"
                  />
                ) : (
                  <div className="media-placeholder" />
                )}
              </div>

              {/* RIGHT: CONTENT */}
              <div className="history-content">
                {/* TOP */}
                <div className="history-top">
                  <strong>+{item.amount} NC</strong>
                  <span className={`status ${item.status}`}>
                    {item.status}
                  </span>
                </div>

                {/* TITLE */}
                <p className="history-title">
                  Uplift from @{item.sender_username}
                </p>

                {/* POST */}
                <p className="history-caption">
                  {item.post_caption || "Post interaction"}
                </p>

                {/* BREAKDOWN */}
                <p className="history-meta">
                  Total: {item.total_amount} NC • Fee:{" "}
                  {item.platform_fee} NC
                </p>

                {/* TIME */}
                <p className="history-time">
                  {new Date(item.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="empty">No earnings yet</p>
        )}
      </div>
    </div>
  );
}
