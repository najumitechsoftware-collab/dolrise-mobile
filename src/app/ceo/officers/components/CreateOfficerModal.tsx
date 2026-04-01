"use client";

import { useEffect, useState } from "react";
import ceoAxios from "@/lib/ceoAxios";

interface Props {
  onClose: () => void;
  onCreated: () => void;
}

interface Role {
  id: number;
  name: string;
  level: string;
}

export default function CreateOfficerModal({ onClose, onCreated }: Props) {
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [error, setError] = useState("");
  const [loadingRoles, setLoadingRoles] = useState(true);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    country: "",
    role_id: "",
    temporary_password: "",
  });

  /* ================= FETCH ROLES ================= */
  const fetchRoles = async () => {
    try {
      setLoadingRoles(true);

      const res = await ceoAxios.get("/api/ceo/roles");

      const payload = res.data?.data || res.data;
      setRoles(payload || []);
    } catch (err) {
      console.error("Failed to load roles", err);
      setError("Failed to load roles");
    } finally {
      setLoadingRoles(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  /* ================= CHANGE ================= */
  const handleChange = (e: any) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= VALIDATE ================= */
  const validate = () => {
    if (!form.full_name.trim()) return "Full name is required";
    if (!form.email.trim()) return "Email is required";
    if (!form.role_id) return "Role is required";
    if (!form.temporary_password.trim())
      return "Temporary password is required";

    if (form.temporary_password.length < 6)
      return "Password must be at least 6 characters";

    return null;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      await ceoAxios.post("/api/ceo/officers", {
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        country: form.country.trim(),
        role_id: Number(form.role_id),
        temporary_password: form.temporary_password,
      });

      onCreated();
      onClose();
    } catch (err: any) {
      console.error("CREATE OFFICER ERROR:", err);

      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create officer";

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create Officer</h2>

        {/* ERROR */}
        {error && <div className="modal-error">{error}</div>}

        {/* INPUTS */}
        <input
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
        />

        {/* ROLE SELECT */}
        {loadingRoles ? (
          <div className="select-loading">Loading roles...</div>
        ) : (
          <select
            name="role_id"
            value={form.role_id}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name} ({role.level})
              </option>
            ))}
          </select>
        )}

        <input
          name="temporary_password"
          placeholder="Temporary Password"
          type="password"
          value={form.temporary_password}
          onChange={handleChange}
        />

        {/* ACTIONS */}
        <div className="modal-actions">
          <button onClick={onClose} disabled={loading}>
            Cancel
          </button>

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create Officer"}
          </button>
        </div>
      </div>
    </div>
  );
}
