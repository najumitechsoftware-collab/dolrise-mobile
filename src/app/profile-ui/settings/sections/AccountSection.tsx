"use client";

import { useEffect, useState } from "react";
import "./AccountSection.css";

/* =========================
   TYPES
========================= */

interface AccountData {
  full_name: string;
  username: string;
  email: string;
  last_name_change?: string | null;
  last_username_change?: string | null;
  last_email_change?: string | null;
}

type EditMode = null | "name" | "username" | "email";

/* =========================
   COMPONENT
========================= */

export default function AccountSection({ onBack }: { onBack: () => void }) {
  const [data, setData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(true);

  const [edit, setEdit] = useState<EditMode>(null);
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* =========================
     LOAD DATA
  ========================= */

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/settings/account`,
          { credentials: "include" }
        );
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error("Failed to load account settings", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* =========================
     OPEN EDIT
  ========================= */

  const openEdit = (mode: EditMode) => {
    if (!data) return;
    setError(null);
    setEdit(mode);
    setValue(
      mode === "name"
        ? data.full_name
        : mode === "username"
        ? data.username
        : data.email
    );
  };

  /* =========================
     SAVE CHANGE
  ========================= */

  const saveChange = async () => {
    if (!edit) return;

    setSaving(true);
    setError(null);

    try {
      const payload =
        edit === "name"
          ? { full_name: value }
          : edit === "username"
          ? { username: value }
          : { email: value };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/settings/identity`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Update failed");

      setData((prev) =>
        prev
          ? {
              ...prev,
              ...payload,
            }
          : prev
      );

      setEdit(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  /* =========================
     STATES
  ========================= */

  if (loading) return <div className="account-loading">Loading…</div>;
  if (!data) return <div className="account-error">Unable to load data</div>;

  /* =========================
     RENDER
  ========================= */

  return (
    <div className="account-sheet">
      {/* HEADER */}
      <header className="account-header">
        <button className="account-back" onClick={onBack}>
          ← Back
        </button>
        <h2>Account & Identity</h2>
        <p>Name, username and email</p>
      </header>

      {/* BODY */}
      <div className="account-body">
        <AccountRow
          label="Full name"
          value={data.full_name}
          hint="You can change this once every 60 days"
          action="Change name"
          onClick={() => openEdit("name")}
          disabled={!canChange60Days(data.last_name_change)}
        />

        <AccountRow
          label="Username"
          value={`@${data.username}`}
          hint="Username can be changed once every 60 days"
          action="Change username"
          onClick={() => openEdit("username")}
          disabled={!canChange60Days(data.last_username_change)}
        />

        <AccountRow
          label="Email"
          value={data.email}
          hint="Email can be changed once every 24 hours"
          action="Change email"
          onClick={() => openEdit("email")}
          disabled={!canChange24Hours(data.last_email_change)}
        />
      </div>

      {/* MODAL */}
      {edit && (
        <div className="account-modal">
          <div className="account-modal-sheet">
            <h3>
              Change{" "}
              {edit === "name"
                ? "Full name"
                : edit === "username"
                ? "Username"
                : "Email"}
            </h3>

            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter new value"
            />

            {error && <p className="account-error-text">{error}</p>}

            <div className="account-modal-actions">
              <button
                className="account-btn-cancel"
                onClick={() => setEdit(null)}
              >
                Cancel
              </button>

              <button
                className="account-btn-save"
                onClick={saveChange}
                disabled={saving}
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================
   ROW
========================= */

function AccountRow({
  label,
  value,
  hint,
  action,
  onClick,
  disabled,
}: {
  label: string;
  value: string;
  hint: string;
  action: string;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <div className="account-row">
      <div className="account-info">
        <strong>{label}</strong>
        <span className="account-value">{value}</span>
        <small>{hint}</small>
      </div>
      <button
        className="account-action"
        onClick={onClick}
        disabled={disabled}
      >
        {action}
      </button>
    </div>
  );
}

/* =========================
   RULES
========================= */

function canChange60Days(last?: string | null) {
  if (!last) return true;
  return Date.now() - new Date(last).getTime() >= 60 * 24 * 60 * 60 * 1000;
}

function canChange24Hours(last?: string | null) {
  if (!last) return true;
  return Date.now() - new Date(last).getTime() >= 24 * 60 * 60 * 1000;
}
