"use client";

import { useState } from "react";
import { checkImageQuality } from "../../utils/imageQuality";

export default function KycIdUpload({
  label,
  onReady,
}: {
  label: string;
  onReady: (file: File) => void;
}) {
  const [preview, setPreview] =
    useState<string | null>(null);
  const [error, setError] =
    useState<string | null>(null);

  const handleFile = async (
    file: File
  ) => {
    const quality =
      await checkImageQuality(file);

    if (!quality.ok) {
      setError(quality.reason || "Bad image");
      return;
    }

    setError(null);
    setPreview(
      URL.createObjectURL(file)
    );
    onReady(file);
  };

  return (
    <div className="kyc-card">
      <h2>{label}</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleFile(
              e.target.files[0]
            );
          }
        }}
      />

      {error && (
        <p className="kyc-error">
          {error}
        </p>
      )}

      {preview && (
        <img
          src={preview}
          alt="ID preview"
          className="kyc-preview"
        />
      )}
    </div>
  );
}
