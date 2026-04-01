
interface Props {
  onSelect: (q: string) => void;
}

const risingSearches = [
  "Feeling lonely",
  "Who feels like me?",
  "Faith & calm",
  "Most reechoed posts",
  "What is DolRise?",
];

export default function RisingSearches({ onSelect }: Props) {
  return (
    <div className="rising-box">
      <h4 className="rising-title">🔥 Rising Searches</h4>

      <div className="rising-list">
        {risingSearches.map((q) => (
          <button key={q} className="rising-item" onClick={() => onSelect(q)}>
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
