"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./new-method.css";

interface CountryRule {
  country_code: string;
  supports_local: boolean;
  supports_international: boolean;
  required_fields: string;
}

export default function NewPaymentMethodPage() {
  const router = useRouter();

  const [countries, setCountries] = useState<CountryRule[]>([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [scope, setScope] = useState<"local" | "international">("local");

  // Manual Fields
  const [bankName, setBankName] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [iban, setIban] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= LOAD COUNTRIES ================= */

  useEffect(() => {
    async function loadCountries() {
      try {
        const res = await fetch(
          "https://api.dolrise.com/api/wallet/payout/countries",
          { credentials: "include" }
        );

        const data = await res.json();

        if (data?.success) {
          setCountries(data.data);
        }
      } catch {
        console.error("Failed to load countries");
      }
    }

    loadCountries();
  }, []);

  /* ================= VALIDATION ================= */

  const isValid =
    selectedCountry &&
    bankName.trim().length > 2 &&
    bankCode.trim().length > 1 &&
    accountNumber.trim().length > 4 &&
    accountName.trim().length > 2;

  /* ================= SUBMIT ================= */

  async function handleSubmit() {
    if (!isValid) {
      setError("Please fill all required fields correctly");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://api.dolrise.com/api/wallet/payout/method",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            method_type: "bank",
            payout_scope: scope,
            country_code: selectedCountry,
            bank_name: bankName,
            bank_code: bankCode,
            account_number: accountNumber,
            account_name: accountName,
            iban: iban || null,
            swift_code: swiftCode || null,
            routing_number: routingNumber || null,
          }),
        }
      );

      const data = await res.json();

      if (data?.success) {
        router.push("/wallet/settings/payment-methods");
      } else {
        setError(data?.error || "Failed to save method");
      }
    } catch {
      setError("Server error occurred");
    } finally {
      setLoading(false);
    }
  }

  /* ================= UI ================= */

  return (
    <div className="new-method-container">
      <h1>Add Payout Method</h1>

      <div className="new-method-card">

        {/* Country */}
        <div className="form-group">
          <label>Country</label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c.country_code} value={c.country_code}>
                {c.country_code}
              </option>
            ))}
          </select>
        </div>

        {/* Scope */}
        {selectedCountry && (
          <div className="form-group">
            <label>Payout Type</label>
            <select
              value={scope}
              onChange={(e) =>
                setScope(e.target.value as "local" | "international")
              }
            >
              <option value="local">Local</option>
              <option value="international">International</option>
            </select>
          </div>
        )}

        {/* Bank Name */}
        <div className="form-group">
          <label>Bank Name</label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
        </div>

        {/* Bank Code */}
        <div className="form-group">
          <label>Bank Code</label>
          <input
            type="text"
            value={bankCode}
            onChange={(e) => setBankCode(e.target.value)}
          />
        </div>

        {/* Account Number */}
        <div className="form-group">
          <label>Account Number</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) =>
              setAccountNumber(e.target.value.replace(/\s/g, ""))
            }
          />
        </div>

        {/* Account Name */}
        <div className="form-group">
          <label>Account Name</label>
          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
        </div>

        {/* IBAN */}
        <div className="form-group">
          <label>IBAN (Optional)</label>
          <input
            type="text"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
          />
        </div>

        {/* SWIFT */}
        <div className="form-group">
          <label>SWIFT Code (Optional)</label>
          <input
            type="text"
            value={swiftCode}
            onChange={(e) => setSwiftCode(e.target.value)}
          />
        </div>

        {/* Routing */}
        <div className="form-group">
          <label>Routing Number (Optional)</label>
          <input
            type="text"
            value={routingNumber}
            onChange={(e) => setRoutingNumber(e.target.value)}
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={!isValid || loading}
        >
          {loading ? "Saving..." : "Save Method"}
        </button>

      </div>
    </div>
  );
}
