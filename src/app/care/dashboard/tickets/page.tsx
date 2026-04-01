"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./TicketsPage.css";

/* ======================================================
   TYPES
====================================================== */
type Ticket = {
  id: number;
  ticket_ref: string;
  name: string;
  subject: string;
  status: string;
  created_at: string;
};

/* ======================================================
   PAGE
====================================================== */
export default function TicketsPage() {
  const router = useRouter();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ======================================================
     FETCH TICKETS (SINGLE SOURCE OF TRUTH)
  ====================================================== */
useEffect(() => {
  fetchTickets();
}, [filter]);

async function fetchTickets() {
  try {
    setLoading(true);
    setError(null);

    const res = await fetch(
      `/api/care/tickets?status=${filter}`,
      { credentials: "include" }
    );

    // 🔐 NOT LOGGED IN → REDIRECT (NO ERROR UI)
    if (res.status === 401) {
      router.replace("/care/login");
      return;
    }

    // 🚫 LOGGED IN BUT NO PERMISSION
    if (res.status === 403) {
      setTickets([]);
      setError("You do not have permission to view tickets.");
      return;
    }

    const json = await res.json();

    if (!res.ok || !json.success) {
      throw new Error("Unable to fetch tickets.");
    }

    // ✅ SUCCESS
    setTickets(json.data || []);
  } catch (err: any) {
    setTickets([]);
    setError(err.message || "Failed to load tickets.");
  } finally {
    setLoading(false);
  }
}
  /* ======================================================
     RENDER
  ====================================================== */
  return (
    <div className="tickets-page">
      {/* HEADER */}
      <header className="tickets-header">
        <button className="back-btn" onClick={() => router.back()}>
          ← Back
        </button>

        <h1>Support Tickets</h1>

        <div className="ticket-filters">
          {["all", "pending", "in_review", "resolved", "closed"].map((f) => (
            <button
              key={f}
              className={filter === f ? "active" : ""}
              onClick={() => setFilter(f)}
            >
              {f.replace("_", " ")}
            </button>
          ))}
        </div>
      </header>

      {/* ERROR */}
      {error && <div className="care-error">{error}</div>}

      {/* TABLE */}
      <div className="tickets-table">
        <div className="tickets-row head">
          <span>Ticket</span>
          <span>User</span>
          <span>Status</span>
          <span>Created</span>
        </div>

        {loading && <p className="loading">Loading tickets…</p>}

        {!loading && !error && tickets.length === 0 && (
          <p className="empty">No tickets found</p>
        )}

        {!loading &&
          !error &&
          tickets.map((t) => (
            <div
              key={t.id}
              className="tickets-row"
              onClick={() =>
                router.push(`/care/dashboard/tickets/${t.id}`)
              }
            >
              <span className="ticket-ref">{t.ticket_ref}</span>
              <span>{t.name}</span>
              <span className={`status ${t.status}`}>
                {t.status}
              </span>
              <span>
                {new Date(t.created_at).toLocaleDateString()}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
