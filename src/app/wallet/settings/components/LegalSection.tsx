"use client";

import Link from "next/link";

export default function LegalSection() {
  return (
    <div className="wallet-card legal-card">

      <h2 className="legal-title">
        Policy & Legal Center
      </h2>

      <p className="legal-subtext">
        Review official payout policies, compliance notices, 
        and financial terms governing withdrawals.
      </p>

      <div className="legal-links">

        {/* ===============================
            Payout Terms
        =============================== */}
        <Link
          href="/legal/terms-of-payout"
          className="legal-link-item"
        >
          <div>
            <strong>Payout Terms</strong>
            <p>Official withdrawal terms & conditions</p>
          </div>
          <span className="legal-arrow">→</span>
        </Link>

        {/* ===============================
            Payout Privacy Policy
        =============================== */}
        <Link
          href="/legal/payout-privacy"
          className="legal-link-item"
        >
          <div>
            <strong>Payout Privacy Policy</strong>
            <p>How payout data is collected & protected</p>
          </div>
          <span className="legal-arrow">→</span>
        </Link>

        {/* ===============================
            AML Notice (Future Ready)
        =============================== */}
        <Link
          href="/legal/aml-compliance"
          className="legal-link-item"
        >
          <div>
            <strong>AML & Compliance Notice</strong>
            <p>Anti-Money Laundering & regulatory standards</p>
          </div>
          <span className="legal-arrow">→</span>
        </Link>

      </div>

      <div className="legal-footer-note">
        DolRise Financial Infrastructure • 
        Enterprise-grade wallet architecture • 
        Global compliant payout system
      </div>

    </div>
  );
}
