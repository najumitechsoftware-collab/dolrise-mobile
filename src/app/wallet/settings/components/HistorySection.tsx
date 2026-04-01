interface Props {
  router: any;
}

export default function HistorySection({ router }: Props) {
  return (
    <div className="wallet-card">
      <h2>Withdrawal History</h2>

      <button
        onClick={() => router.push("/wallet/history")}
      >
        View History
      </button>
    </div>
  );
}
