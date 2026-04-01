interface Props {
  methods: any[];
  refresh: () => void;
}

export default function MethodList({
  methods,
}: Props) {
  if (!methods.length) {
    return (
      <div className="pm-empty">
        No payout methods added yet.
      </div>
    );
  }

  return (
    <div className="pm-list">
      {methods.map((m) => (
        <div key={m.id} className="pm-item">
          <div>
            <strong>{m.country_code}</strong>
            <p>
              {m.method_type} • {m.payout_scope}
            </p>
            <span className={`status ${m.verification_status}`}>
              {m.verification_status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
