"use client";

interface Props {
  onNext: () => void;
}

export default function KycIntro({ onNext }: Props) {
  return (
    <div className="kyc-card">
      <h2>Verify your identity</h2>

      <p className="kyc-subtitle">
        This helps us keep DolRise safe, fair, and trusted for everyone.
      </p>

      <p>
        We’ll ask you for a few simple details to confirm that this account
        truly belongs to you. Your information is handled with care and
        reviewed by our team.
      </p>

      <ul style={{ marginTop: 12, marginBottom: 12 }}>
        <li>• Government-issued ID</li>
        <li>• A clear selfie photo</li>
        <li>• Bank details for payouts</li>
      </ul>

      <p style={{ fontSize: 14, color: "#6b7280" }}>
        ⏳ Review usually takes <strong>5–7 days</strong>.  
        We’ll notify you as soon as it’s complete.
      </p>

      <button className="kyc-primary" onClick={onNext}>
        Start verification
      </button>
    </div>
  );
}
