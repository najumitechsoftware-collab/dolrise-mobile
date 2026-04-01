"use client";


export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body style={styles.wrapper}>
        <div style={styles.box}>
          <h1 style={styles.title}>We’ll be right back 🌊</h1>
          <p style={styles.text}>Dolrise is experiencing a deep pause.</p>
          <p style={styles.text}>Please return in a moment.</p>
          <button style={styles.button} onClick={() => reset()}>
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f5f5",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  box: {
    maxWidth: 420,
    padding: 32,
    textAlign: "center" as const,
  },
  title: {
    fontSize: 22,
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    opacity: 0.8,
  },
  button: {
    marginTop: 20,
    padding: "10px 18px",
    borderRadius: 999,
    border: "none",
    background: "#333",
    color: "#fff",
    cursor: "pointer",
  },
};
