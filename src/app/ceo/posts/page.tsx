"use client";

import { useEffect, useState } from "react";
import ceoAxios from "@/lib/ceoAxios";
import "./posts.css";

export default function CeoPostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  /* ================= FETCH ================= */
  const fetchPosts = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const res = await ceoAxios.get("/api/ceo/posts", {
        params: { page: pageNumber, search, filter },
      });

      setPosts(res.data.posts || []);
      setPage(res.data.page || 1);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await ceoAxios.get("/api/ceo/posts/summary");
      setStats(res.data);
    } catch {}
  };

  useEffect(() => {
    fetchPosts(1);
    fetchStats();
  }, [filter]);

  /* ================= ACTION ================= */
  const action = async (type: string, id: number) => {
    try {
      setActionLoading(id);

      if (type === "delete") {
        await ceoAxios.delete(`/api/ceo/posts/${id}`);
      } else {
        await ceoAxios.post(`/api/ceo/posts/${id}/${type}`);
      }

      fetchPosts(page);
      fetchStats();
      setSelectedPost(null);
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
        type === "delete"
          ? ceoAxios.delete(`/api/ceo/posts/${id}`)
          : ceoAxios.post(`/api/ceo/posts/${id}/${type}`)
      )
    );

    setSelectedIds([]);
    fetchPosts(page);
    fetchStats();
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  /* ================= HELPERS ================= */
  const getRiskColor = (risk: string) => {
    if (risk === "CRITICAL") return "red";
    if (risk === "HIGH") return "orange";
    if (risk === "MEDIUM") return "yellow";
    return "green";
  };

  const getStatusColor = (status: string) => {
    if (status === "flagged") return "yellow";
    if (status === "hidden") return "orange";
    if (status === "deleted") return "red";
    return "green";
  };

  return (
    <div className="posts-container">

      {/* HEADER */}
      <div className="header">
        <h1>📡 CEO Content Control</h1>

        <input
          placeholder="Search posts or users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={() => fetchPosts(1)}
        />
      </div>

      {/* FILTERS */}
      <div className="filters">
        {["all", "flagged", "hidden"].map((f) => (
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
          <button onClick={() => bulkAction("flag")}>Flag</button>
          <button onClick={() => bulkAction("hide")}>Hide</button>
          <button onClick={() => bulkAction("delete")}>Delete</button>
        </div>
      )}

      {/* KPI */}
      {stats && (
        <div className="kpi-row">
          <KPI title="Total Posts" value={stats.totalPosts} />
          <KPI title="Flagged" value={stats.flagged} />
          <KPI title="Hidden" value={stats.hidden} />
          <KPI title="High Risk" value={stats.highRisk} />
        </div>
      )}

      {/* AI BAR */}
      <div className="ai-bar">
        ⚠ {stats?.flagged || 0} flagged • 🔥 {stats?.highRisk || 0} high-risk
      </div>

      {/* TABLE */}
      <div className="table">
        {loading ? (
          <p>Loading...</p>
        ) : posts.map((p) => (
          <div key={p.id} className="row">

            <input
              type="checkbox"
              checked={selectedIds.includes(p.id)}
              onChange={() => toggleSelect(p.id)}
            />

            <div className="post">
              {p.content?.slice(0, 60) || "No content"}...
            </div>

            <div>@{p.author?.username}</div>

            <Badge label={p.risk_level} color={getRiskColor(p.risk_level)} />

            <div>
              {p.views > 1000 ? "High" : p.views > 100 ? "Medium" : "Low"}
            </div>

            <div>NC {Number(p.earnings || 0).toLocaleString()}</div>

            <Badge label={p.status} color={getStatusColor(p.status)} />

            <div className="actions">
              <button onClick={() => setSelectedPost(p)}>View</button>

              <button disabled={actionLoading === p.id} onClick={() => action("flag", p.id)}>
                Flag
              </button>

              {p.is_hidden ? (
                <button onClick={() => action("unhide", p.id)}>Unhide</button>
              ) : (
                <button onClick={() => action("hide", p.id)}>Hide</button>
              )}

              <button onClick={() => action("delete", p.id)}>
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button disabled={page <= 1} onClick={() => fetchPosts(page - 1)}>
          Prev
        </button>

        <span>{page} / {totalPages}</span>

        <button disabled={page >= totalPages} onClick={() => fetchPosts(page + 1)}>
          Next
        </button>
      </div>

      {/* ================= MODAL (ADVANCED) ================= */}
      {selectedPost && (
        <div className="modal">
          <div className="modal-content advanced">

            <h2>📌 Post Detail</h2>

            <div className="meta">
              <span>👤 @{selectedPost.author?.username}</span>
              <span>🕒 {new Date(selectedPost.created_at).toLocaleString()}</span>
            </div>

            {/* CONTENT */}
            <div className="content-preview">

              {selectedPost.content && (
                <p className="post-text">{selectedPost.content}</p>
              )}

              {selectedPost.media_url && selectedPost.type === "image" && (
                <img src={selectedPost.media_url} className="media" />
              )}

              {selectedPost.media_url && selectedPost.type === "video" && (
                <video controls className="media">
                  <source src={selectedPost.media_url} />
                </video>
              )}

              {selectedPost.media_url && selectedPost.type === "audio" && (
                <audio controls className="media-audio">
                  <source src={selectedPost.media_url} />
                </audio>
              )}

            </div>

            {/* INFO */}
            <div className="info-grid">
              <div>💰 NC {selectedPost.earnings}</div>
              <div>👁 {selectedPost.views}</div>
              <div>❤️ {selectedPost.feels}</div>
              <div>💬 {selectedPost.reflects}</div>
              <div>🔁 {selectedPost.reecho}</div>
              <div>⚠ {selectedPost.risk_level}</div>
            </div>

            <div className="modal-actions">
              <button onClick={() => action("flag", selectedPost.id)}>Flag</button>
              <button onClick={() => action("hide", selectedPost.id)}>Hide</button>
              <button onClick={() => action("delete", selectedPost.id)}>Delete</button>
            </div>

            <button className="close" onClick={() => setSelectedPost(null)}>
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

function Badge({ label, color }: any) {
  return <span className={`badge ${color}`}>{label}</span>;
}
