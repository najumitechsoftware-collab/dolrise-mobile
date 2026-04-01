"use client";

import { useRef, useState } from "react";
import { useKyc } from "../../context/KycContext";
import "../../styles/kyc-face.css";

export default function KycSelfieUpload({
  onNext,
}: {
  onNext: () => void;
}) {
  const { update } = useKyc();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  function handleFile(file?: File) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file");
      return;
    }

    const url = URL.createObjectURL(file);

    setPreview(url);
    setError("");

    // ✅ SAVE TO KYC CONTEXT (manual fallback)
    update({
      selfie_url: url,
    });
  }

  function handleContinue() {
    if (!preview) {
      setError("Please upload a clear selfie to continue");
      return;
    }

    onNext();
  }

  return (
    <div className="kyc-card">
      <h2>Selfie verification</h2>

      <p className="kyc-subtitle">
        Take a clear photo of yourself. This is used only if automated face
        verification is unavailable.
      </p>

      {!preview && (
        <>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            capture="user"
            style={{ display: "none" }}
            onChange={(e) =>
              handleFile(e.target.files?.[0])
            }
          />

          <button
            className="kyc-primary"
            onClick={() => inputRef.current?.click()}
          >
            Take / upload selfie
          </button>
        </>
      )}

      {preview && (
        <>
          <img
            src={preview}
            alt="Selfie preview"
            style={{
              width: "100%",
              maxWidth: 260,
              borderRadius: 12,
              marginTop: 12,
            }}
          />

          <button
            className="kyc-primary"
            style={{ marginTop: 16 }}
            onClick={handleContinue}
          >
            Continue
          </button>
        </>
      )}

      {error && (
        <p className="kyc-error" style={{ marginTop: 10 }}>
          {error}
        </p>
      )}
    </div>
  );
}
