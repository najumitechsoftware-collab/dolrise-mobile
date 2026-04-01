"use client";

import { useEffect, useState } from "react";
import ceoAxios from "@/lib/ceoAxios";
import "./metrics.css";

export default function MetricsPage() {
  const [data, setData] = useState<any>(null);
  const [range, setRange] = useState("24h");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const res = await ceoAxios.get("/api/ceo/metrics", {
        params: { range },
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, [range]);

  if (loading) return <div className="metrics-container">Loading...</div>;

  return (
    <div className="metrics-container">

      {/* HEADER */}
      <div className="metrics-header">
        <h1>📊 Metrics Intelligence</h1>

        <div className="time-filters">
          {["30m", "1h", "6h", "24h", "7d", "1m", "6m"].map((t) => (
            <button
              key={t}
              className={range === t ? "active" : ""}
              onClick={() => setRange(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* KPI */}
      <div className="kpi-row">
        <KPI title="Revenue" value={`NC ${data.totalRevenue}`} />
        <KPI title="Flagged" value={data.flagged} />
        <KPI title="Hidden" value={data.hidden} />
        <KPI title="Countries" value={data.usersByCountry.length} />
      </div>

      {/* AI INSIGHTS */}
      <div className="ai-bar">
        {data.insights.map((i: string, idx: number) => (
          <span key={idx}>{i}</span>
        ))}
      </div>

      {/* COUNTRY */}
      <Section title="🌍 Country Analytics">
        {data.usersByCountry.map((c: any, i: number) => (
          <div key={i} className="row">
            <span>{c.country || "Unknown"}</span>
            <span>{c._count.id} users</span>
          </div>
        ))}
      </Section>

      {/* UPLIFT */}
      <Section title="💰 Top Spending Countries">
        {data.upliftByCountry.map((c: any, i: number) => (
          <div key={i} className="row">
            <span>{c.country}</span>
            <span>NC {Number(c.total).toLocaleString()}</span>
          </div>
        ))}
      </Section>

      {/* CONTENT */}
      <Section title="📌 Content Distribution">
        {data.contentTypes.map((c: any, i: number) => (
          <div key={i} className="row">
            <span>{c.type}</span>
            <span>{c._count}</span>
          </div>
        ))}
      </Section>

      {/* VIRAL */}
      <Section title="🔥 Viral Posts">
        {data.viralPosts.map((p: any) => (
          <div key={p.id} className="row">
            <span>{p.content?.slice(0, 40)}</span>
            <span>{p.views_count} views</span>
          </div>
        ))}
      </Section>

      {/* MOODS */}
      <Section title="😊 Mood Analytics">
        {data.moods.map((m: any, i: number) => (
          <div key={i} className="row">
            <span>{m.mood}</span>
            <span>{m._count}</span>
          </div>
        ))}
      </Section>

      {/* GENDER */}
      <Section title="🚻 Gender">
        {data.genderStats.map((g: any, i: number) => (
          <div key={i} className="row">
            <span>{g.gender}</span>
            <span>{g._count}</span>
          </div>
        ))}
      </Section>

      {/* AGE */}
      <Section title="👥 Age Groups">
        {data.ageGroups.map((a: any, i: number) => (
          <div key={i} className="row">
            <span>{a.age_group}</span>
            <span>{a._count}</span>
          </div>
        ))}
      </Section>

    </div>
  );
}

/* COMPONENTS */

function KPI({ title, value }: any) {
  return (
    <div className="kpi">
      <span>{title}</span>
      <h2>{value}</h2>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div className="section">
      <h2>{title}</h2>
      <div className="section-content">{children}</div>
    </div>
  );
}
