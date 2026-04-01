"use client";

import { useState, useEffect } from "react";
import "./SecuritySection.css";

/* CHILD SECTIONS */
import ChangePasswordSection from "./security/ChangePasswordSection";
import DevicesSection from "./security/DevicesSection";
import ActivitySection from "./security/ActivitySection";
import TwoFactorSection from "./security/TwoFactorSection";
import ProtectionSection from "./security/ProtectionSection";

type View =
  | "main"
  | "password"
  | "devices"
  | "activity"
  | "2fa"
  | "protection";

export default function SecuritySection({
  onBack,
}: {
  onBack: () => void;
}) {
  const [view, setView] = useState<View>("main");

  /* LOCK BACKGROUND */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="security-overlay">
      <div className="security-sheet slide-up">

        {/* ================= MAIN HUB ================= */}
        {view === "main" && (
          <>
            <header className="security-header">
              <button className="back-btn" onClick={onBack}>
                ← Back
              </button>

              <h2>Security</h2>
              <p>Manage account protection and login safety</p>
            </header>

            <div className="security-cards">

              <Card
                title="Change password"
                desc="Update your password securely"
                onClick={() => setView("password")}
              />

              <Card
                title="Devices & Sessions"
                desc="Manage logged-in devices"
                onClick={() => setView("devices")}
              />

              <Card
                title="Security activity"
                desc="Review recent login events"
                onClick={() => setView("activity")}
              />

              <Card
                title="Two-Factor Authentication"
                desc="Add an extra layer of protection"
                onClick={() => setView("2fa")}
              />

              <Card
                title="Account protection"
                desc="Advanced security safeguards"
                onClick={() => setView("protection")}
              />

            </div>
          </>
        )}

        {/* ================= CHILD VIEWS ================= */}

        {view === "password" && (
          <ChangePasswordSection onBack={() => setView("main")} />
        )}

        {view === "devices" && (
          <DevicesSection onBack={() => setView("main")} />
        )}

        {view === "activity" && (
          <ActivitySection onBack={() => setView("main")} />
        )}

        {view === "2fa" && (
          <TwoFactorSection onBack={() => setView("main")} />
        )}

        {view === "protection" && (
          <ProtectionSection onBack={() => setView("main")} />
        )}

      </div>
    </div>
  );
}

/* ================= CARD ================= */

function Card({
  title,
  desc,
  onClick,
}: {
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button className="security-card" onClick={onClick}>
      <div>
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
      <span className="arrow">›</span>
    </button>
  );
}
