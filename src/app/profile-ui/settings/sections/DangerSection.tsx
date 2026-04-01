"use client";
import { useState } from "react";
import "../Settings.css";

import DeactivateSheet from "./DeactivateSheet";
import DeleteSheet from "./delete/DeleteSheet";

export default function DangerSection({
  onBack,
}: {
  onBack: () => void;
}) {
  const [activeSheet, setActiveSheet] = useState<
    "none" | "deactivate" | "delete"
  >("none");

  /* =========================================
     IF DEACTIVATE OPEN
  ========================================= */
  if (activeSheet === "deactivate") {
    return (
      <DeactivateSheet
        onClose={() => setActiveSheet("none")}
      />
    );
  }

  /* =========================================
     IF DELETE OPEN
  ========================================= */
  if (activeSheet === "delete") {
    return (
      <DeleteSheet
        onClose={() => setActiveSheet("none")}
      />
    );
  }

  /* =========================================
     DEFAULT DANGER ZONE VIEW
  ========================================= */
  return (
    <div className="settings-sheet danger">
      <header className="sheet-header">
        <button onClick={onBack}>← Back</button>
        <h2>Danger Zone</h2>
        <p>High-risk actions</p>
      </header>

      <div className="sheet-body">

        <div className="danger-card">
          <h3>Deactivate account</h3>
          <p>
            Temporarily hide your profile and content.
            You can reactivate anytime.
          </p>
          <button
            className="danger-outline-btn"
            onClick={() => setActiveSheet("deactivate")}
          >
            Deactivate
          </button>
        </div>

        <div className="danger-card extreme">
          <h3>Delete account</h3>
          <p>
            Schedule permanent deletion.
            You will have 30 days to cancel.
          </p>
          <button
            className="danger-btn"
            onClick={() => setActiveSheet("delete")}
          >
            Delete Account
          </button>
        </div>

      </div>
    </div>
  );
}
