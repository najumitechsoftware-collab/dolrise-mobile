"use client";

import { useState } from "react";
import "./ChangePasswordSection.css";

export default function ChangePasswordSection({
  onBack,
}: {
  onBack: () => void;
}) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");

  const [show, setShow] = useState({
    current: false,
    next: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const strength = getStrength(next);

  const canSave =
    current &&
    next &&
    confirm &&
    next === confirm &&
    strength === "strong" &&
    !loading;

  async function save() {
    if (!canSave) return;

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/security/password`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentPassword: current,
            newPassword: next,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setSuccess("Password updated successfully.");
      setCurrent("");
      setNext("");
      setConfirm("");

      setTimeout(() => {
        onBack();
      }, 1200);

    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="security-sheet slide-up">
      <header className="sheet-header">
        <button onClick={onBack}>← Back</button>
        <h3>Change Password</h3>
      </header>

      <div className="sheet-body">

        <Field
          label="Current password"
          value={current}
          show={show.current}
          onToggle={() =>
            setShow((s) => ({ ...s, current: !s.current }))
          }
          onChange={setCurrent}
        />

        <Field
          label="New password"
          value={next}
          show={show.next}
          onToggle={() =>
            setShow((s) => ({ ...s, next: !s.next }))
          }
          onChange={setNext}
        />

        <Field
          label="Confirm new password"
          value={confirm}
          show={show.confirm}
          onToggle={() =>
            setShow((s) => ({ ...s, confirm: !s.confirm }))
          }
          onChange={setConfirm}
        />

        <div className={`strength ${strength}`}>
          Strength: {strength.toUpperCase()}
        </div>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button
          className="primary-btn"
          disabled={!canSave}
          onClick={save}
        >
          {loading ? "Saving..." : "Save Password"}
        </button>
      </div>
    </div>
  );
}

/* FIELD */
function Field({
  label,
  value,
  show,
  onToggle,
  onChange,
}: any) {
  return (
    <div className="field">
      <input
        type={show ? "text" : "password"}
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button type="button" className="eye" onClick={onToggle}>
        {show ? "🙈" : "👁️"}
      </button>
    </div>
  );
}

function getStrength(p: string) {
  if (
    p.length >= 12 &&
    /[A-Z]/.test(p) &&
    /[a-z]/.test(p) &&
    /\d/.test(p) &&
    /[^A-Za-z0-9]/.test(p)
  )
    return "strong";

  if (p.length >= 8) return "medium";

  return "weak";
}
