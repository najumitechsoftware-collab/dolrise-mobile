"use client";


import axios from "axios";
import { useEffect, useState } from "react";
import "./controls.css";

const API = "https://api.dolrise.com/api/ceo/controls";

export default function ControlsPage() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("ceo_token") : "";

  const headers = { Authorization: `Bearer ${token}` };

  /* ================= GLOBAL ================= */

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activity, setActivity] = useState<string | null>(null);

  const notify = (msg: string) => {
    setActivity(msg);
    setTimeout(() => setActivity(null), 4000);
  };

  const action = async (cb: () => Promise<void>, msg: string) => {
    try {
      setSaving(true);
      await cb();
      notify(msg);
    } finally {
      setSaving(false);
    }
  };

  /* ================= STATES ================= */

  const [platform, setPlatform] = useState({
    maintenance: false,
    readOnly: false,
    registrations: true,
  });

  const [features, setFeatures] = useState<Record<string, boolean>>({});

  const [content, setContent] = useState({
    strictMode: false,
    postLimit: false,
  });

  const [security, setSecurity] = useState({
    captcha: false,
    sessionLimit: false,
  });

  /* ================= LOAD ================= */

  const loadData = async () => {
    try {
      const [p, f] = await Promise.all([
        axios.get(`${API}/platform`, { headers }),
        axios.get(`${API}/features`, { headers }),
      ]);
      setPlatform(p.data);
      setFeatures(f.data);
    } catch (e) {
      console.error("Controls load error", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ================= BACKEND CALLS ================= */

  const updatePlatform = async (data: any, label: string) => {
    await action(async () => {
      await axios.post(`${API}/platform`, data, { headers });
      setPlatform(data);
    }, label);
  };

  const toggleFeature = async (key: string) => {
    await action(async () => {
      const updated = { ...features, [key]: !features[key] };
      await axios.post(`${API}/features`, { [key]: updated[key] }, { headers });
      setFeatures(updated);
    }, `Feature "${key}" updated`);
  };

  const danger = async (url: string, confirmMsg: string, label: string) => {
    if (!confirm(confirmMsg)) return;
    await action(async () => {
      await axios.post(`${API}${url}`, {}, { headers });
    }, label);
  };

  if (loading) {
    return <div className="controls-page">Loading controls…</div>;
  }

  /* ================= UI ================= */

  const ToggleRow = ({
    label,
    value,
    onToggle,
  }: {
    label: string;
    value: boolean;
    onToggle: () => void;
  }) => (
    <div className="control-row">
      <span>{label}</span>
      <button
        disabled={saving}
        onClick={onToggle}
        className={`toggle-btn ${value ? "toggle-on" : "toggle-off"}`}
      >
        {value ? "ON" : "OFF"}
      </button>
    </div>
  );

  return (
    <div className="controls-page">
      {/* HEADER */}
      <div className="controls-header">
        <h1>🎛 Controls</h1>
        <p>Platform governance & system configuration</p>
      </div>

      {/* ACTIVITY */}
      {activity && <div className="activity-log">{activity}</div>}

      {/* A — PLATFORM */}
      <div className="control-section">
        <h2>Platform Controls</h2>

        <ToggleRow
          label="Maintenance Mode"
          value={platform.maintenance}
          onToggle={() =>
            updatePlatform(
              { ...platform, maintenance: !platform.maintenance },
              `Maintenance ${!platform.maintenance ? "enabled" : "disabled"}`,
            )
          }
        />

        <ToggleRow
          label="Read-only Mode"
          value={platform.readOnly}
          onToggle={() =>
            updatePlatform(
              { ...platform, readOnly: !platform.readOnly },
              `Read-only ${!platform.readOnly ? "enabled" : "disabled"}`,
            )
          }
        />

        <ToggleRow
          label="User Registrations"
          value={platform.registrations}
          onToggle={() =>
            updatePlatform(
              { ...platform, registrations: !platform.registrations },
              `Registrations ${!platform.registrations ? "opened" : "frozen"}`,
            )
          }
        />
      </div>

      {/* B — USERS */}
      <div className="control-section">
        <h2>User Controls</h2>

        <div className="action-grid">
          <button
            className="action-btn"
            onClick={() =>
              danger(
                "/users/logout-all",
                "Force logout ALL users?",
                "All users logged out",
              )
            }
          >
            Force Logout All Users
          </button>

          <button
            className="action-btn"
            onClick={() =>
              updatePlatform(
                { ...platform, registrations: false },
                "Registrations frozen",
              )
            }
          >
            Freeze Registrations
          </button>

          <button
            className="action-btn"
            onClick={() =>
              updatePlatform(
                { ...platform, registrations: true },
                "Registrations opened",
              )
            }
          >
            Open Registrations
          </button>
        </div>
      </div>

      {/* C — CONTENT */}
      <div className="control-section">
        <h2>Content Controls</h2>

        <div className="action-grid">
          <button
            className={`action-btn ${content.strictMode ? "active" : ""}`}
            onClick={() =>
              action(
                async () =>
                  setContent({
                    ...content,
                    strictMode: !content.strictMode,
                  }),
                `Strict content mode ${
                  !content.strictMode ? "enabled" : "disabled"
                }`,
              )
            }
          >
            {content.strictMode
              ? "Disable Strict Content Mode"
              : "Enable Strict Content Mode"}
          </button>

          <button
            className={`action-btn ${content.postLimit ? "active" : ""}`}
            onClick={() =>
              action(
                async () =>
                  setContent({
                    ...content,
                    postLimit: !content.postLimit,
                  }),
                `Post limit ${!content.postLimit ? "enabled" : "removed"}`,
              )
            }
          >
            {content.postLimit ? "Remove Post Limit" : "Limit Posts Per User"}
          </button>
        </div>
      </div>

      {/* D — SECURITY */}
      <div className="control-section">
        <h2>Security Controls</h2>

        <div className="action-grid">
          <button
            className={`action-btn ${security.captcha ? "active" : ""}`}
            onClick={() =>
              action(
                async () =>
                  setSecurity({
                    ...security,
                    captcha: !security.captcha,
                  }),
                `CAPTCHA ${!security.captcha ? "enabled" : "disabled"}`,
              )
            }
          >
            {security.captcha ? "Disable CAPTCHA" : "Enable CAPTCHA"}
          </button>

          <button
            className={`action-btn ${security.sessionLimit ? "active" : ""}`}
            onClick={() =>
              action(
                async () =>
                  setSecurity({
                    ...security,
                    sessionLimit: !security.sessionLimit,
                  }),
                `Session limit ${
                  !security.sessionLimit ? "enabled" : "removed"
                }`,
              )
            }
          >
            {security.sessionLimit
              ? "Remove Session Limit"
              : "Limit Active Sessions"}
          </button>
        </div>
      </div>

      {/* E — FEATURES */}
      <div className="control-section">
        <h2>Feature Flags</h2>

        {Object.keys(features).map((key) => (
          <ToggleRow
            key={key}
            label={key}
            value={features[key]}
            onToggle={() => toggleFeature(key)}
          />
        ))}
      </div>

      {/* F — EMERGENCY */}
      <div className="control-section emergency">
        <h2>🚨 Emergency Controls</h2>

        <button
          className="shutdown-btn"
          onClick={() =>
            danger(
              "/emergency/shutdown",
              "THIS WILL SHUT DOWN THE ENTIRE SYSTEM. CONTINUE?",
              "Emergency shutdown initiated",
            )
          }
        >
          Shutdown Entire System
        </button>
      </div>
    </div>
  );
}
