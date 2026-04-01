"use client";

interface Props {
  router: any;
}

export default function SecuritySection({ router }: Props) {
  return (
    <div className="wallet-card security-overview-card">

      <div className="security-header">
        <div>
          <h2>Security & Access Control</h2>
          <p className="security-sub">
            Protect wallet access and withdrawals.
          </p>
        </div>

        <button
          className="security-open-btn"
          onClick={() =>
            router.push("/wallet/settings/security")
          }
        >
          Manage
        </button>
      </div>

      <div className="security-summary">

        <div className="security-item">
          <span className="security-label">
            Access Protection
          </span>
          <span className="security-desc">
            PIN, password or pattern
          </span>
        </div>

        <div className="security-item">
          <span className="security-label">
            Transaction PIN
          </span>
          <span className="security-desc">
            Required for withdrawals
          </span>
        </div>

        <div className="security-item">
          <span className="security-label">
            Auto Lock
          </span>
          <span className="security-desc">
            5 / 15 / 30 min session
          </span>
        </div>

      </div>

    </div>
  );
}
