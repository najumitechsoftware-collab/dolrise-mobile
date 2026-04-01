"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ceoAxios from "@/lib/ceoAxios";
import "./users.css";

export default function CeoUsersPage() {
  const router = useRouter();

  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  /* ================= FETCH ================= */
  const fetchUsers = async (pageNumber = 1) => {
    try {
      const token = localStorage.getItem("ceo_token");
      if (!token) return router.push("/ceo/login");

      setLoading(true);

      const res = await ceoAxios.get("/api/ceo/users", {
        params: { page: pageNumber, search, filter },
      });

      setUsers(res.data.users || []);
      setPage(res.data.page || 1);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDeep = async (id: number) => {
    try {
      const res = await ceoAxios.get(`/api/ceo/users/${id}`);
      setSelectedUser(res.data);
    } catch {
      alert("Failed to load user");
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, [filter]);

  /* ================= ACTION ================= */
  const action = async (type: string, id: number) => {
    try {
      setActionLoading(id);

      await ceoAxios.post(`/api/ceo/users/${id}/${type}`);

      await fetchUsers(page);
    } catch {
      alert("Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  /* ================= BULK ================= */
  const bulkAction = async (type: string) => {
    await Promise.all(
      selectedIds.map((id) =>
        ceoAxios.post(`/api/ceo/users/${id}/${type}`)
      )
    );

    setSelectedIds([]);
    fetchUsers(page);
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  /* ================= KPI ================= */
  const totalUsers = users.length;
  const verified = users.filter((u) => u.is_verified).length;
  const highRisk = users.filter((u) => u.risk_score > 70).length;

  return (
    <div className="users-container">

      {/* HEADER */}
      <div className="users-header">
        <h1>👑 CEO Users Control Center</h1>

        <input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={() => fetchUsers(1)}
        />
      </div>

      {/* FILTERS */}
      <div className="filters">
        {["all", "verified", "banned", "suspended"].map((f) => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* BULK */}
      {selectedIds.length > 0 && (
        <div className="bulk-bar">
          <span>{selectedIds.length} selected</span>

          <button onClick={() => bulkAction("ban")}>Ban</button>
          <button onClick={() => bulkAction("unban")}>Unban</button>

          <button onClick={() => bulkAction("verify")}>Verify</button>

          <button onClick={() => bulkAction("freeze-wallet")}>Freeze</button>
          <button onClick={() => bulkAction("unfreeze-wallet")}>
            Unfreeze
          </button>
        </div>
      )}

      {/* KPI */}
      <div className="kpi-row">
        <KPI title="Total Users" value={totalUsers} />
        <KPI title="Verified" value={verified} />
        <KPI title="High Risk" value={highRisk} />
      </div>

      {/* AI BAR */}
      <div className="ai-bar">
        ⚠ {highRisk} high-risk users • 🔥 live system activity
      </div>

      {/* TABLE */}
      <div className="table">
        {loading ? (
          <p>Loading...</p>
        ) : users.map((u) => (
          <div key={u.id} className="row">

            <input
              type="checkbox"
              checked={selectedIds.includes(u.id)}
              onChange={() => toggleSelect(u.id)}
            />

            <div className="user-cell">
              <strong>@{u.username}</strong>
              <span>{u.email}</span>
            </div>

            <Badge label={u.is_banned ? "BANNED" : u.is_suspended ? "SUSPENDED" : "ACTIVE"} />

            <Badge label={
              u.risk_score > 70 ? "HIGH" :
              u.risk_score > 30 ? "MEDIUM" : "LOW"
            } />

            <div>NC {u.earnings?.toLocaleString()}</div>

            <div>
              {u.activity > 50 ? "High" : u.activity > 10 ? "Medium" : "Low"}
            </div>

            <div>
              {u.wallet_frozen ? "❄️ Frozen" : "Active"}
            </div>

            {/* ACTIONS */}
            <div className="actions">
              <button onClick={() => fetchUserDeep(u.id)}>View</button>

              {/* BAN / UNBAN */}
              {u.is_banned ? (
                <button onClick={() => action("unban", u.id)}>Unban</button>
              ) : (
                <button onClick={() => action("ban", u.id)}>Ban</button>
              )}

              {/* VERIFY */}
              {!u.is_verified && (
                <button onClick={() => action("verify", u.id)}>
                  Verify
                </button>
              )}

              {/* FREEZE / UNFREEZE */}
              {u.wallet_frozen ? (
                <button onClick={() => action("unfreeze-wallet", u.id)}>
                  Unfreeze
                </button>
              ) : (
                <button onClick={() => action("freeze-wallet", u.id)}>
                  Freeze
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button disabled={page <= 1} onClick={() => fetchUsers(page - 1)}>Prev</button>
        <span>{page} / {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => fetchUsers(page + 1)}>Next</button>
      </div>

      {/* MODAL */}
      {selectedUser && (
        <div className="modal">
          <div className="modal-content">

            <h2>@{selectedUser.user?.username}</h2>

            <p>Email: {selectedUser.user?.email}</p>
            <p>Posts: {selectedUser.posts?.length}</p>

            <p>💰 Earnings: NC {selectedUser.earnings}</p>

            <p>📊 Wallet: {selectedUser.wallet?.nc_available}</p>

            <h4>⚠ Security Logs</h4>
            {selectedUser.security_logs?.map((log: any) => (
              <p key={log.id}>{log.action} - {log.ip}</p>
            ))}

            <button className="close" onClick={() => setSelectedUser(null)}>
              Close
            </button>

          </div>
        </div>
      )}
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

function Badge({ label }: any) {
  return <span className={`badge ${label.toLowerCase()}`}>{label}</span>;
}
