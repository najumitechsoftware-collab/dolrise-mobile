"use client";

import { useEffect, useState } from "react";
import ceoAxios from "@/lib/ceoAxios";

export default function CreateRoleModal({ onClose, onCreated }: any) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [teamId, setTeamId] = useState("");

  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingTeams, setFetchingTeams] = useState(true);
  const [error, setError] = useState("");

  /* ================= LOAD TEAMS ================= */
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setFetchingTeams(true);

        const res = await ceoAxios.get("/api/ceo/teams");

        console.log("TEAMS:", res.data);

        setTeams(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("TEAM LOAD ERROR:", err);
        setError("Failed to load teams");
      } finally {
        setFetchingTeams(false);
      }
    };

    fetchTeams();
  }, []);

  /* ================= VALIDATION ================= */
  const validate = () => {
    if (!name.trim()) return "Role name is required";
    if (!level.trim()) return "Level is required";
    if (!teamId) return "Please select a team";
    return null;
  };

  /* ================= CREATE ================= */
  const handleCreate = async () => {
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      await ceoAxios.post("/api/ceo/roles", {
        name: name.trim(),
        level: level.trim(),
        team_id: Number(teamId),
      });

      onCreated();
      onClose();
    } catch (err: any) {
      console.error("CREATE ROLE ERROR:", err);

      const msg =
        err?.response?.data?.error ||
        err?.message ||
        "Failed to create role";

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create Role</h2>

        {/* ERROR */}
        {error && <div className="modal-error">{error}</div>}

        {/* ROLE NAME */}
        <input
          placeholder="Role Name (e.g. moderator_L1)"
          value={name}
          onChange={(e) => {
            setError("");
            setName(e.target.value);
          }}
        />

        {/* LEVEL */}
        <input
          placeholder="Level (L1, L2, L3...)"
          value={level}
          onChange={(e) => {
            setError("");
            setLevel(e.target.value);
          }}
        />

        {/* TEAM SELECT */}
        <select
          value={teamId}
          onChange={(e) => {
            setError("");
            setTeamId(e.target.value);
          }}
          disabled={fetchingTeams}
        >
          <option value="">
            {fetchingTeams ? "Loading teams..." : "Select Team"}
          </option>

          {teams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        {/* ACTIONS */}
        <div className="modal-actions">
          <button onClick={onClose} disabled={loading}>
            Cancel
          </button>

          <button onClick={handleCreate} disabled={loading}>
            {loading ? "Creating..." : "Create Role"}
          </button>
        </div>
      </div>
    </div>
  );
}
