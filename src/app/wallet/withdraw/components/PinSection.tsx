"use client";

import { useState } from "react";

interface Props {
  transactionPin: string;
  setTransactionPin: (v: string) => void;
}

export default function PinSection({
  transactionPin,
  setTransactionPin,
}: Props) {
  const [show, setShow] = useState(false);
  const [touched, setTouched] = useState(false);

  const isNumeric = /^\d+$/.test(transactionPin);
  const isValidLength =
    transactionPin.length === 6 ||
    transactionPin.length === 8;

  const isValid =
    transactionPin.length > 0 &&
    isNumeric &&
    isValidLength;

  return (
    <div className="withdraw-card">

      <div className="card-header">
        <h2>Security Verification</h2>
        <span className="security-badge">
          Required
        </span>
      </div>

      <div className="withdraw-field">
        <label>Transaction PIN</label>

        <div className="input-group">
          <input
            type={show ? "text" : "password"}
            value={transactionPin}
            onChange={(e) => {
              const value = e.target.value;

              // allow only numbers
              if (/^\d*$/.test(value)) {
                setTransactionPin(value);
              }
            }}
            onBlur={() => setTouched(true)}
            placeholder="Enter 6 or 8 digit PIN"
            maxLength={8}
            className={
              touched && !isValid
                ? "input-error"
                : ""
            }
          />

          <button
            type="button"
            onClick={() => setShow(!show)}
            className="toggle-btn"
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>

        {touched && !isValid && (
          <p className="form-error">
            PIN must be 6 or 8 numeric digits.
          </p>
        )}
      </div>

      <p className="withdraw-soft-text">
        This PIN authorizes secure withdrawals
        and protects your funds.
      </p>

    </div>
  );
}
