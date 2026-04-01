import Link from "next/link";
import styles from "./privacy-hub.module.css";

export default function PrivacyPolicyHub() {
  return (
    <main className={styles.container}>
      {/* ===============================
          HEADER
          =============================== */}
      <header className={styles.header}>
        <h1>Privacy at DolRise</h1>
        <p className={styles.subtitle}>
          DolRise is built with respect for your privacy, your emotions,
          and your choices. This hub helps you understand how we protect
          your data and how our systems are designed to remain human-first,
          transparent, and safe across different regions of the world.
        </p>
      </header>

      {/* ===============================
          PRIVACY SECTIONS GRID
          =============================== */}
      <section className={styles.grid}>
        {/* ---------- GLOBAL PRIVACY ---------- */}
        <div className={styles.card}>
          <h2>Global Privacy Policy</h2>
          <p>
            Our baseline privacy commitments that apply to all users worldwide.
            This policy explains what data we collect, how we use it, and what
            we deliberately avoid collecting.
          </p>
          <p className={styles.note}>
            🌍 A single global standard built on dignity, minimisation,
            and long-term trust.
          </p>
          <Link href="/legal/privacy/global" className={styles.link}>
            View Global Privacy Policy →
          </Link>
        </div>

        {/* ---------- EMOTIONAL SAFETY ---------- */}
        <div className={styles.card}>
          <h2>Emotional Safety & Algorithmic Care</h2>
          <p>
            Learn how DolRise designs its systems to reduce overwhelm,
            avoid emotional profiling, and respect user control through
            time-based limits, decay mechanisms, and opt-out choices.
          </p>
          <p className={styles.note}>
            🧠 Built to regulate, not manipulate.
          </p>
          <Link
            href="/legal/privacy/emotional-safety"
            className={styles.link}
          >
            Learn About Emotional Safety →
          </Link>
        </div>

        {/* ---------- REGIONAL POLICIES ---------- */}
        <div className={styles.card}>
          <h2>Regional Privacy Policies</h2>
          <p>
            Some regions provide additional privacy rights under local law.
            Select your region below to view policies that apply specifically
            to you.
          </p>

          <div className={styles.regions}>
            {/* EU */}
            <div className={styles.regionItem}>
              <Link href="/legal/privacy/regions/eu">
                European Union (GDPR)
              </Link>
              <span className={styles.regionNote}>
                🇪🇺 Strong rights, clear limits, human-centric processing.
              </span>
            </div>

            {/* UK */}
            <div className={styles.regionItem}>
              <Link href="/legal/privacy/regions/uk">
                United Kingdom
              </Link>
              <span className={styles.regionNote}>
                🇬🇧 Fairness, accountability, and responsible design.
              </span>
            </div>

            {/* US California */}
            <div className={styles.regionItem}>
              <Link href="/legal/privacy/regions/us-ca">
                United States (California)
              </Link>
              <span className={styles.regionNote}>
                🇺🇸 Transparency, choice, and consumer control.
              </span>
            </div>

            {/* Nigeria */}
            <div className={styles.regionItem}>
              <Link href="/legal/privacy/regions/ng">
                Nigeria
              </Link>
              <span className={styles.regionNote}>
                🇳🇬 Lawful processing, proportional use, and respect.
              </span>
            </div>

            {/* Brazil */}
            <div className={styles.regionItem}>
              <Link href="/legal/privacy/regions/br">
                Brazil
              </Link>
              <span className={styles.regionNote}>
                🇧🇷 Transparency and user dignity under LGPD.
              </span>
            </div>

            {/* Canada */}
            <div className={styles.regionItem}>
              <Link href="/legal/privacy/regions/ca">
                Canada
              </Link>
              <span className={styles.regionNote}>
                🇨🇦 Trust, accountability, and limited data use.
              </span>
            </div>

            {/* India */}
            <div className={styles.regionItem}>
              <Link href="/legal/privacy/regions/in">
                India
              </Link>
              <span className={styles.regionNote}>
                🇮🇳 Consent-first processing and child safety awareness.
              </span>
            </div>

            {/* Australia */}
            <div className={styles.regionItem}>
              <Link href="/legal/privacy/regions/au">
                Australia
              </Link>
              <span className={styles.regionNote}>
                🇦🇺 Security, overseas transfer care, and transparency.
              </span>
            </div>

            {/* Japan */}
            <div className={styles.regionItem}>
              <Link href="/legal/privacy/regions/jp">
                Japan
              </Link>
              <span className={styles.regionNote}>
                🇯🇵 Respect, purpose limitation, and careful handling.
              </span>
            </div>

            {/* South Africa */}
            <div className={styles.regionItem}>
              <Link href="/legal/privacy/regions/za">
                South Africa
              </Link>
              <span className={styles.regionNote}>
                🇿🇦 Lawful processing and information responsibility.
              </span>
            </div>

            {/* Singapore */}
            <div className={styles.regionItem}>
              <Link href="/legal/privacy/regions/sg">
                Singapore
              </Link>
              <span className={styles.regionNote}>
                🇸🇬 Practical protection with strong organisational care.
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
