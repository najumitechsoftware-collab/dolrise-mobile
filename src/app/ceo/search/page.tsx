"use client";

import { useEffect, useState } from "react";
import ceoAxios from "@/lib/ceoAxios";
import "./search.css";

export default function CeoSearchPage() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  /* ================= SEARCH ================= */
  const runSearch = async (q: string) => {
    if (!q || q.length < 2) return;

    try {
      setLoading(true);

      const res = await ceoAxios.get("/api/ceo/search", {
        params: { q },
      });

      setData(res.data);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LIVE SEARCH ================= */
  useEffect(() => {
    const delay = setTimeout(() => {
      runSearch(query);
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="search-container">

      {/* HEADER */}
      <div className="search-header">
        <h1>🔍 Intelligence Search</h1>

        <input
          placeholder="Search users, posts, IP, transactions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* STATUS BAR */}
      {data && (
        <div className="search-meta">
          ⚡ {data.resultCount} results •
          ⏱ {data.executionTime}ms •
          🚨 Risk: {data.escalationLevel}
        </div>
      )}

      {/* LOADING */}
      {loading && <p className="loading">Searching...</p>}

      {/* RESULTS */}
      {data && !loading && (
        <div className="results">

          {/* USERS */}
          {data.results?.users?.length > 0 && (
            <Section title="👤 Users">
              {data.results.users.map((u: any) => (
                <div key={u.id} className="item">
                  <strong>@{u.username}</strong>
                  <span>{u.email}</span>
                  <span>Risk: {u.risk_score}</span>
                  {u.is_banned && <Badge label="BANNED" color="red" />}
                </div>
              ))}
            </Section>
          )}

          {/* POSTS */}
          {data.results?.posts?.length > 0 && (
            <Section title="📌 Posts">
              {data.results.posts.map((p: any) => (
                <div key={p.id} className="item">
                  <span>{p.content?.slice(0, 80)}...</span>
                  <span>Score: {p.moderation_score}</span>

                  {p.is_flagged && <Badge label="FLAGGED" color="yellow" />}
                  {p.is_hidden && <Badge label="HIDDEN" color="orange" />}
                </div>
              ))}
            </Section>
          )}

          {/* WITHDRAWALS */}
          {data.results?.withdrawals?.length > 0 && (
            <Section title="💰 Withdrawals">
              {data.results.withdrawals.map((w: any) => (
                <div key={w.id} className="item">
                  <span>ID: {w.id}</span>
                  <span>NC {w.amount_nc}</span>
                </div>
              ))}
            </Section>
          )}

          {/* UPLIFTS */}
          {data.results?.uplifts?.length > 0 && (
            <Section title="🎁 Uplifts">
              {data.results.uplifts.map((u: any) => (
                <div key={u.id} className="item">
                  <span>ID: {u.id}</span>
                  <span>{u.amount}</span>
                </div>
              ))}
            </Section>
          )}

          {/* SESSIONS */}
          {data.results?.sessions?.length > 0 && (
            <Section title="🌐 Sessions">
              {data.results.sessions.map((s: any, i: number) => (
                <div key={i} className="item">
                  <span>{s.ip_address}</span>
                  <span>{s.device_info}</span>
                </div>
              ))}
            </Section>
          )}

        </div>
      )}
    </div>
  );
}

/* COMPONENTS */

function Section({ title, children }: any) {
  return (
    <div className="section">
      <h2>{title}</h2>
      <div className="section-body">{children}</div>
    </div>
  );
}

function Badge({ label, color }: any) {
  return <span className={`badge ${color}`}>{label}</span>;
}
