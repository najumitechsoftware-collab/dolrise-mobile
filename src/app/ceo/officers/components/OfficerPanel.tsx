"use client";
import { useEffect, useState } from "react";
import ceoAxios from "@/lib/ceoAxios";
import "./officer-panel.css";

export default function OfficerPanel({ officer, onClose, refresh }: any) {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [allPermissions, setAllPermissions] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  /* ================= INIT ================= */
  useEffect(() => {
    if (!officer) return;

    setPermissions(officer.permissions || []);

    fetchSessions();
    fetchPermissions();
  }, [officer]);

  /* ================= FETCH ALL PERMISSIONS ================= */
  const fetchPermissions = async () => {
    try {
      const res = await ceoAxios.get("/api/ceo/permissions");
      setAllPermissions(res.data || []);
    } catch {
      console.log("Failed to load permissions");
    }
  };

  /* ================= FETCH SESSIONS ================= */
  const fetchSessions = async () => {
    try {
      const res = await ceoAxios.get(
        `/api/ceo/officers/${officer.id}/sessions`
      );
      setSessions(res.data || []);
    } catch {
      console.log("Failed to load sessions");
    }
  };

  /* ================= TOGGLE ================= */
  const togglePermission = (key: string) => {
    setPermissions((prev) => {
      if (prev.includes(key)) {
        return prev.filter((p) => p !== key);
      } else {
        return [...prev, key];
      }
    });
  };

  /* ================= SAVE ================= */
  const savePermissions = async () => {
    try {
      setLoading(true);

      await ceoAxios.post(
        `/api/ceo/officers/${officer.id}/override`,
        {
          permissions
        }
      );

      alert("Permissions updated");
      refresh();
    } catch {
      alert("Failed to update permissions");
    } finally {
      setLoading(false);
    }
  };

  /* ================= ACTIONS ================= */
  const emergencyRestrict = async () => {
    if (!confirm("Emergency restrict officer?")) return;

    await ceoAxios.post(
      `/api/ceo/officers/${officer.id}/emergency`
    );

    refresh();
    onClose();
  };

  const resetPermissions = async () => {
    await ceoAxios.post(
      `/api/ceo/officers/${officer.id}/reset-template`
    );

    refresh();
    onClose();
  };

  /* ================= GROUP BY CATEGORY ================= */
  const groupedPermissions = allPermissions.reduce((acc: any, perm: any) => {
    const category = perm.category || "general";
    if (!acc[category]) acc[category] = [];
    acc[category].push(perm);
    return acc;
  }, {});

  /* ================= UI ================= */
  return (
    <div className="panel-overlay">
      <div className="panel">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        {/* PROFILE */}
        <div className="panel-section">
          <h2>{officer.full_name}</h2>
          <p>{officer.email}</p>

          <div className="profile-grid">
            <span>
              Role: {officer.role?.name || officer.role}
            </span>
            <span>
              Level: {officer.role?.level || "N/A"}
            </span>
            <span>
              Country: {officer.country || "N/A"}
            </span>
            <span>
              Status:{" "}
              {officer.is_suspended ? "Suspended" : "Active"}
            </span>
          </div>
        </div>

        {/* PERMISSIONS */}
        <div className="panel-section">
          <h3>Permissions (Dynamic RBAC)</h3>

          {Object.keys(groupedPermissions).map((category) => (
            <div key={category} className="perm-category">
              <h4>{category.toUpperCase()}</h4>

              <div className="permissions-grid">
                {groupedPermissions[category].map((perm: any) => (
                  <label key={perm.key} className="perm-item">
                    <input
                      type="checkbox"
                      checked={permissions.includes(perm.key)}
                      onChange={() => togglePermission(perm.key)}
                    />
                    {perm.key}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            className="save-btn"
            onClick={savePermissions}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Permissions"}
          </button>
        </div>

        {/* SESSIONS */}
        <div className="panel-section">
          <h3>Active Sessions</h3>

          {sessions.length ? (
            sessions.map((s, i) => (
              <div key={i} className="session-card">
                <span>{s.ip_address}</span>
                <span>{s.device_info}</span>
                <span>
                  {new Date(s.created_at).toLocaleString()}
                </span>
              </div>
            ))
          ) : (
            <p>No sessions</p>
          )}
        </div>

        {/* ACTIONS */}
        <div className="panel-actions">
          <button className="danger" onClick={emergencyRestrict}>
            Emergency Restrict
          </button>

          <button className="reset" onClick={resetPermissions}>
            Reset Template
          </button>
        </div>
      </div>
    </div>
  );
}
