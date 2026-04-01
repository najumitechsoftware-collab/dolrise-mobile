"use client";

import { useEffect, useState } from "react";
import ceoAxios from "@/lib/ceoAxios";
import "./threat.css";

export default function ThreatRadarPage() {
  const [summary, setSummary] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [spikes, setSpikes] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  const fetchData = async () => {
    try {
      setLoading(true);

      const [s, u, p, sp] = await Promise.all([
        ceoAxios.get("/api/ceo/threats/summary"),
        ceoAxios.get("/api/ceo/threats/users"),
        ceoAxios.get("/api/ceo/threats/posts"),
        ceoAxios.get("/api/ceo/threats/spikes"),
      ]);

      setSummary(s.data);
      setUsers(u.data);
      setPosts(p.data);
      setSpikes(sp.data);

    } catch (err) {
      console.error("Threat fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= HELPERS ================= */
  const riskColor = (value: number) => {
    if (value > 80) return "red";
    if (value > 50) return "orange";
    return "yellow";
  };

  return (
    <div className="threat-container">

      {/* HEADER */}
      <div className="threat-header">
        <h1>🚨 Threat Radar</h1>
        <button onClick={fetchData}>Refresh</button>
      </div>

      {/* ALERT BAR */}
      <div className="alert-bar">
        ⚠ {summary?.suspiciousUsers || 0} suspicious users •
        🔥 {summary?.highRiskPosts || 0} high-risk posts •
        📡 {spikes?.spike ? "Activity spike detected" : "Normal"}
      </div>

      {/* KPI */}
      <div className="kpi-row">
        <KPI title="Suspicious Users" value={summary?.suspiciousUsers} />
        <KPI title="High Risk Posts" value={summary?.highRiskPosts} />
        <KPI title="Flagged Posts" value={summary?.flaggedPosts} />
      </div>

      {/* USERS TABLE */}
      <div className="card">
        <h2>🤖 Suspicious Users</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          users.map((u) => (
            <div key={u.id} className="row">

              <div>@{u.username}</div>

              <Badge label={`Bot ${u.bot_score}`} color={riskColor(u.bot_score)} />
              <Badge label={`Spam ${u.spam_score}`} color={riskColor(u.spam_score)} />

              <button className="action">Investigate</button>

            </div>
          ))
        )}
      </div>

      {/* POSTS TABLE */}
      <div className="card">
        <h2>🔥 High Risk Posts</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          posts.map((p) => (
            <div key={p.id} className="row">

              <div className="post">
                {p.content?.slice(0, 60)}...
              </div>

              <div>@{p.author}</div>

              <Badge label={`Risk ${p.risk}`} color={riskColor(p.risk)} />

              <button className="action">View</button>

            </div>
          ))
        )}
      </div>

      {/* SPIKES */}
      <div className="card">
        <h2>📊 Activity Monitor</h2>

        <div className="spike-grid">
          <div>📝 Posts (1h): {spikes?.postsLastHour}</div>
          <div>💬 Interactions: {spikes?.interactions}</div>
        </div>
      </div>

    </div>
  );
}

/* COMPONENTS */

function KPI({ title, value }: any) {
  return (
    <div className="kpi">
      <span>{title}</span>
      <h2>{value || 0}</h2>
    </div>
  );
}

function Badge({ label, color }: any) {
  return <span className={`badge ${color}`}>{label}</span>;
}
