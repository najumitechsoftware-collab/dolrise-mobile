"use client";


export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>We’re taking a gentle pause 🌊</h1>

        <p style={styles.text}>
          Something didn’t go as expected on our side.
          <br />
          You didn’t do anything wrong.
        </p>

        <p style={styles.sub}>
          Take a breath — we’re already working to restore the flow.
        </p>

        <button onClick={reset} style={styles.button}>
          Try again
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fbf9f4",
    padding: "24px",
  },
  card: {
    maxWidth: "420px",
    textAlign: "center" as const,
    background: "#ffffff",
    borderRadius: "22px",
    padding: "32px 24px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
  },
  title: {
    fontSize: "22px",
    marginBottom: "14px",
    color: "#3e3322",
  },
  text: {
    fontSize: "15px",
    lineHeight: 1.6,
    opacity: 0.85,
  },
  sub: {
    fontSize: "13px",
    marginTop: "10px",
    marginBottom: "22px",
    opacity: 0.6,
  },
  button: {
    padding: "10px 20px",
    borderRadius: "999px",
    background: "#d4af37",
    color: "#fff",
    border: "none",
    fontSize: "14px",
    cursor: "pointer",
  },
};
