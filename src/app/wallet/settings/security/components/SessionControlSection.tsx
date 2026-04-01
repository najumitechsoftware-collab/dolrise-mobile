"use client";

import { useState } from "react";

interface Props {
  settings: any;
  refresh: () => void;
}

export default function SessionControlSection({
  settings,
  refresh,
}: Props) {
  const [timeout, setTimeoutValue] = useState(
    settings?.session_timeout || 15
  );
  const [lockExit, setLockExit] = useState(
    settings?.lock_on_exit || false
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    try {
      setLoading(true);

      const res = await fetch(
        "https://api.dolrise.com/api/wallet/security/session",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_timeout: timeout,
            lock_on_exit: lockExit,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessage("Session updated.");
      refresh();
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="security-card">

      <h2>Session & Auto-Lock</h2>

      <select
        value={timeout}
        onChange={(e) =>
          setTimeoutValue(Number(e.target.value))
        }
      >
        <option value={5}>5 Minutes</option>
        <option value={15}>15 Minutes</option>
        <option value={30}>30 Minutes</option>
      </select>

      <label className="toggle">
        <input
          type="checkbox"
          checked={lockExit}
          onChange={() => setLockExit(!lockExit)}
        />
        Lock wallet on exit
      </label>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="primary-btn"
      >
        {loading ? "Saving..." : "Save Session"}
      </button>

      {message && <p className="form-message">{message}</p>}
    </div>
  );
}
