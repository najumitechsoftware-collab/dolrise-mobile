"use client";

import "./OverviewSection.css";

export default function OverviewSection() {
  return (
    <section className="dt-overview">

      {/* ===============================
          HEADER
      =============================== */}
      <div className="dt-overview-header">
        <h3>Your Data, Your Control</h3>
        <p>
          At DolRise, you remain the owner of your data. 
          We collect only what is necessary to provide a safe and meaningful experience.
        </p>
      </div>

      {/* ===============================
          WHAT WE STORE
      =============================== */}
      <div className="dt-card">
        <h4>What We Store</h4>

        <ul className="dt-list">
          <li>
            <strong>Account Information</strong>
            <span>Name, email, username</span>
          </li>

          <li>
            <strong>Content</strong>
            <span>Posts, reflections and emotional interactions</span>
          </li>

          <li>
            <strong>Security Data</strong>
            <span>Login sessions, devices and protection logs</span>
          </li>

          <li>
            <strong>Financial Activity</strong>
            <span>Wallet and transaction history</span>
          </li>

          <li>
            <strong>Policy Records</strong>
            <span>Accepted policy versions and consent history</span>
          </li>
        </ul>
      </div>

      {/* ===============================
          WHAT WE NEVER DO
      =============================== */}
      <div className="dt-card highlight">
        <h4>What We Never Do</h4>
        <ul>
          <li>We never sell your personal data.</li>
          <li>We never expose private messages publicly.</li>
          <li>We never use hidden profiling techniques.</li>
          <li>We never access private content without system necessity.</li>
        </ul>
      </div>

      {/* ===============================
          DATA RETENTION
      =============================== */}
      <div className="dt-card">
        <h4>How Long We Keep Data</h4>
        <p>
          Active accounts remain securely stored. 
          Security logs are retained for protection and fraud prevention. 
          Data export files are temporary and securely generated upon request.
        </p>
      </div>

      {/* ===============================
          LEGAL / PRIVACY LINK
      =============================== */}
      <div className="dt-privacy-link">
        <p>
          For detailed information about how we handle and protect your data, 
          please review our full Privacy Policy.
        </p>

        <a
          href="https://dolrise.com/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="dt-privacy-btn"
        >
          View Privacy Policy
        </a>
      </div>

      {/* ===============================
          EMOTIONAL CLOSE
      =============================== */}
      <div className="dt-close">
        Transparency is part of our emotional integrity. 
        We protect what you trust us with.
      </div>

    </section>
  );
}
