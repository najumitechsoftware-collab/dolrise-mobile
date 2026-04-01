"use client";

import { useEffect, useState } from "react";
import ceoAxios from "@/lib/ceoAxios";
import "./moderation.css";

export default function CEOModerationPage() {
  const [queue, setQueue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQueue = async () => {
    try {
      const res = await ceoAxios.get("/api/officer/moderation/queue");
      setQueue(res.data || []);
    } catch (err) {
      console.error("Failed to fetch moderation queue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  if (loading) return <div className="mod-loading">Loading...</div>;

  return (
    <div className="ceo-mod-container">
      <h1>Moderation Overview</h1>

      {/* KPI */}
      <div className="mod-kpis">
        <KPI title="Total Cases" value={queue.length} />
        <KPI
          title="Critical"
          value={queue.filter(q => q.severity === "critical").length}
          alert
        />
        <KPI
          title="Pending"
          value={queue.filter(q => q.status === "pending").length}
        />
      </div>

      {/* LIST */}
      <div className="mod-list">
        {queue.map((q) => (
          <div key={q.id} className={`mod-item severity-${q.severity}`}>
            <div>
              <strong>{q.content_type}</strong>
              <p>{q.reason}</p>
            </div>

            <div className="mod-meta">
              <span>{q.severity}</span>
              <span>{q.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KPI({ title, value, alert }: any) {
  return (
    <div className={`kpi-card ${alert ? "alert" : ""}`}>
      <span>{title}</span>
      <h2>{value}</h2>
    </div>
  );
}
