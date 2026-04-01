"use client";

import { useState } from "react";
import "./Settings.css";

/* ===== SECTIONS ===== */
import AccountSection from "./sections/AccountSection";
import SecuritySection from "./sections/SecuritySection";
import PrivacySection from "./sections/PrivacySection";
import NotificationsSection from "./sections/NotificationsSection";
import DataSection from "./sections/DataSection";
import DangerSection from "./sections/DangerSection";
import AboutUsSection from "./sections/AboutUsSection";

/* ======================
   TYPES
====================== */
type Section =
  | "account"
  | "security"
  | "privacy"
  | "notifications"
  | "data"
  | "about"
  | "danger"
  | null;

export default function SettingsPage() {
  const [open, setOpen] = useState<Section>(null);

  return (
    <main className="settings-page">

      {/* ================= HEADER ================= */}
      <header className="settings-header">
        <button
          className="settings-back"
          onClick={() => history.back()}
        >
          ← Back
        </button>

        <h1>Settings</h1>
        <p>Control your account, privacy and security</p>
      </header>

      {/* ================= SETTINGS LIST ================= */}
      <section className="settings-list">

        <SettingsCard
          title="Account & Identity"
          desc="Name, username, email"
          onClick={() => setOpen("account")}
        />

        <SettingsCard
          title="Security"
          desc="Password & account protection"
          onClick={() => setOpen("security")}
        />

        <SettingsCard
          title="Privacy & Visibility"
          desc="Who can see your activity"
          onClick={() => setOpen("privacy")}
        />

        <SettingsCard
          title="Notifications"
          desc="Email, push & alerts"
          onClick={() => setOpen("notifications")}
        />

        <SettingsCard
          title="Data & Transparency"
          desc="Your data & activity"
          onClick={() => setOpen("data")}
        />

        <SettingsCard
          title="About DolRise"
          desc="Our mission, values & story"
          onClick={() => setOpen("about")}
        />

        <SettingsCard
          title="Danger Zone"
          desc="Deactivate or delete account"
          danger
          onClick={() => setOpen("danger")}
        />

      </section>

      {/* ================= SLIDE SECTIONS ================= */}

      {open === "account" && (
        <AccountSection onBack={() => setOpen(null)} />
      )}

      {open === "security" && (
        <SecuritySection onBack={() => setOpen(null)} />
      )}

      {open === "privacy" && (
        <PrivacySection onBack={() => setOpen(null)} />
      )}

      {open === "notifications" && (
        <NotificationsSection onBack={() => setOpen(null)} />
      )}

      {open === "data" && (
        <DataSection onBack={() => setOpen(null)} />
      )}

      {open === "about" && (
        <AboutUsSection onBack={() => setOpen(null)} />
      )}

      {open === "danger" && (
        <DangerSection onBack={() => setOpen(null)} />
      )}

    </main>
  );
}

/* ======================
   CARD COMPONENT
====================== */
function SettingsCard({
  title,
  desc,
  onClick,
  danger,
}: {
  title: string;
  desc: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      className={`settings-card ${danger ? "danger" : ""}`}
      onClick={onClick}
    >
      <div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      <span>›</span>
    </button>
  );
}
