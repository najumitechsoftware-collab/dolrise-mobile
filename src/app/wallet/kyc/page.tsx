"use client";

import { useState } from "react";
import KycStepper from "./components/KycStepper";
import { KycProvider } from "./context/KycContext";
import "./styles/kyc.css";

/* ===============================
   KYC FLOW STEPS
=============================== */
export type KycStep =
  | "intro"
  | "details"
  | "bank"
  | "id"
  | "face"        // 📸 selfie upload (no liveness for now)
  | "review"
  | "processing"
  | "result";

export default function KycPage() {
  const [step, setStep] = useState<KycStep>("intro");

  return (
    <KycProvider>
      <div className="kyc-page">
        <KycStepper
          step={step}
          onStepChange={setStep}
        />
      </div>
    </KycProvider>
  );
}
