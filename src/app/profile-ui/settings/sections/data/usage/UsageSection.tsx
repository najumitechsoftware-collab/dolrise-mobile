"use client";

import "./UsageSection.css";

export default function UsageSection() {
  return (
    <div className="usage-container">
      <div className="usage-card">

        <h4>Why We Collect Data</h4>

        <p className="usage-intro">
          Transparency builds trust. Below is a clear explanation of what
          information we collect and why it is necessary to operate DolRise
          safely, securely, and responsibly.
        </p>

        {/* ================= ACCOUNT DATA ================= */}

        <div className="usage-block">
          <h5>1. Account Information</h5>
          <p>
            When you create an account, we collect essential details such as
            your email and profile information. This allows us to:
          </p>
          <ul>
            <li>Verify and authenticate your identity</li>
            <li>Protect your account from unauthorized access</li>
            <li>Enable secure password recovery</li>
          </ul>
        </div>

        {/* ================= ACTIVITY DATA ================= */}

        <div className="usage-block">
          <h5>2. Content & Activity</h5>
          <p>
            Your posts, reflections, and interactions are stored so we can:
          </p>
          <ul>
            <li>Display your content accurately</li>
            <li>Maintain emotional integrity of the platform</li>
            <li>Prevent spam, abuse, or manipulation</li>
          </ul>
        </div>

        {/* ================= SECURITY DATA ================= */}

        <div className="usage-block">
          <h5>3. Security & Protection</h5>
          <p>
            We collect session and device-related information to detect
            suspicious activity, prevent fraud, and keep your account safe.
          </p>
        </div>

        {/* ================= FINANCIAL DATA ================= */}

        <div className="usage-block">
          <h5>4. Wallet & Financial Records</h5>
          <p>
            If you use wallet features, transaction records are stored to:
          </p>
          <ul>
            <li>Maintain accurate balances</li>
            <li>Provide transparent transaction history</li>
            <li>Comply with financial and regulatory requirements</li>
          </ul>
        </div>

        {/* ================= LEGAL ================= */}

        <div className="usage-block">
          <h5>5. Legal & Compliance</h5>
          <p>
            Some data must be retained for legal obligations, fraud prevention,
            and responding to valid governmental or regulatory requests.
          </p>
        </div>

        {/* ================= USER CONTROL ================= */}

        <div className="usage-highlight">
          <h5>You Remain in Control</h5>
          <p>
            You can request a structured copy of your data at any time using
            the “Download Your Data” section. DolRise does not sell personal data.
          </p>
        </div>

        {/* ================= PRIVACY POLICY LINK ================= */}

        <div className="usage-footer">
          <p>
            For full legal details about how your data is processed,
            stored, and protected, please review our complete Privacy Policy.
          </p>

          <a
            href="https://dolrise.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="policy-btn"
          >
            View Full Privacy Policy
          </a>
        </div>

      </div>
    </div>
  );
}
