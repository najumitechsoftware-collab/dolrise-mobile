"use client";

import { useEffect, useState } from "react";
import { KycStep } from "../page";
import { useKyc } from "../context/KycContext";

import KycIntro from "./steps/KycIntro";
import KycDetails from "./steps/KycDetails";
import KycBank from "./steps/KycBank";
import KycIdUploadStep from "./steps/KycIdUploadStep";
import KycSelfieUpload from "./steps/KycSelfieUpload";
import KycReview from "./steps/KycReview";

/* =========================================================
   KYC STEPPER – PRODUCTION VERSION
   - Real backend submit
   - Proper loading & error handling
   - Auto transition processing → result
========================================================= */

interface Props {
  step: KycStep;
  onStepChange: (s: KycStep) => void;
}

export default function KycStepper({ step, onStepChange }: Props) {
  const { data } = useKyc();

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  /* =========================================================
     AUTO TRANSITION: processing → result
  ========================================================= */
  useEffect(() => {
    if (step === "processing") {
      const timer = setTimeout(() => {
        onStepChange("result");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step, onStepChange]);

  /* =========================================================
     REAL SUBMIT FUNCTION
  ========================================================= */
  async function handleSubmit() {
    try {
      setSubmitting(true);
      setSubmitError("");

      const res = await fetch(
        "https://api.dolrise.com/api/wallet/kyc/submit",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "SUBMIT_FAILED");
      }

      onStepChange("processing");
    } catch (err: any) {
      console.error("KYC submit error:", err);
      setSubmitError(
        "Unable to submit verification. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  /* =========================================================
     STEP SWITCH
  ========================================================= */
  switch (step) {
    case "intro":
      return <KycIntro onNext={() => onStepChange("details")} />;

    case "details":
      return <KycDetails onNext={() => onStepChange("bank")} />;

    case "bank":
      return <KycBank onNext={() => onStepChange("id")} />;

    case "id":
      return (
        <KycIdUploadStep
          onNext={() => onStepChange("face")}
        />
      );

    case "face":
      return (
        <KycSelfieUpload
          onNext={() => onStepChange("review")}
        />
      );

    case "review":
      return (
        <div className="kyc-card">
          <h2>Review & submit</h2>

          <p>
            Please confirm your details. Once submitted,
            our team will carefully review your information.
          </p>

          {submitError && (
            <p className="kyc-error">{submitError}</p>
          )}

          <button
            className="kyc-primary"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting
              ? "Submitting..."
              : "Submit verification"}
          </button>
        </div>
      );

    case "processing":
      return (
        <div className="kyc-card">
          <h2>Verification in progress</h2>
          <p>
            Thanks for your patience 🤍 <br />
            We’re securely reviewing your documents.
          </p>
        </div>
      );

    case "result":
      return (
        <div className="kyc-card">
          <h2>Verification submitted</h2>
          <p>
            Your verification is now under review.
            This usually takes{" "}
            <strong>5–7 days</strong>.
          </p>

          <p
            style={{
              marginTop: 10,
              color: "#6b7280",
            }}
          >
            We’ll notify you as soon as it’s completed.
          </p>
        </div>
      );

    default:
      return (
        <div className="kyc-card">
          <h2>KYC error</h2>
          <p>Something went wrong.</p>
          <button
            className="kyc-primary"
            onClick={() => onStepChange("intro")}
          >
            Restart verification
          </button>
        </div>
      );
  }
}
