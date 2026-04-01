export default function PrivacyPolicyPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#fafafa",
        padding: "64px 20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <section
        style={{
          maxWidth: "900px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
        }}
      >
        <h1 style={{ fontSize: "32px", marginBottom: "16px" }}>
          Privacy Policy
        </h1>

        <p style={{ lineHeight: 1.8, color: "#374151" }}>
          DolRise respects your privacy and is committed to protecting your
          personal information. This Privacy Policy explains how we collect,
          use, store, and safeguard your data.
        </p>
      </section>
    </main>
  );
}
