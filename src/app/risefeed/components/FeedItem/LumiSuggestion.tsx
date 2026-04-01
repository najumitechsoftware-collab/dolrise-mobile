type Props = {
  reason?: {
    type: string;
    message: string;
  };
};

export default function LumiSuggestion({ reason }: Props) {
  if (!reason) return null;

  return (
    <div className={`lumi-suggestion lumi-${reason.type}`}>
      <span className="lumi-badge">🧠 Suggested by LUMI</span>
      <span className="lumi-text">{reason.message}</span>
    </div>
  );
}
