"use client";

import { useState } from "react";
import "../Settings.css";
import "./DataSection.css";

/* ========= SUB SECTIONS ========= */
import OverviewSection from "./data/overview/OverviewSection";
import SummarySection from "./data/summary/SummarySection";
import DownloadSection from "./data/download/DownloadSection";
import UsageSection from "./data/usage/UsageSection";

/*
  ======================================================
  DOLRISE – DATA & TRANSPARENCY CENTER
  Structured Transparency Architecture
  ======================================================
*/

type View =
  | "main"
  | "overview"
  | "summary"
  | "download"
  | "delete"
  | "consent"
  | "usage"
  | "security";

export default function DataSection({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<View>("main");

  /* ======================================================
     OVERVIEW
  ====================================================== */
  if (view === "overview") {
    return (
      <div className="settings-sheet slide-up">
        <header className="sheet-header">
          <button onClick={() => setView("main")}>← Back</button>
          <h2>Overview</h2>
        </header>
        <div className="sheet-body">
          <OverviewSection />
        </div>
      </div>
    );
  }

  /* ======================================================
     SUMMARY
  ====================================================== */
  if (view === "summary") {
    return (
      <div className="settings-sheet slide-up">
        <header className="sheet-header">
          <button onClick={() => setView("main")}>← Back</button>
          <h2>Your Data Summary</h2>
        </header>
        <div className="sheet-body">
          <SummarySection />
        </div>
      </div>
    );
  }

  /* ======================================================
     DOWNLOAD
  ====================================================== */
  if (view === "download") {
    return (
      <div className="settings-sheet slide-up">
        <header className="sheet-header">
          <button onClick={() => setView("main")}>← Back</button>
          <h2>Download Your Data</h2>
        </header>
        <div className="sheet-body">
          <DownloadSection />
        </div>
      </div>
    );
  }

  /* ======================================================
     USAGE (WHY WE COLLECT DATA)
  ====================================================== */
  if (view === "usage") {
    return (
      <div className="settings-sheet slide-up">
        <header className="sheet-header">
          <button onClick={() => setView("main")}>← Back</button>
          <h2>Why We Collect Data</h2>
        </header>
        <div className="sheet-body">
          <UsageSection />
        </div>
      </div>
    );
  }

  /* ======================================================
     OTHER PLACEHOLDERS
  ====================================================== */
  if (view !== "main") {
    return (
      <div className="settings-sheet slide-up">
        <header className="sheet-header">
          <button onClick={() => setView("main")}>← Back</button>
          <h2>{getTitle(view)}</h2>
        </header>

        <div className="sheet-body">
          <div className="dt-placeholder-block">
            <p>
              This section will be implemented with full backend integration
              and compliance logic.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ======================================================
     MAIN HUB
  ====================================================== */
  return (
    <div className="settings-sheet slide-up">
      <header className="sheet-header">
        <button onClick={onBack}>← Back</button>
        <h2>Data & Transparency</h2>
        <p>You own your data. DolRise protects it.</p>
      </header>

      <div className="sheet-body dt-grid">

        <button className="dt-card" onClick={() => setView("overview")}>
          <h4>Overview</h4>
          <p>Understand how your data is handled.</p>
        </button>

        <button className="dt-card" onClick={() => setView("summary")}>
          <h4>Your Data Summary</h4>
          <p>See high-level metrics of your account.</p>
        </button>

        <button className="dt-card primary" onClick={() => setView("download")}>
          <h4>Download Your Data</h4>
          <p>Request a structured export of your information.</p>
        </button>

        <button className="dt-card" onClick={() => setView("usage")}>
          <h4>Why We Collect Data</h4>
          <p>Transparency about data usage.</p>
        </button>

        <button className="dt-card danger" onClick={() => setView("delete")}>
          <h4>Delete Your Data</h4>
          <p>Permanently erase your personal data.</p>
        </button>

        <button className="dt-card" onClick={() => setView("consent")}>
          <h4>Policy & Consent History</h4>
          <p>Review accepted policy versions.</p>
        </button>

        <button className="dt-card" onClick={() => setView("security")}>
          <h4>Security Notice</h4>
          <p>How we protect your information.</p>
        </button>

      </div>
    </div>
  );
}

/* ======================================================
   TITLE HELPER
====================================================== */
function getTitle(view: string) {
  switch (view) {
    case "delete":
      return "Delete Your Data";
    case "consent":
      return "Policy & Consent History";
    case "security":
      return "Security Notice";
    default:
      return "";
  }
}
