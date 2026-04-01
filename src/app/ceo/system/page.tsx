"use client";


import axios from "axios";
import { useEffect, useState } from "react";
import "./system.css";

export default function SystemHealthPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("ceo_token") : "";

  const API = "https://api.dolrise.com/api/ceo/system";

  const fetchHealth = async () => {
    try {
      const res = await axios.get(`${API}/health`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data);
    } catch (err) {
      console.error("Health fetch error", err);
    }
  };

  const restartService = async (type: "backend" | "frontend") => {
    if (!confirm(`Restart ${type}?`)) return;
    setLoading(true);
    try {
      await axios.post(
        `${API}/restart/${type}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert(`${type} restarting`);
    } catch {
      alert("Failed to restart service");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <p className="loading">Loading system health…</p>;

  const memUsedGB = (data.backend.memory.used / 1e9).toFixed(2);
  const memTotalGB = (data.backend.memory.total / 1e9).toFixed(2);

  return (
    <div className="system-page">
      <h1>🖥️ System Health</h1>

      <div className="grid">
        <Card title="Backend Status" value="Running 🟢" />
        <Card
          title="Backend Uptime"
          value={`${Math.floor(data.backend.uptime / 60)} mins`}
        />
        <Card
          title="Database"
          value={data.database.status === "ok" ? "OK 🟢" : "ERROR 🔴"}
        />
        <Card
          title="Server Uptime"
          value={`${Math.floor(data.server.uptime / 3600)} hrs`}
        />
      </div>

      <div className="grid">
        <Card title="CPU Load" value={data.backend.cpuLoad.toFixed(2)} />
        <Card title="Memory Usage" value={`${memUsedGB} / ${memTotalGB} GB`} />
        <Card title="Hostname" value={data.server.hostname} />
        <Card title="Platform" value={data.server.platform} />
      </div>

      <div className="actions">
        <button
          disabled={loading}
          className="btn warning"
          onClick={() => restartService("backend")}
        >
          Restart Backend
        </button>

        <button
          disabled={loading}
          className="btn danger"
          onClick={() => restartService("frontend")}
        >
          Restart Frontend
        </button>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: any }) {
  return (
    <div className="card">
      <p className="card-title">{title}</p>
      <h2>{value}</h2>
    </div>
  );
}
