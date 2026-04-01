"use client";

import { useEffect, useState } from "react";
import DynamicFields from "./DynamicFields";

interface Props {
  onCreated: () => void;
}

export default function AddMethodForm({ onCreated }: Props) {
  const [country, setCountry] = useState("");
  const [rule, setRule] = useState<any>(null);
  const [scope, setScope] = useState("local");
  const [formData, setFormData] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);

  async function fetchRule(code: string) {
    try {
      const res = await fetch(
        `https://api.dolrise.com/api/wallet/payout/country-rule/${code}`,
        { credentials: "include" }
      );
      const data = await res.json();
      if (data.success) {
        setRule(data.data);
      }
    } catch (err) {
      console.error("Rule fetch error", err);
    }
  }

  function handleCountryChange(value: string) {
    setCountry(value);
    fetchRule(value);
  }

  function handleChange(field: string, value: string) {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const res = await fetch(
        "https://api.dolrise.com/api/wallet/payout-method",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            country_code: country,
            payout_scope: scope,
            method_type: "bank",
            ...formData,
          }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setCountry("");
        setFormData({});
        setRule(null);
        onCreated();
      }
    } catch (err) {
      console.error("Create error", err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="pm-card">
      <h2>Add New Method</h2>

      <select
        value={country}
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="">Select Country</option>
        <option value="NG">Nigeria</option>
        <option value="US">United States</option>
        <option value="GB">United Kingdom</option>
        <option value="IN">India</option>
        <option value="JP">Japan</option>
        <option value="AE">UAE</option>
      </select>

      {rule && (
        <>
          {rule.supports_international && (
            <select
              value={scope}
              onChange={(e) => setScope(e.target.value)}
            >
              <option value="local">Local</option>
              <option value="international">
                International
              </option>
            </select>
          )}

          <DynamicFields
            requiredFields={rule.required_fields}
            onChange={handleChange}
          />

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="pm-submit"
          >
            {submitting ? "Saving..." : "Add Method"}
          </button>
        </>
      )}
    </div>
  );
}
