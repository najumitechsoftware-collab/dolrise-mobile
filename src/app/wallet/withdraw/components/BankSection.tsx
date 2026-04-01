export default function BankSection() {
  return (
    <div className="withdraw-card">

      <h2>Payout Destination</h2>

      <div className="bank-preview">
        <div>
          <span>Bank Name</span>
          <strong>Access Bank</strong>
        </div>

        <div>
          <span>Account Number</span>
          <strong>**** 4582</strong>
        </div>

        <div>
          <span>Account Name</span>
          <strong>ABUBAKAR ISMAIL</strong>
        </div>
      </div>

      <button className="edit-bank-btn">
        Update Bank Details
      </button>

      <p className="withdraw-soft-text">
        For security reasons, your account name must match your
        verified DolRise identity.
      </p>

    </div>
  );
}
