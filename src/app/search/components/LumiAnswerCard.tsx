
import "./LumiAnswerCard.css";

interface Props {
  query: string;
  answer?: string;
  source?: string;
  loading?: boolean;
}

export default function LumiAnswerCard({
  query,
  answer,
  source,
  loading,
}: Props) {
  return (
    <div className="lumi-card">
      {/* ================= HEADER ================= */}
      <div className="lumi-header">
        <div className="lumi-badge">LUMI</div>
        <div className="lumi-title">Emotional AI Insight</div>
      </div>

      {/* ================= QUESTION ================= */}
      <div className="lumi-question">“{query}”</div>

      {/* ================= ANSWER ================= */}
      <div className="lumi-body">
        {loading && (
          <div className="lumi-loading">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
            <span className="text">LUMI is thinking…</span>
          </div>
        )}

        {!loading && answer && <p className="lumi-answer">{answer}</p>}

        {!loading && !answer && (
          <p className="lumi-empty">
            LUMI doesn’t have an answer yet — try refining your question ✨
          </p>
        )}
      </div>

      {/* ================= FOOTER ================= */}
      {!loading && answer && (
        <div className="lumi-footer">
          <span className="source">
            Source:{" "}
            <strong>
              {source === "dolrise_knowledge"
                ? "DolRise Knowledge"
                : source || "LUMI"}
            </strong>
          </span>
        </div>
      )}
    </div>
  );
}
