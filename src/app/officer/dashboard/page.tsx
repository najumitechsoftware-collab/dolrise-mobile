"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";

export default function OfficerDashboard() {
  const [stats, setStats] = useState<any>({
    total: 0,
    pending: 0,
    reviewing: 0,
    resolved: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "/api/officer/moderation/queue"
      );

      const data = res.data || [];

      setStats({
        total: data.length,
        pending: data.filter((x: any) => x.status === "pending").length,
        reviewing: data.filter((x: any) => x.status === "reviewing").length,
        resolved: data.filter((x: any) => x.status === "resolved").length,
      });
    } catch {
      console.log("Failed to load stats");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <h1>Officer Dashboard</h1>

      <div className="cards">
        <div className="card">
          <span>Total Cases</span>
          <h2>{stats.total}</h2>
        </div>

        <div className="card">
          <span>Pending</span>
          <h2>{stats.pending}</h2>
        </div>

        <div className="card">
          <span>Reviewing</span>
          <h2>{stats.reviewing}</h2>
        </div>

        <div className="card alert">
          <span>Resolved</span>
          <h2>{stats.resolved}</h2>
        </div>
      </div>
    </div>
  );
}
