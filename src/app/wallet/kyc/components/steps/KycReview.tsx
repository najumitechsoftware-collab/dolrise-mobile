"use client";

import { useState } from "react";
import { useKyc } from "../../context/KycContext";

export default function KycReview({
  onStepChange,
}: {
  onStepChange: (s: any) => void;
}) {
  const { data } = useKyc();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);
      setError("");

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
      setError("Unable to submit verification. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="kyc-card">
      <h2>Review & submit</h2>
      <p>
        Please confirm your details. Once submitted,
        our team will carefully review your information.
      </p>

      {error && <p className="kyc-error">{error}</p>}

      <button
        className="kyc-primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit verification"}
      </button>
    </div>
  );
}
