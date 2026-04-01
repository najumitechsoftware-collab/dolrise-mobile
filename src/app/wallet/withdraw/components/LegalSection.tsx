interface Props {
  agreeTerms: boolean;
  setAgreeTerms: (v: boolean) => void;
  agreeTax: boolean;
  setAgreeTax: (v: boolean) => void;
}

export default function LegalSection({
  agreeTerms,
  setAgreeTerms,
  agreeTax,
  setAgreeTax,
}: Props) {
  return (
    <div className="withdraw-card">

      <h2>Legal Confirmation</h2>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={agreeTerms}
          onChange={(e) =>
            setAgreeTerms(e.target.checked)
          }
        />
        I agree to DolRise Payout Terms &
        Processing Policy
      </label>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={agreeTax}
          onChange={(e) =>
            setAgreeTax(e.target.checked)
          }
        />
        I understand that I am responsible for
        any applicable taxes in my country
      </label>

      <p className="legal-note">
        DolRise does not withhold or remit taxes on
        behalf of users.
      </p>

    </div>
  );
}
