"use client";

import { useEffect, useState } from "react";
import ceoAxios from "@/lib/ceoAxios";
import CreateRoleModal from "./components/CreateRoleModal";
import RolePermissionsModal from "./components/RolePermissionsModal";
import "./roles.css";

export default function RolesPage() {
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);

  /* ================= FETCH ================= */
  const fetchRoles = async () => {
    try {
      const res = await ceoAxios.get("/api/ceo/roles");

      console.log("ROLES:", res.data);

      setRoles(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch roles", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  /* ================= STATES ================= */
  if (loading) {
    return <div className="roles-loading">Loading roles...</div>;
  }

  return (
    <div className="roles-container">
      {/* HEADER */}
      <div className="roles-header">
        <div>
          <h1>Role Management</h1>
          <p>Control permissions, teams & access levels</p>
        </div>

        <button
          className="create-role-btn"
          onClick={() => setShowModal(true)}
        >
          + Create Role
        </button>
      </div>

      {/* EMPTY STATE */}
      {roles.length === 0 && (
        <div className="roles-empty">
          <h3>No roles yet</h3>
          <p>Create your first role to start managing access</p>
        </div>
      )}

      {/* TABLE */}
      {roles.length > 0 && (
        <div className="roles-table">
          <div className="roles-head">
            <span>Name</span>
            <span>Level</span>
            <span>Team</span>
            <span>Permissions</span>
            <span>Actions</span>
          </div>

          {roles.map((r) => (
            <div key={r.id} className="roles-row">
              <span className="role-name">{r.name}</span>

              <span className="role-level">{r.level}</span>

              <span className="role-team">
                {r.team?.name || "-"}
              </span>

              <span className="role-perms">
                {r.permissions?.length || 0}
              </span>

              {/* ACTIONS */}
              <div className="role-actions">
                <button
                  className="perm-btn"
                  onClick={() => setSelectedRole(r)}
                >
                  Permissions
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE MODAL */}
      {showModal && (
        <CreateRoleModal
          onClose={() => setShowModal(false)}
          onCreated={fetchRoles}
        />
      )}

      {/* PERMISSION MODAL */}
      {selectedRole && (
        <RolePermissionsModal
          role={selectedRole}
          onClose={() => setSelectedRole(null)}
        />
      )}
    </div>
  );
}
