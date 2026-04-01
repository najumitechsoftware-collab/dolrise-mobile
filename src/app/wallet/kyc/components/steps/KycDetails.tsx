"use client";

import { useEffect, useState } from "react";
import { COUNTRIES, Country } from "../../data/countries";
import { useKyc } from "../../context/KycContext";
import "../../styles/kyc-details.css";

export default function KycDetails({
  onNext,
}: {
  onNext: () => void;
}) {
  const { update } = useKyc(); // ✅ CONTEXT

  const [fullName, setFullName] = useState("Loading…");
  const [country, setCountry] = useState<string>("");
  const [error, setError] = useState("");

  /* ===============================
     👤 LOAD USER FROM RISE_ACCOUNTS
     SOURCE OF TRUTH FOR FULL NAME
  =============================== */
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/profile/me/view", {
          credentials: "include",
        });
        const json = await res.json();
        const profile = json?.profile || json?.data;

        if (profile?.full_name) {
          setFullName(profile.full_name);
        } else {
          setFullName("Unknown user");
        }
      } catch (err) {
        console.error("KYC user load error:", err);
        setFullName("Unknown user");
      }
    }

    loadUser();
  }, []);

  /* ===============================
     ➡️ CONTINUE
  =============================== */
  function handleContinue() {
    if (!country) {
      setError("Please select your country");
      return;
    }

    // ✅ SAVE TO KYC CONTEXT
    update({ country });

    setError("");
    onNext();
  }

  return (
    <div className="kyc-card kyc-details">
      <h2>Your details</h2>

      <p className="kyc-subtitle">
        This information is used to verify your identity and keep your account
        secure.
      </p>

      {/* FULL NAME – LOCKED */}
      <label className="kyc-label">Full legal name</label>
      <input
        value={fullName}
        disabled
        className="kyc-input kyc-readonly"
      />
      <p className="kyc-hint">
        This name comes from your DolRise account and can’t be changed here.
      </p>

      {/* COUNTRY – USER SELECTS */}
      <label className="kyc-label">Country</label>
      <select
        className="kyc-input"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      >
        <option value="">Select your country</option>
        {COUNTRIES.map((c: Country) => (
          <option key={c.code} value={c.code}>
            {c.label}
          </option>
        ))}
      </select>

      {error && <p className="kyc-error">{error}</p>}

      <button className="kyc-primary" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
}
