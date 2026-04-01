"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ceoAxios from "@/lib/ceoAxios";
import "./executive.css";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ================= TYPES ================= */
interface Intelligence {
  users: { total: number; dau: number; mau: number };
  revenue: { last_5m: number; last_6h: number; last_24h: number; total: number };
  wallets: { users_total_nc: number; platform_total_nc: number };
  nc_usage: { last_24h: number };
  risk: { average_score: number; active_alerts: number };
  governance: { pending_requests: number };
  chat: { messages_last_5m: number };

  creators?: any[];
  ai_insights?: string[];
}

/* ================= MAIN ================= */
export default function ExecutiveDashboard() {
  const router = useRouter();

  const [data, setData] = useState<Intelligence | null>(null);
  const [loading, setLoading] = useState(true);

  const historyRef = useRef<any[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  /* ================= FETCH ================= */
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("ceo_token");
      if (!token) return router.push("/ceo/login");

      const res = await ceoAxios.get("/api/ceo/executive/home");
      const payload = res.data?.data || res.data;

      setData(payload);

      /* PUSH TO CHART */
      historyRef.current.push({
        time: new Date().toLocaleTimeString(),
        revenue: payload.revenue.last_24h,
        users: payload.users.total,
      });

      if (historyRef.current.length > 20) {
        historyRef.current.shift();
      }

    } catch (e) {
      console.log("fetch failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= WEBSOCKET ================= */
  useEffect(() => {
    fetchData();

    wsRef.current = new WebSocket("wss://api.dolrise.com/ws");

    wsRef.current.onmessage = (event) => {
      try {
        const live = JSON.parse(event.data);

        historyRef.current.push({
          time: new Date().toLocaleTimeString(),
          revenue: live.revenue,
          users: live.users,
        });

        if (historyRef.current.length > 20) {
          historyRef.current.shift();
        }

        setData((prev: any) => ({
          ...prev,
          users: { ...prev.users, total: live.users },
          revenue: { ...prev.revenue, last_24h: live.revenue },
        }));

      } catch {}
    };

    return () => wsRef.current?.close();
  }, []);

  if (loading || !data) return <div className="exec-loading">Loading...</div>;

  /* ================= THREAT ================= */
  const threatLevel =
    data.risk.active_alerts > 10
      ? "HIGH"
      : data.risk.active_alerts > 3
      ? "MEDIUM"
      : "LOW";

  /* ================= AI FORECAST ================= */
  const forecast =
    historyRef.current.length > 1
      ? historyRef.current[historyRef.current.length - 1].revenue * 1.2
      : 0;

  return (
    <div className="exec-container">

      {/* HEADER */}
      <header className="exec-header">
        <h1>Executive Intelligence Command Center</h1>
        <span className={`threat ${threatLevel.toLowerCase()}`}>
          {threatLevel} Threat
        </span>
      </header>

      {/* KPI */}
      <div className="kpi-row">
        <KPI title="Users" value={data.users.total} />
        <KPI title="Revenue 24h" value={data.revenue.last_24h} money />
        <KPI title="Alerts" value={data.risk.active_alerts} alert />
        <KPI title="Messages" value={data.chat.messages_last_5m} />
      </div>

      {/* ================= LIVE ================= */}
      <Section title="⚡ Live Activity">
        <Card title="Active Users" value={data.users.dau} />
        <Card title="Messages (5m)" value={data.chat.messages_last_5m} />
      </Section>

      {/* ================= GROWTH ================= */}
      <Section title="📈 Growth">
        <Card title="Total Users" value={data.users.total} />
        <Card title="DAU" value={data.users.dau} />
        <Card title="MAU" value={data.users.mau} />
      </Section>

      {/* ================= REVENUE ================= */}
      <Section title="💰 Revenue">
        <Card title="5m" value={data.revenue.last_5m} money />
        <Card title="6h" value={data.revenue.last_6h} money />
        <Card title="24h" value={data.revenue.last_24h} money />
        <Card title="Total" value={data.revenue.total} money />
      </Section>

      {/* ================= CHARTS ================= */}
      <div className="chart-grid">
        <ChartCard title="Revenue Trend">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={historyRef.current}>
              <XAxis dataKey="time" hide />
              <Tooltip />
              <Line dataKey="revenue" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="User Growth">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={historyRef.current}>
              <XAxis dataKey="time" hide />
              <Tooltip />
              <Line dataKey="users" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ================= FORECAST ================= */}
      <div className="forecast-box">
        <h3>🔮 AI Forecast</h3>
        <p>Next Revenue: NC {forecast.toFixed(0)}</p>
      </div>

      {/* ================= CREATORS ================= */}
      <div className="leaderboard">
        <h3>👑 Top Creators</h3>
        {data.creators?.length ? (
          data.creators.map((c: any, i: number) => (
            <div key={i} className="leader-item">
              #{i + 1} {c.username || "creator"} — {c.earnings || 0}
            </div>
          ))
        ) : (
          <p>No creators yet</p>
        )}
      </div>

      {/* ================= GOVERNANCE ================= */}
      <Section title="🛡️ Governance">
        <Card title="Pending Requests" value={data.governance.pending_requests} />
      </Section>

      {/* ================= RISK ================= */}
      <Section title="⚠️ Risk">
        <Card title="Active Alerts" value={data.risk.active_alerts} alert />
      </Section>

      {/* ================= AI ================= */}
      <Section title="🧠 AI Insights">
        {data.ai_insights?.length ? (
          data.ai_insights.map((i, idx) => (
            <Insight key={idx} text={i} />
          ))
        ) : (
          <p>No insights yet</p>
        )}
      </Section>

    </div>
  );
}

/* ================= COMPONENTS ================= */

function Section({ title, children }: any) {
  return (
    <div className="exec-section">
      <h2>{title}</h2>
      <div className="exec-grid">{children}</div>
    </div>
  );
}

function Card({ title, value, money, alert }: any) {
  return (
    <div className={`exec-card ${alert ? "alert-card" : ""}`}>
      <span>{title}</span>
      <h2>{money ? "NC " : ""}{value?.toLocaleString()}</h2>
    </div>
  );
}

function KPI({ title, value, money, alert }: any) {
  return (
    <div className={`kpi-card ${alert ? "alert" : ""}`}>
      <span>{title}</span>
      <h2>{money ? "NC " : ""}{value?.toLocaleString()}</h2>
    </div>
  );
}

function ChartCard({ title, children }: any) {
  return (
    <div className="chart-card">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function Insight({ text }: any) {
  return <div className="exec-insight">🧠 {text}</div>;
}
