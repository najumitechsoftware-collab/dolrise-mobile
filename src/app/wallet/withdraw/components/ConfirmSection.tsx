interface Props {
  disabled: boolean;
  amount: number;
  net: number;
  loading: boolean;
  onSubmit: () => void;
}

export default function ConfirmSection({
  disabled,
  amount,
  net,
  loading,
  onSubmit,
}: Props) {
  return (
    <div className="withdraw-final">

      <button
        className="withdraw-submit-btn"
        disabled={disabled}
        onClick={onSubmit}
      >
        {loading
          ? "Processing..."
          : "Confirm Withdrawal"}
      </button>

      <p className="withdraw-footnote">
        Requested: {amount || 0} NC •
        Net: {net > 0 ? net : 0} NC
      </p>

    </div>
  );
}
