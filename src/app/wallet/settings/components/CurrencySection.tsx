"use client";

import { useEffect, useState } from "react";

interface Props {
  preferredCurrency: string;
  setPreferredCurrency: (v: string) => void;
}

interface RateResponse {
  fiat_per_nc: number;
}

export default function CurrencySection({
  preferredCurrency,
  setPreferredCurrency,
}: Props) {
  const [rate, setRate] = useState<number | null>(null);
  const [loadingRate, setLoadingRate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  /* =====================================================
     🔁 LOAD ACTIVE RATE FROM BACKEND
  ===================================================== */
  useEffect(() => {
    async function loadRate() {
      try {
        setLoadingRate(true);
        setRate(null);

        const res = await fetch(
          `https://api.dolrise.com/api/exchange/rates/${preferredCurrency}`,
          { credentials: "include" }
        );

        const data = await res.json();

        if (data?.success) {
          setRate(data.data.fiat_per_nc);
        }
      } catch (err) {
        console.error("Rate load error:", err);
      } finally {
        setLoadingRate(false);
      }
    }

    if (preferredCurrency) {
      loadRate();
    }
  }, [preferredCurrency]);

  /* =====================================================
     💾 SAVE PREFERRED CURRENCY
  ===================================================== */
  async function handleSaveCurrency() {
    try {
      setSaving(true);
      setMessage(null);

      const res = await fetch(
        "https://api.dolrise.com/api/wallet/settings/currency",
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currency: preferredCurrency,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data?.success) {
        throw new Error("Failed to update currency");
      }

      setMessage("Currency updated successfully.");
    } catch (err) {
      console.error(err);
      setMessage("Unable to update currency.");
    } finally {
      setSaving(false);
    }
  }

  /* =====================================================
     💱 PREVIEW CONVERSION
  ===================================================== */
  const samplePreview = rate
    ? (100 * rate).toLocaleString()
    : null;

  return (
    <div className="wallet-card">

      <div className="card-header">
        <h2>Payout Currency & Exchange</h2>
      </div>

      {/* CURRENCY SELECT */}
      <div className="currency-select-row">
        <label>Select Payout Currency</label>

        <select
          value={preferredCurrency}
          onChange={(e) =>
            setPreferredCurrency(e.target.value)
          }
        >
          {/* 50+ Global Currencies */}
          <option value="NGN">NGN — Nigeria</option>
          <option value="USD">USD — United States</option>
          <option value="EUR">EUR — European Union</option>
          <option value="GBP">GBP — United Kingdom</option>
          <option value="INR">INR — India</option>
          <option value="JPY">JPY — Japan</option>
          <option value="ZAR">ZAR — South Africa</option>
          <option value="SGD">SGD — Singapore</option>
          <option value="AED">AED — UAE</option>
          <option value="BRL">BRL — Brazil</option>
          <option value="CAD">CAD — Canada</option>
          <option value="AUD">AUD — Australia</option>
          <option value="CHF">CHF — Switzerland</option>
          <option value="CNY">CNY — China</option>
          <option value="HKD">HKD — Hong Kong</option>
          <option value="KRW">KRW — South Korea</option>
          <option value="MYR">MYR — Malaysia</option>
          <option value="THB">THB — Thailand</option>
          <option value="IDR">IDR — Indonesia</option>
          <option value="PHP">PHP — Philippines</option>
          <option value="MXN">MXN — Mexico</option>
          <option value="ARS">ARS — Argentina</option>
          <option value="CLP">CLP — Chile</option>
          <option value="COP">COP — Colombia</option>
          <option value="TRY">TRY — Turkey</option>
          <option value="EGP">EGP — Egypt</option>
          <option value="KES">KES — Kenya</option>
          <option value="GHS">GHS — Ghana</option>
          <option value="PKR">PKR — Pakistan</option>
          <option value="BDT">BDT — Bangladesh</option>
          <option value="VND">VND — Vietnam</option>
          <option value="PLN">PLN — Poland</option>
          <option value="SEK">SEK — Sweden</option>
          <option value="NOK">NOK — Norway</option>
          <option value="DKK">DKK — Denmark</option>
          <option value="HUF">HUF — Hungary</option>
          <option value="CZK">CZK — Czech Republic</option>
          <option value="ILS">ILS — Israel</option>
          <option value="QAR">QAR — Qatar</option>
          <option value="KWD">KWD — Kuwait</option>
          <option value="SAR">SAR — Saudi Arabia</option>
          <option value="RON">RON — Romania</option>
          <option value="UAH">UAH — Ukraine</option>
          <option value="MAD">MAD — Morocco</option>
          <option value="TWD">TWD — Taiwan</option>
          <option value="NZD">NZD — New Zealand</option>
          <option value="LKR">LKR — Sri Lanka</option>
          <option value="BHD">BHD — Bahrain</option>
          <option value="OMR">OMR — Oman</option>
        </select>

        <button
          className="save-currency-btn"
          onClick={handleSaveCurrency}
          disabled={saving}
        >
          {saving ? "Saving…" : "Save Currency"}
        </button>
      </div>

      {/* RATE DISPLAY */}
      <div className="exchange-preview-box">
        {loadingRate && (
          <span>Loading exchange rate…</span>
        )}

        {!loadingRate && rate && (
          <>
            <div>
              <strong>1 NC = {rate.toLocaleString()} {preferredCurrency}</strong>
            </div>

            <div className="preview-conversion">
              Example: 100 NC ≈ {samplePreview} {preferredCurrency}
            </div>
          </>
        )}
      </div>

      {/* SYSTEM NOTE */}
      <p className="soft-note">
        Exchange rates are determined by DolRise’s
        internal liquidity engine and may adjust
        periodically based on global currency movement.
      </p>

      {message && (
        <div className="currency-message">
          {message}
        </div>
      )}
    </div>
  );
}
