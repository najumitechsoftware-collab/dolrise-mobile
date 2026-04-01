"use client";

import { useState } from "react";
import "./Support.css";

/* SECTIONS */
import FAQSection from "./sections/FAQSection";
import CareTeamSection from "./sections/CareTeamSection";

type Section = "faq" | "lumi" | "care" | null;

export default function SupportCenterPage() {
  const [open, setOpen] = useState<Section>(null);

  return (
    <main className="support-page">
      {/* ================= HEADER ================= */}
      <header className="support-header">
        <button
          className="support-back"
          onClick={() => {
            if (open) {
              setOpen(null);
            } else {
              history.back();
            }
          }}
        >
          ← Back
        </button>

        <h1>Support & Care</h1>
        <p>
          You’re not alone. We’re here to support you with care, clarity, and
          respect.
        </p>
      </header>

      {/* ================= OPTIONS ================= */}
      {!open && (
        <section className="support-options">
          <button className="support-card" onClick={() => setOpen("faq")}>
            <div>
              <h3>Common Questions</h3>
              <p>Quick answers to things people often ask.</p>
            </div>
            <span>›</span>
          </button>

          <button className="support-card" onClick={() => setOpen("lumi")}>
            <div>
              <h3>LUMi Care</h3>
              <p>Gentle guidance and understanding from LUMi.</p>
            </div>
            <span>›</span>
          </button>

          <button className="support-card" onClick={() => setOpen("care")}>
            <div>
              <h3>Care Team</h3>
              <p>Reach our human care team for personal support.</p>
            </div>
            <span>›</span>
          </button>
        </section>
      )}

      {/* ================= SLIDE-UP SECTIONS ================= */}

      {/* FAQ */}
      {open === "faq" && (
        <FAQSection onBack={() => setOpen(null)} />
      )}

      {/* LUMi (future) */}
      {open === "lumi" && (
        <div className="support-sheet">
          <header className="sheet-header">
            <button onClick={() => setOpen(null)}>← Back</button>
            <h2>LUMi Care</h2>
            <p>Calm, thoughtful guidance from LUMi.</p>
          </header>

          <div className="sheet-body">
            <div className="placeholder">
              LUMi support experience will be added here.
            </div>
          </div>
        </div>
      )}

      {/* CARE TEAM — CONNECTED ✅ */}
      {open === "care" && (
        <CareTeamSection onBack={() => setOpen(null)} />
      )}
    </main>
  );
}
