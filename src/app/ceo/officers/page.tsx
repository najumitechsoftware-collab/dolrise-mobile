"use client";

import { useEffect, useState } from "react";
import ceoAxios from "@/lib/ceoAxios";
import CreateOfficerModal from "./components/CreateOfficerModal";
import OfficerPanel from "./components/OfficerPanel";
import "./officers.css";

/* ================= TYPES ================= */
interface Officer {
  id: number;
  full_name: string;
  email: string;
  role?: {
    name: string;
    level: string;
  };
  country?: string;
  is_suspended: boolean;
  kpi_metrics?: { actions_count: number }[];
}

/* ================= MAIN ================= */
export default function OfficersPage() {
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Officer | null>(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  /* ================= FETCH ================= */
  const fetchOfficers = async () => {
    try {
      const res = await ceoAxios.get("/api/ceo/officers");

      console.log("OFFICERS:", res.data);

      const payload = res.data?.data || res.data;

      setOfficers(payload || []);
    } catch (err) {
      console.error("Failed to fetch officers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOfficers();
  }, []);

  /* ================= ACTIONS ================= */
  const handleSuspend = async (id: number) => {
    await ceoAxios.post(`/api/ceo/officers/${id}/suspend`);
    fetchOfficers();
  };

  const handleActivate = async (id: number) => {
    await ceoAxios.post(`/api/ceo/officers/${id}/activate`);
    fetchOfficers();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete officer?")) return;
    await ceoAxios.delete(`/api/ceo/officers/${id}`);
    fetchOfficers();
  };

  /* ================= FILTER ================= */
  const filtered = officers.filter((o) =>
    o.full_name.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= KPI ================= */
  const total = officers.length;
  const active = officers.filter((o) => !o.is_suspended).length;
  const suspended = officers.filter((o) => o.is_suspended).length;

  if (loading) return <div className="officers-loading">Loading...</div>;

  return (
    <div className="officers-container">
      {/* ================= HEADER ================= */}
      <header className="officers-header">
        <div>
          <h1>Officer Command Center</h1>
          <p>Manage internal operations & permissions</p>
        </div>

        <button
          className="create-btn"
          onClick={() => setShowModal(true)}
        >
          + Create Officer
        </button>
      </header>

      {/* ================= KPI ================= */}
      <div className="officers-kpi">
        <KPI title="Total Officers" value={total} />
        <KPI title="Active" value={active} />
        <KPI title="Suspended" value={suspended} alert />
      </div>

      {/* ================= FILTER ================= */}
      <div className="officers-filters">
        <input
          placeholder="Search officers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ================= TABLE ================= */}
      <div className="officers-table">
        <div className="table-head">
          <span>Officer</span>
          <span>Role</span>
          <span>Country</span>
          <span>Status</span>
          <span>Performance</span>
          <span>Actions</span>
        </div>

        {filtered.map((o) => (
          <div key={o.id} className="table-row">
            <div className="officer-info">
              <div className="avatar">
                {o.full_name?.charAt(0)}
              </div>
              <div>
                <strong>{o.full_name}</strong>
                <p>{o.email}</p>
              </div>
            </div>

            {/* 🔥 FIXED ROLE */}
            <span className="badge">
              {o.role?.name || "No Role"}
            </span>

            <span>{o.country || "-"}</span>

            <span
              className={`status ${
                o.is_suspended ? "red" : "green"
              }`}
            >
              {o.is_suspended ? "Suspended" : "Active"}
            </span>

            <span>
              {o.kpi_metrics?.[0]?.actions_count || 0}
            </span>

            <div className="actions">
              <button onClick={() => setSelected(o)}>View</button>

              {o.is_suspended ? (
                <button onClick={() => handleActivate(o.id)}>
                  Activate
                </button>
              ) : (
                <button onClick={() => handleSuspend(o.id)}>
                  Suspend
                </button>
              )}

              <button
                className="danger"
                onClick={() => handleDelete(o.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= PANEL ================= */}
      {selected && (
        <OfficerPanel
          officer={selected}
          onClose={() => setSelected(null)}
          refresh={fetchOfficers}
        />
      )}

      {/* ================= MODAL ================= */}
      {showModal && (
        <CreateOfficerModal
          onClose={() => setShowModal(false)}
          onCreated={fetchOfficers}
        />
      )}
    </div>
  );
}

/* ================= KPI ================= */
function KPI({ title, value, alert }: any) {
  return (
    <div className={`kpi-card ${alert ? "alert" : ""}`}>
      <span>{title}</span>
      <h2>{value}</h2>
    </div>
  );
}
