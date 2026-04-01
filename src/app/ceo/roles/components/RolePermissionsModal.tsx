"use client";

import { useEffect, useState } from "react";
import ceoAxios from "@/lib/ceoAxios";

export default function RolePermissionsModal({ role, onClose }: any) {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [groupedPermissions, setGroupedPermissions] = useState<any>({});
  const [expanded, setExpanded] = useState<any>({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  /* ================= LOAD ================= */
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const res = await ceoAxios.get("/api/ceo/permissions");
        const data = res.data?.data || {};

        setGroupedPermissions(data);

        // expand all by default
        const initialExpand: any = {};
        Object.keys(data).forEach((k) => (initialExpand[k] = true));
        setExpanded(initialExpand);

        // preload role permissions
        if (role?.permissions) {
          setSelectedPermissions(role.permissions);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };

    fetchPermissions();
  }, [role]);

  /* ================= TOGGLE ================= */
  const togglePermission = (key: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(key)
        ? prev.filter((p) => p !== key)
        : [...prev, key]
    );
  };

  /* ================= SELECT ALL ================= */
  const toggleCategory = (category: string) => {
    const keys = groupedPermissions[category].map((p: any) => p.key);

    const allSelected = keys.every((k: string) =>
      selectedPermissions.includes(k)
    );

    if (allSelected) {
      setSelectedPermissions((prev) =>
        prev.filter((p) => !keys.includes(p))
      );
    } else {
      setSelectedPermissions((prev) => [
        ...new Set([...prev, ...keys]),
      ]);
    }
  };

  /* ================= COLLAPSE ================= */
  const toggleExpand = (category: string) => {
    setExpanded((prev: any) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  /* ================= SAVE ================= */
  const save = async () => {
    try {
      setLoading(true);

      await ceoAxios.post(
        `/api/ceo/roles/${role.id}/permissions`,
        { permissions: selectedPermissions }
      );

      alert("Permissions updated");
      onClose();
    } catch (err) {
      alert("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  /* ================= FILTER ================= */
  const filterPermissions = (list: any[]) => {
    if (!search) return list;
    return list.filter((p) =>
      p.key.toLowerCase().includes(search.toLowerCase())
    );
  };

  /* ================= UI ================= */
  return (
    <div className="modal-overlay">
      <div className="modal large">
        <h2>Permissions — {role.name}</h2>

        {/* SEARCH */}
        <input
          className="perm-search"
          placeholder="Search permissions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {fetching ? (
          <div className="roles-loading">Loading...</div>
        ) : (
          <div className="permissions-wrapper">
            {Object.keys(groupedPermissions).map((category) => {
              const list = filterPermissions(
                groupedPermissions[category]
              );

              if (list.length === 0) return null;

              return (
                <div key={category} className="perm-category">
                  {/* HEADER */}
                  <div className="perm-header">
                    <h3 onClick={() => toggleExpand(category)}>
                      {expanded[category] ? "▼" : "▶"}{" "}
                      {category.toUpperCase()}
                    </h3>

                    <button
                      className="select-all"
                      onClick={() => toggleCategory(category)}
                    >
                      Select All
                    </button>
                  </div>

                  {/* LIST */}
                  {expanded[category] && (
                    <div className="permissions-grid">
                      {list.map((p: any) => (
                        <label key={p.key} className="perm-item">
                          <input
                            type="checkbox"
                            checked={selectedPermissions.includes(p.key)}
                            onChange={() =>
                              togglePermission(p.key)
                            }
                          />
                          {p.key}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* FOOTER */}
        <div className="modal-actions">
          <span className="perm-count">
            {selectedPermissions.length} selected
          </span>

          <button onClick={onClose}>Cancel</button>

          <button onClick={save} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
