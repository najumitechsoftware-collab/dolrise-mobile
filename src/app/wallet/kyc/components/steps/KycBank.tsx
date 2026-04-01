"use client";

import { useEffect, useState } from "react";
import { useKyc } from "../../context/KycContext";
import { COUNTRIES, Country } from "../../data/countries";
import "../../styles/kyc-bank.css";

interface Props {
  onNext: () => void;
}

export default function KycBank({ onNext }: Props) {
  const { update } = useKyc();

  /* ===============================
     STATE
  =============================== */
  const [accountName, setAccountName] = useState("Loading…");
  const [country, setCountry] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [iban, setIban] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [error, setError] = useState("");

  /* ===============================
     👤 LOAD ACCOUNT HOLDER NAME
     SOURCE: rise_accounts
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
          setAccountName(profile.full_name);
        } else {
          setAccountName("Account holder");
        }
      } catch {
        setAccountName("Account holder");
      }
    }
    loadUser();
  }, []);

  /* ===============================
     VALIDATION
  =============================== */
  function hasAnyBankIdentifier() {
    return (
      accountNumber.trim() ||
      iban.trim() ||
      routingNumber.trim()
    );
  }

  function isValidIban(value: string) {
    return /^[A-Z0-9]{8,34}$/i.test(value);
  }

  /* ===============================
     CONTINUE
  =============================== */
  function handleContinue() {
    if (!country) {
      setError("Please select your country");
      return;
    }

    if (!bankName.trim()) {
      setError("Please enter your bank name");
      return;
    }

    if (!hasAnyBankIdentifier()) {
      setError(
        "Please provide at least one bank identifier (account number, IBAN, or routing number)"
      );
      return;
    }

    if (iban && !isValidIban(iban)) {
      setError("Invalid IBAN format");
      return;
    }

    setError("");

    /* ===============================
       SAVE TO KYC CONTEXT
    =============================== */
    update({
      country,
      bank_name: bankName,
      account_number: accountNumber || undefined,
      iban: iban || undefined,
      routing_number: routingNumber || undefined,
      swift_code: swiftCode || undefined,
    });

    onNext();
  }

  /* ===============================
     UI
  =============================== */
  return (
    <div className="kyc-card kyc-bank">
      <h2>Bank details</h2>

      <p className="kyc-subtitle">
        This is where your earnings will be sent. Your details are reviewed securely.
      </p>

      {/* ACCOUNT HOLDER */}
      <label className="kyc-label">Account holder name</label>
      <input
        value={accountName}
        disabled
        className="kyc-input kyc-readonly"
      />

      <p className="kyc-hint">
        This name comes from your DolRise account and can’t be changed.
      </p>

      {/* COUNTRY */}
      <label className="kyc-label">Country</label>
      <select
        className="kyc-input"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      >
        <option value="">Select country</option>
        {COUNTRIES.map((c: Country) => (
          <option key={c.code} value={c.code}>
            {c.label}
          </option>
        ))}
      </select>

      {/* BANK NAME */}
      <label className="kyc-label">Bank name</label>
      <input
        className="kyc-input"
        placeholder="e.g. Access Bank, Chase, HSBC"
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}
      />

      {/* ACCOUNT NUMBER */}
      <label className="kyc-label">
        Account number <span className="kyc-optional">(optional)</span>
      </label>
      <input
        className="kyc-input"
        placeholder="Local bank account number"
        value={accountNumber}
        onChange={(e) =>
          setAccountNumber(e.target.value.replace(/\s/g, ""))
        }
      />

      {/* IBAN */}
      <label className="kyc-label">
        IBAN <span className="kyc-optional">(optional)</span>
      </label>
      <input
        className="kyc-input"
        placeholder="International Bank Account Number"
        value={iban}
        onChange={(e) =>
          setIban(e.target.value.replace(/\s/g, "").toUpperCase())
        }
      />

      {/* ROUTING NUMBER */}
      <label className="kyc-label">
        Routing number <span className="kyc-optional">(optional)</span>
      </label>
      <input
        className="kyc-input"
        placeholder="Routing / sort code"
        value={routingNumber}
        onChange={(e) =>
          setRoutingNumber(e.target.value.replace(/\s/g, ""))
        }
      />

      {/* SWIFT */}
      <label className="kyc-label">
        SWIFT / BIC <span className="kyc-optional">(optional)</span>
      </label>
      <input
        className="kyc-input"
        placeholder="e.g. BOFAUS3N"
        value={swiftCode}
        onChange={(e) =>
          setSwiftCode(e.target.value.toUpperCase())
        }
      />

      {error && <p className="kyc-error">{error}</p>}

      <button className="kyc-primary" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
}
