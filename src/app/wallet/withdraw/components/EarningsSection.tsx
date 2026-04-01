interface Props {
  amount: number;
  setAmount: (v: number) => void;
  availableBalance: number;
  fee: number;
  net: number;
  currency: string;
}

export default function EarningsSection({
  amount,
  setAmount,
  availableBalance,
  fee,
  net,
}: Props) {
  return (
    <div className="withdraw-card">

      <h2>Available Earnings</h2>

      <div className="balance-box">
        <span>Available Balance</span>
        <strong>{availableBalance.toLocaleString()} NC</strong>
      </div>

      <div className="withdraw-field">
        <label>Withdrawal Amount (NC)</label>
        <input
          type="number"
          min={100}
          max={5000}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>

      <div className="withdraw-breakdown">
        <div>
          <span>Processing Fee</span>
          <span>{fee} NC</span>
        </div>

        <div className="withdraw-net">
          <span>You Receive</span>
          <strong>{net > 0 ? net : 0} NC</strong>
        </div>
      </div>

    </div>
  );
}
