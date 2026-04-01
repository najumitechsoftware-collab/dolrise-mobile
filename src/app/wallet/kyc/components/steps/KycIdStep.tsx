"use client";

import { useState } from "react";
import KycIdType from "./KycIdType";
import KycIdUpload from "./KycIdUpload";

export default function KycIdStep({
  onComplete,
}: {
  onComplete: (data: {
    idType: string;
    front: File;
    back?: File;
  }) => void;
}) {
  const [idType, setIdType] =
    useState<any>(null);
  const [front, setFront] =
    useState<File | null>(null);
  const [back, setBack] =
    useState<File | null>(null);

  if (!idType) {
    return (
      <KycIdType
        value={idType}
        onChange={setIdType}
      />
    );
  }

  if (!front) {
    return (
      <KycIdUpload
        label="Upload ID (front)"
        onReady={setFront}
      />
    );
  }

  if (
    idType !== "passport" &&
    !back
  ) {
    return (
      <KycIdUpload
        label="Upload ID (back)"
        onReady={setBack}
      />
    );
  }

  // ✅ AUTO NEXT
  onComplete({
    idType,
    front,
    back: back || undefined,
  });

  return null;
}
