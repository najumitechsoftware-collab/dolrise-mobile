"use client";

import { useState } from "react";
import "./ProtectionSection.css";

import ReactivateAccountSheet from "./ReactivateAccountSheet";
import CancelDeletionSheet from "./CancelDeletionSheet";

type View = "main" | "reactivate" | "cancel";

export default function ProtectionSection({
  onBack,
}: {
  onBack: () => void;
}) {
  const [view, setView] = useState<View>("main");

  if (view === "reactivate") {
    return (
      <ReactivateAccountSheet
        onBack={() => setView("main")}
      />
    );
  }

  if (view === "cancel") {
    return (
      <CancelDeletionSheet
        onBack={() => setView("main")}
      />
    );
  }

  return (
    <div className="protection-overlay">
      <div className="protection-sheet slide-up">

        <header className="sheet-header">
          <button onClick={onBack}>← Back</button>
          <h3>Account Protection</h3>
        </header>

        <div className="protection-actions">

          <button
            className="protection-card"
            onClick={() => setView("reactivate")}
          >
            <h4>Reactivate Your Account</h4>
            <p>
              Restore access if your account
              is currently deactivated.
            </p>
          </button>

          <button
            className="protection-card danger"
            onClick={() => setView("cancel")}
          >
            <h4>Cancel Deletion Request</h4>
            <p>
              Stop permanent deletion if your
              account is scheduled for removal.
            </p>
          </button>

        </div>
      </div>
    </div>
  );
}
