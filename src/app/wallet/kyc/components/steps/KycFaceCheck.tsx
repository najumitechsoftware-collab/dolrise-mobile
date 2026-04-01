"use client";

import { useState } from "react";
import KycIdUpload from "./KycIdUpload";
import "../../styles/kyc-face.css";

export default function KycFaceCheck({
  onAutoComplete,
}: {
  onAutoComplete: () => void;
}) {
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState("");

  function handleContinue() {
    if (!uploaded) {
      setError("Please upload a clear selfie to continue.");
      return;
    }
    setError("");
    onAutoComplete();
  }

  return (
    <div className="kyc-card">
      <h2>Selfie check</h2>

      <p className="kyc-subtitle">
        Take or upload a clear photo of yourself.  
        This helps us confirm that the documents belong to you.
      </p>

      {/* SELFIE UPLOAD */}
      <KycIdUpload
        label="Upload selfie"
        onReady={() => setUploaded(true)}
      />

      {/* EMOTIONAL MESSAGE */}
      <p className="kyc-hint">
        Make sure your face is clearly visible, in good lighting, and
        without sunglasses or filters.
      </p>

      {error && <p className="kyc-error">{error}</p>}

      <button
        className="kyc-primary"
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
}
