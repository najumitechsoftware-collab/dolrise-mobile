interface Props {
  status:
    | "not_started"
    | "pending"
    | "approved"
    | "rejected"
    | "auto_failed";
}

export default function IdentitySection({ status }: Props) {

  function renderStatus() {
    if (status === "approved")
      return <span className="badge verified">Verified</span>;

    if (status === "pending")
      return <span className="badge pending">Under Review</span>;

    if (status === "not_started")
      return <span className="badge notverified">Not Verified</span>;

    return <span className="badge rejected">Verification Required</span>;
  }

  return (
    <div className="wallet-card">
      <div className="card-header">
        <h2>Identity & Verification</h2>
        {renderStatus()}
      </div>

      <p>
        Secure your financial access and unlock
        global withdrawals.
      </p>
    </div>
  );
}
