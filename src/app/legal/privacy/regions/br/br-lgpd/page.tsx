import styles from "./brazil-lgpd.module.css";

export default function BrazilLGPDPrivacyPolicyPage() {
  return (
    <main className={styles.container}>
      {/* ===============================
          HEADER
          =============================== */}
      <header className={styles.header}>
        <h1>Brazil Privacy Policy (LGPD)</h1>
        <p className={styles.meta}>
          Document date: 26 January 2026<br />
          Effective date: 30 January 2026
        </p>
      </header>

      {/* ===============================
          INTRODUCTION
          =============================== */}
      <section className={styles.section} id="introduction">
        <h2>Introduction</h2>

        <p>
          DolRise is a global platform built on principles of dignity, trust,
          and responsible technology. This Brazil Privacy Policy explains how
          DolRise collects, uses, stores, and protects personal data of
          individuals located in Brazil, in accordance with the Lei Geral de
          Proteção de Dados Pessoais (LGPD).
        </p>

        <p>
          DolRise recognises that personal data is not merely technical
          information. It represents individual identity, personal context,
          and autonomy. For this reason, DolRise treats personal data
          processing as both a legal obligation and an ethical responsibility.
        </p>

        <p>
          This Brazil Privacy Policy operates alongside the DolRise Global
          Privacy Policy. Where additional or specific obligations apply under
          Brazilian law, this policy provides region-specific disclosures and
          safeguards. In the event of any conflict, this Brazil Privacy Policy
          shall prevail for users located in Brazil.
        </p>

        <p>
          Under the LGPD, DolRise acts as a <strong>Data Controller</strong>,
          while users are recognised as <strong>Data Subjects</strong>. This
          means DolRise processes personal data only for lawful, explicit,
          and legitimate purposes, and always with respect for user rights.
        </p>

        <p>
          DolRise may rely on global technical infrastructure to deliver its
          services, including systems used for security, payments, and service
          reliability. Where personal data is processed outside Brazil,
          DolRise applies appropriate safeguards to ensure continued protection
          and compliance with applicable law.
        </p>

        <p>
          Certain categories of data, including identity verification (KYC)
          information and financial details, are processed only when strictly
          necessary and are protected using strong technical and organisational
          security measures, including encryption and restricted access.
        </p>

        <p>
          This policy reflects DolRise’s commitment to transparency,
          accountability, and respect for the fundamental rights of users
          under Brazilian data protection law.
        </p>
      </section>

      {/* ===============================
          NOTE
          =============================== */}
      <div className={styles.notice}>
        Additional sections of this Brazil Privacy Policy will describe the
        legal bases for processing, user rights under the LGPD, data retention
        practices, international data transfers, and contact information.
      </div>
    </main>
  );
}
