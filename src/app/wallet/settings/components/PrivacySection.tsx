import { useState } from "react";

export default function PrivacySection() {
  const [hideBalance, setHideBalance] =
    useState(false);

  return (
    <div className="wallet-card">
      <h2>Privacy & Display</h2>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={hideBalance}
          onChange={(e) =>
            setHideBalance(e.target.checked)
          }
        />
        Hide wallet balance
      </label>
    </div>
  );
}
