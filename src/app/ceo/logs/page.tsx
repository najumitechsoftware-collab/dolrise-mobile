"use client";


import axios from "axios";
import { useEffect, useState } from "react";
import "./audit.css";

const API = "https://api.dolrise.com/api/ceo/audit";

export default function AuditLogsPage() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("ceo_token") : "";

  const headers = { Authorization: `Bearer ${token}` };

  const [logs, setLogs] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [severity, setSeverity] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const res = await axios.get(
        `${API}/logs?severity=${severity}&category=${category}`,
        { headers },
      );
      setLogs(res.data.logs || []);
      setSummary(res.data.summary || {});
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [severity, category]);

  if (loading) return <div className="audit-page">Loading audit logs…</div>;

  return (
    <div className="audit-page">
      {/* HEADER */}
      <div className="audit-header">
        <div>
          <h1>📜 Audit Logs</h1>
          <p>System, security & CEO actions overview</p>
        </div>

        <div className="filters">
          <select onChange={(e) => setSeverity(e.target.value)}>
            <option value="">All Severity</option>
            <option value="INFO">INFO</option>
            <option value="WARNING">WARNING</option>
            <option value="CRITICAL">CRITICAL</option>
          </select>

          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="SYSTEM">SYSTEM</option>
            <option value="SECURITY">SECURITY</option>
            <option value="USERS">USERS</option>
            <option value="CONTENT">CONTENT</option>
            <option value="PLATFORM">PLATFORM</option>
          </select>
        </div>
      </div>

      {/* SUMMARY */}
      {summary && (
        <div className="audit-cards">
          <div className="card">
            <span>Total Events</span>
            <strong>{summary.total || 0}</strong>
          </div>
          <div className="card">
            <span>Last 24h</span>
            <strong>{summary.last24h || 0}</strong>
          </div>
          <div className="card danger">
            <span>Critical</span>
            <strong>{summary.critical || 0}</strong>
          </div>
          <div className="card">
            <span>System Actions</span>
            <strong>{summary.system || 0}</strong>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="audit-table">
        <div className="table-head">
          <span>Time</span>
          <span>Actor</span>
          <span>Action</span>
          <span>Category</span>
          <span>Target</span>
          <span>Severity</span>
          <span>IP</span>
        </div>

        {logs.map((l) => (
          <div key={l.id} className="table-row">
            <span>{new Date(l.created_at).toLocaleString()}</span>
            <span>{l.actor_type}</span>
            <span>{l.action}</span>
            <span>{l.category}</span>
            <span>{l.target || "-"}</span>
            <span className={`badge ${l.severity?.toLowerCase()}`}>
              {l.severity}
            </span>
            <span>{l.ip_address || "-"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
