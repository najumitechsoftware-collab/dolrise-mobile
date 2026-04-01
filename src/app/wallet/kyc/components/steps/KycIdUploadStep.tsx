"use client";

import { useEffect, useState } from "react";
import KycIdUpload from "./KycIdUpload";
import { useKyc } from "../../context/KycContext";
import "../../styles/kyc-id.css";

export default function KycIdUploadStep({
  onNext,
}: {
  onNext: () => void;
}) {
  const { update } = useKyc();

  const [idType, setIdType] = useState<
    "passport" | "national_id" | "driver_license" | ""
  >("");

  const [idNumber, setIdNumber] = useState("");
  const [frontUploaded, setFrontUploaded] = useState(false);
  const [backUploaded, setBackUploaded] = useState(false);
  const [error, setError] = useState("");

  const requiresBack =
    idType === "national_id" || idType === "driver_license";

  /* =====================================================
     RESET STATE WHEN ID TYPE CHANGES
  ===================================================== */
  useEffect(() => {
    setFrontUploaded(false);
    setBackUploaded(false);

    update({
      id_type: undefined,
      id_number: undefined,
      id_front_url: undefined,
      id_back_url: undefined,
    });
  }, [idType]);

  /* =====================================================
     CONTINUE VALIDATION
  ===================================================== */
  function handleContinue() {
    if (!idType) {
      setError("Please select ID type.");
      return;
    }

    if (!idNumber.trim()) {
      setError("Please enter your ID number.");
      return;
    }

    if (!frontUploaded) {
      setError("Please upload the front of your ID.");
      return;
    }

    if (requiresBack && !backUploaded) {
      setError("Please upload the back of your ID.");
      return;
    }

    setError("");

    update({
      id_type: idType,
      id_number: idNumber.trim(),
    });

    onNext();
  }

  /* =====================================================
     UI
  ===================================================== */
  return (
    <div className="kyc-card kyc-id">
      <h2>Government ID</h2>

      {/* ================= ID TYPE ================= */}
      <label className="kyc-label">ID type</label>
      <select
        className="kyc-input"
        value={idType}
        onChange={(e) => setIdType(e.target.value as any)}
      >
        <option value="">Select ID type</option>
        <option value="passport">Passport</option>
        <option value="national_id">National ID</option>
        <option value="driver_license">Driver’s license</option>
      </select>

      {/* ================= ID NUMBER ================= */}
      {idType && (
        <>
          <label className="kyc-label">
            {idType === "national_id"
              ? "National ID / NIN"
              : idType === "driver_license"
              ? "Driver license number"
              : "Passport number"}
          </label>

          <input
            className="kyc-input"
            placeholder="Enter ID number"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
          />
        </>
      )}

      {/* ================= FRONT UPLOAD ================= */}
      {idType && (
        <KycIdUpload
          label="Upload ID (front)"
          onReady={() => {
            setFrontUploaded(true);
            update({
              id_front_url: "TEMP_FRONT_URL",
            });
          }}
        />
      )}

      {/* ================= BACK UPLOAD (IF REQUIRED) ================= */}
      {requiresBack && (
        <KycIdUpload
          label="Upload ID (back)"
          onReady={() => {
            setBackUploaded(true);
            update({
              id_back_url: "TEMP_BACK_URL",
            });
          }}
        />
      )}

      {/* ================= ERROR ================= */}
      {error && <p className="kyc-error">{error}</p>}

      <button className="kyc-primary" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
}
