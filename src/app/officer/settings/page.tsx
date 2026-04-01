"use client";

import { useState } from "react";
import axios from "axios";
import "./settings.css";

export default function SettingsPage() {
  const [tab, setTab] = useState("profile");

  const [passwords, setPasswords] = useState({
    old: "",
    new: "",
    confirm: "",
  });

  const changePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("/api/officer/settings/change-password", passwords);
      alert("Password updated");
      setPasswords({ old: "", new: "", confirm: "" });
    } catch {
      alert("Failed to update password");
    }
  };

  return (
    <div className="settings-container">
      {/* LEFT MENU */}
      <div className="settings-sidebar">
        <h3>Settings</h3>

        <button onClick={() => setTab("profile")} className={tab==="profile"?"active":""}>Profile</button>
        <button onClick={() => setTab("security")} className={tab==="security"?"active":""}>Security</button>
        <button onClick={() => setTab("sessions")} className={tab==="sessions"?"active":""}>Sessions</button>
        <button onClick={() => setTab("notifications")} className={tab==="notifications"?"active":""}>Notifications</button>
        <button onClick={() => setTab("preferences")} className={tab==="preferences"?"active":""}>Preferences</button>
        <button onClick={() => setTab("legal")} className={tab==="legal"?"active":""}>Legal</button>
      </div>

      {/* RIGHT PANEL */}
      <div className="settings-content">

        {/* PROFILE */}
        {tab === "profile" && (
          <div>
            <h2>Profile</h2>

            <input placeholder="Full Name" />
            <input placeholder="Email" disabled />
            <input placeholder="Country" />

            <button className="save-btn">Save Changes</button>
          </div>
        )}

        {/* SECURITY */}
        {tab === "security" && (
          <div>
            <h2>Security</h2>

            <input
              type="password"
              placeholder="Old Password"
              value={passwords.old}
              onChange={(e) =>
                setPasswords({ ...passwords, old: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="New Password"
              value={passwords.new}
              onChange={(e) =>
                setPasswords({ ...passwords, new: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={passwords.confirm}
              onChange={(e) =>
                setPasswords({ ...passwords, confirm: e.target.value })
              }
            />

            <button onClick={changePassword} className="danger-btn">
              Update Password
            </button>
          </div>
        )}

        {/* SESSIONS */}
        {tab === "sessions" && (
          <div>
            <h2>Active Sessions</h2>

            <div className="session-card">
              <p>Device: Android Chrome</p>
              <p>IP: 102.xxx.xxx</p>
              <button>Logout</button>
            </div>
          </div>
        )}

        {/* NOTIFICATIONS */}
        {tab === "notifications" && (
          <div>
            <h2>Notifications</h2>

            <label><input type="checkbox" defaultChecked /> Case Alerts</label>
            <label><input type="checkbox" defaultChecked /> Escalations</label>
            <label><input type="checkbox" /> Email Notifications</label>
          </div>
        )}

        {/* PREFERENCES */}
        {tab === "preferences" && (
          <div>
            <h2>Work Preferences</h2>

            <label>
              <input type="checkbox" defaultChecked />
              Auto-refresh queue
            </label>

            <label>
              <input type="checkbox" />
              Auto assign cases
            </label>
          </div>
        )}

        {/* LEGAL */}
        {tab === "legal" && (
          <div>
            <h2>Legal & Compliance</h2>

            <p>Terms of Service</p>
            <p>Privacy Policy</p>
            <p>Moderator Guidelines</p>

            <label>
              <input type="checkbox" /> I agree to policies
            </label>
          </div>
        )}

      </div>
    </div>
  );
}
