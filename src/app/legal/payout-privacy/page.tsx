"use client";

import "./payout-privacy.css";

export default function PayoutPrivacyPage() {
  return (
    <div className="policy-wrapper">
      <div className="policy-container">

        <h1>Payout Privacy Policy</h1>

        <p className="policy-intro">
          At DolRise, we treat your financial privacy with the highest level of responsibility,
          especially regarding withdrawals and payout processing. This Payout Privacy Policy
          explains how we collect, use, protect, and store information related to withdrawal
          transactions made from your DolRise account.
        </p>

        <section>
          <h2>1. Information We Collect</h2>
          <p>
            When you initiate a withdrawal, we may collect financial and identity-related
            information necessary to complete the transaction securely. This may include:
          </p>
          <ul>
            <li>Bank account name</li>
            <li>Bank account number</li>
            <li>Bank name and country</li>
            <li>Preferred currency</li>
            <li>Identity verification data (KYC)</li>
            <li>Transaction references and audit logs</li>
          </ul>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <p>
            Your information is used strictly for processing withdrawals, preventing fraud,
            complying with regulatory obligations, and protecting both users and the platform.
            We do not sell your financial data to third parties.
          </p>
        </section>

        <section>
          <h2>3. Data Sharing</h2>
          <p>
            DolRise may share limited information with regulated financial partners,
            exchange providers, or payment processors solely for the purpose of completing
            your payout request. All partners operate under strict confidentiality and
            data protection agreements.
          </p>
        </section>

        <section>
          <h2>4. Security Measures</h2>
          <p>
            We implement industry-standard security measures including encryption,
            restricted database access, transaction monitoring, and audit logging.
            While no system guarantees 100% security, we apply best practices to
            safeguard your data.
          </p>
        </section>

        <section>
          <h2>5. Regulatory Compliance</h2>
          <p>
            DolRise may retain payout-related records to comply with anti-money laundering (AML),
            fraud prevention, and financial reporting requirements under applicable laws.
          </p>
        </section>

        <section>
          <h2>6. Your Consent</h2>
          <p>
            By initiating a withdrawal through DolRise, you acknowledge and agree to
            this Payout Privacy Policy and the handling of your data as described above.
          </p>
        </section>
            {/* =========================================
    1. INFORMATION WE COLLECT
========================================= */}

<section className="legal-section">
  <h2>1. Information We Collect</h2>

  <p>
    In order to process withdrawals securely, lawfully, and transparently,
    DolRise collects specific information related to your account and
    payout destination. This data collection is strictly limited to what
    is necessary for secure financial processing, fraud prevention,
    regulatory compliance, and operational integrity.
  </p>

  <p>
    When you configure a payout method, we may collect financial
    destination details including bank name, account number, country,
    currency, and payout scope (local or international). For card or
    fintech methods, we may collect tokenized card data, last four digits,
    provider name, or related identification fields. These details are
    used exclusively to ensure that funds are transferred accurately and
    securely to the intended recipient.
  </p>

  <p>
    We also collect transaction-related data associated with withdrawal
    activity. This includes the amount of NC requested, applicable
    processing fees, net payout amount, converted fiat value, currency
    used, exchange rate snapshot, timestamps, transaction reference IDs,
    and payout status. This information enables auditability,
    transparency, and dispute resolution where necessary.
  </p>

  <p>
    Where required by applicable financial regulations, we may collect
    identity verification information (KYC). This may include your full
    legal name, date of birth, residential address, government-issued
    identification documents, and other compliance-related details.
    Such data is collected solely to comply with anti-money laundering
    (AML), fraud prevention, and financial regulatory requirements.
  </p>

  <p>
    For security purposes, we may collect device and access metadata
    including IP address, device type, browser information, login
    timestamps, and session identifiers. This data is used to detect
    unauthorized access attempts, suspicious activity, and account
    compromise risks.
  </p>

  <p>
    Additionally, we maintain records of policy consent, including
    timestamps and policy version acceptance, whenever you agree to
    payout terms or related privacy policies. These records are retained
    for legal accountability and compliance verification.
  </p>

  <p>
    DolRise does not collect payout-related data beyond what is necessary
    for secure transaction processing. We do not sell, trade, or monetize
    your payout information for advertising or unrelated commercial
    purposes.
  </p>

  <p>
    All collected information is protected through enterprise-grade
    technical, administrative, and organizational safeguards designed
    to maintain confidentiality, integrity, and availability.
  </p>
</section>
{/* ============================================================
   SECTION 4 — HOW WE USE YOUR PAYOUT INFORMATION
============================================================ */}

<section className="legal-section">
  <h2>4. How We Use Your Payout Information</h2>

  <p>
    DolRise uses payout-related information strictly for legitimate,
    security-driven, and compliance-based purposes. We do not use payout
    data for advertising, behavioral tracking, or commercial resale.
    All usage is limited to operational necessity and regulatory compliance.
  </p>

  <h3>4.1 Processing Withdrawal Requests</h3>
  <p>
    Your payout information is primarily used to process withdrawal
    requests initiated from your wallet dashboard. This includes:
  </p>
  <ul>
    <li>Verifying account ownership</li>
    <li>Confirming available wallet balance</li>
    <li>Calculating platform processing fees</li>
    <li>Converting NC to your preferred currency</li>
    <li>Transmitting funds to your selected payout destination</li>
  </ul>

  <h3>4.2 Security and Fraud Prevention</h3>
  <p>
    We use payout data to maintain financial integrity and platform
    security. This includes transaction PIN verification, anomaly
    detection, risk scoring, and fraud prevention measures.
  </p>
  <p>
    DolRise may temporarily suspend or review payout requests if
    suspicious activity is detected.
  </p>

  <h3>4.3 Regulatory and Compliance Obligations</h3>
  <p>
    In certain jurisdictions, financial laws require retention of
    transaction records, anti-money laundering (AML) monitoring,
    and identity verification (KYC). Payout data is processed to
    comply with these obligations where applicable.
  </p>

  <h3>4.4 Exchange Rate Processing</h3>
  <p>
    When converting NC into fiat currency, we use your preferred
    currency setting and the active exchange rate available at
    the time of withdrawal. The system records a rate snapshot
    to ensure transparency and audit accuracy.
  </p>

  <h3>4.5 Internal Audit and Financial Integrity</h3>
  <p>
    Payout records may be reviewed internally for auditing,
    accounting reconciliation, risk assessment, and operational
    improvement. These reviews are conducted under strict
    confidentiality standards.
  </p>

  <h3>4.6 Dispute Resolution</h3>
  <p>
    In the event of disputes, complaints, or payout delays,
    transaction records may be used to investigate and resolve
    issues fairly and transparently.
  </p>

  <h3>4.7 No Sale of Payout Data</h3>
  <p>
    DolRise does not sell payout-related data to advertisers,
    third-party marketers, or data brokers. Your financial
    information remains protected within the platform’s
    operational and compliance framework.
  </p>

  <h3>4.8 Data Minimization</h3>
  <p>
    We collect and process only the minimum information required
    to execute withdrawals securely. Payout information is not
    combined with unrelated behavioral analytics systems.
  </p>
</section>        
{/* =======================================================
   SECTION 5 – DATA SHARING & THIRD PARTIES
======================================================= */}

<section className="legal-section">
  <h2>5. Data Sharing & Third Parties</h2>

  <p>
    DolRise treats payout-related information with strict confidentiality.
    We do not share your payout data except where necessary to provide
    services, comply with legal obligations, protect platform integrity,
    or where you have provided explicit authorization.
  </p>

  <h3>5.1 Payment Processors</h3>
  <p>
    To facilitate withdrawals to bank accounts, cards, or supported fintech
    providers, DolRise may share limited payout information with authorized
    payment processing partners. This may include:
  </p>
  <ul>
    <li>Account holder name</li>
    <li>Bank account or payment destination details</li>
    <li>Withdrawal amount</li>
    <li>Currency information</li>
    <li>Transaction reference identifiers</li>
  </ul>
  <p>
    All payment partners operate under strict contractual data protection
    obligations and may not use your information for purposes unrelated
    to processing your payout.
  </p>

  <h3>5.2 Regulatory & Legal Compliance</h3>
  <p>
    DolRise may disclose payout information where required by applicable
    law, regulation, or legal process. This includes compliance with:
  </p>
  <ul>
    <li>Anti-Money Laundering (AML) laws</li>
    <li>Counter-terrorism financing regulations</li>
    <li>Tax reporting obligations</li>
    <li>Fraud investigations</li>
  </ul>
  <p>
    Such disclosures are limited strictly to what is legally required
    and are handled with appropriate safeguards.
  </p>

  <h3>5.3 Fraud Prevention & Risk Management</h3>
  <p>
    To maintain platform security, DolRise may share limited information
    with fraud detection, identity verification, and risk management
    providers. This helps us detect suspicious transactions, prevent
    unauthorized withdrawals, and protect user funds.
  </p>

  <h3>5.4 Infrastructure & Technical Service Providers</h3>
  <p>
    DolRise utilizes secure third-party infrastructure providers for
    cloud hosting, encrypted data storage, logging, auditing, and
    technical maintenance. These providers do not have permission to
    use payout data for independent purposes.
  </p>

  <h3>5.5 Corporate Transactions</h3>
  <p>
    In the event of a merger, acquisition, restructuring, or asset
    transfer, payout-related information may be transferred as part of
    business assets. Any successor entity will remain bound by the
    commitments described in this Privacy Policy.
  </p>

  <h3>5.6 No Sale of Financial Data</h3>
  <p>
    DolRise does not sell payout data, financial records, or transaction
    histories to advertisers, data brokers, or marketing agencies.
  </p>

  <h3>5.7 User-Authorized Sharing</h3>
  <p>
    Where you explicitly authorize integrations or third-party services,
    DolRise may share payout-related information strictly in accordance
    with your instructions.
  </p>

  <h3>5.8 Data Minimization Principle</h3>
  <p>
    DolRise applies a strict data minimization principle. We only share
    the minimum amount of information necessary to fulfill the intended
    purpose, and all transfers are protected by encryption and access
    control mechanisms.
  </p>
</section>
{/* ========================================= */}
      {/* SECTION 6 – DATA RETENTION & STORAGE */}
      {/* ========================================= */}

      <section className="legal-section">
        <h2>6. Data Retention & Storage</h2>

        <p>
          DolRise retains payout-related information only for as long as
          necessary to fulfill legitimate legal, regulatory, security,
          accounting, and operational requirements. We do not store personal
          or financial data indefinitely without lawful justification.
        </p>

        <h3>6.1 Retention Principles</h3>
        <p>
          Payout data is retained where required for compliance with financial
          regulations, anti-money laundering (AML) obligations, fraud
          prevention monitoring, dispute resolution, accounting audits, and
          enforcement of our contractual terms.
        </p>

        <p>
          Once the lawful purpose for retention expires, data is securely
          deleted or anonymized in accordance with internal data governance
          standards.
        </p>

        <h3>6.2 Categories of Retained Data</h3>

        <h4>a) Transaction Records</h4>
        <p>
          Records of payout transactions — including NC amounts withdrawn,
          applicable fees, exchange rate snapshots, reference identifiers,
          payout status, and timestamps — may be retained for a period
          required under applicable financial and tax regulations
          (commonly 5–7 years).
        </p>

        <h4>b) Identity & Verification Data</h4>
        <p>
          Identity verification (KYC) information may be retained as required
          under AML and financial compliance laws, even if a user account is
          closed. Such retention is strictly limited to regulatory
          compliance purposes.
        </p>

        <h4>c) Security & Audit Logs</h4>
        <p>
          Security logs, system access records, and fraud detection data may
          be retained for monitoring platform integrity, investigating
          suspicious activity, and ensuring system stability.
        </p>

        <h3>6.3 Secure Storage Infrastructure</h3>
        <p>
          All payout-related information is stored within encrypted database
          systems protected by enterprise-grade infrastructure. We implement:
        </p>

        <ul>
          <li>Encryption at rest</li>
          <li>Encryption in transit (TLS/HTTPS)</li>
          <li>Role-based access controls</li>
          <li>Strict internal permission policies</li>
          <li>Continuous security monitoring</li>
        </ul>

        <h3>6.4 Secure Deletion & Anonymization</h3>
        <p>
          When retention periods expire, data is either permanently deleted
          using secure deletion standards or irreversibly anonymized so that
          it can no longer be associated with an identifiable individual.
        </p>

        <h3>6.5 Backup & Disaster Recovery</h3>
        <p>
          Encrypted backups may be maintained for disaster recovery and
          business continuity purposes. Backup systems follow strict access
          and security protocols and are not used for commercial profiling
          or unrelated processing.
        </p>

        <h3>6.6 Regulatory Adjustments</h3>
        <p>
          DolRise may adjust retention periods where required by new legal,
          regulatory, or compliance obligations. Any such changes will be
          implemented in accordance with applicable law.
        </p>

        <p>
          Our retention philosophy is simple: we retain only what is
          necessary, for only as long as necessary, and always with strong
          safeguards in place.
        </p>
      </section>
         {/* =========================================================
          SECTION 7 — DATA SECURITY MEASURES
      ========================================================== */}

      <section className="legal-section">
        <h2>7. Data Security Measures</h2>

        <p>
          DolRise implements comprehensive technical and organizational
          safeguards designed to protect payout-related information from
          unauthorized access, disclosure, alteration, or destruction.
          Security is embedded into the architecture of the DolRise platform
          through a security-by-design approach.
        </p>

        <h3>7.1 Encryption in Transit</h3>
        <p>
          All data transmitted between users and DolRise servers is protected
          using industry-standard HTTPS and TLS encryption. This ensures that
          payout requests, transaction PIN entries, exchange previews, and
          payment method submissions are securely transmitted.
        </p>

        <h3>7.2 Encryption at Rest</h3>
        <p>
          Sensitive payout data stored within DolRise infrastructure is
          protected using encryption at rest. Database-level protections and
          controlled access mechanisms help prevent unauthorized internal or
          external access.
        </p>

        <h3>7.3 Role-Based Access Controls</h3>
        <p>
          Access to payout-related systems is strictly limited based on role
          and operational necessity. Only authorized personnel with defined
          responsibilities may access payout management systems.
        </p>

        <h3>7.4 Fraud Monitoring and Risk Detection</h3>
        <p>
          DolRise monitors withdrawal activity to detect suspicious patterns,
          repeated failed PIN attempts, abnormal payout method changes, or
          activity inconsistent with historical usage behavior. Where risk
          indicators are identified, withdrawals may be temporarily restricted
          pending review.
        </p>

        <h3>7.5 Transaction PIN Protection</h3>
        <p>
          Transaction PINs are never stored in plain text. Secure cryptographic
          hashing techniques are used to protect authentication credentials.
          DolRise does not have visibility into user PIN values.
        </p>

        <h3>7.6 Security Testing and System Hardening</h3>
        <p>
          DolRise conducts internal security reviews, infrastructure
          hardening procedures, and system integrity validations to maintain
          the resilience of wallet and payout systems.
        </p>

        <h3>7.7 Shared Responsibility</h3>
        <p>
          While DolRise maintains strong security controls, users are also
          responsible for safeguarding account credentials, avoiding the use
          of public devices for financial activity, and protecting their
          transaction PINs from disclosure.
        </p>

        <p>
          No system can guarantee absolute security. However, DolRise
          continuously enhances its infrastructure to align with evolving
          cybersecurity standards and industry best practices.
        </p>
      </section>
         {/* ============================================================
          SECTION 9 — INTERNATIONAL DATA TRANSFERS
      ============================================================ */}

      <section className="legal-section">
        <h2>9. International Data Transfers</h2>

        <p>
          DolRise operates a global digital infrastructure. In order to
          provide secure and efficient payout services, certain payout-related
          data may be processed, stored, or transmitted outside of your
          country of residence.
        </p>

        <h3>9.1 What Is an International Transfer?</h3>
        <p>
          An international data transfer occurs when personal or financial
          data is stored, accessed, or processed in a country different from
          the user’s location. This may include cloud hosting, exchange rate
          services, fraud detection systems, or payment infrastructure
          providers operating internationally.
        </p>

        <h3>9.2 Why Transfers May Occur</h3>
        <p>
          International processing may be necessary to:
        </p>
        <ul>
          <li>Maintain secure cloud-based infrastructure</li>
          <li>Enable currency exchange and real-time rate processing</li>
          <li>Perform fraud detection and risk analysis</li>
          <li>Ensure system reliability and disaster recovery backups</li>
        </ul>

        <h3>9.3 Security Safeguards</h3>
        <p>
          Whenever data is transferred internationally, DolRise implements
          strong technical and organizational safeguards including:
        </p>
        <ul>
          <li>End-to-end encryption (in transit and at rest)</li>
          <li>Secure API communication protocols</li>
          <li>Strict access controls and role-based permissions</li>
          <li>Data minimization principles</li>
        </ul>

        <p>
          DolRise does not transmit complete financial credentials unless
          absolutely required for processing a lawful payout.
        </p>

        <h3>9.4 Legal Compliance</h3>
        <p>
          DolRise complies with applicable international data protection
          regulations, including but not limited to GDPR where applicable,
          local financial compliance regulations, and anti-money laundering
          (AML) standards.
        </p>

        <p>
          Where required, contractual safeguards and standard data protection
          clauses are implemented to ensure lawful international data
          transfers.
        </p>

        <h3>9.5 Third-Party Service Providers</h3>
        <p>
          DolRise may rely on carefully selected third-party service providers
          for limited processing activities such as:
        </p>
        <ul>
          <li>Exchange rate services</li>
          <li>Payment infrastructure partners</li>
          <li>Cloud storage and hosting providers</li>
          <li>Fraud monitoring systems</li>
        </ul>

        <p>
          These providers are contractually bound to confidentiality,
          security, and lawful data processing obligations. They are not
          permitted to use payout data for their own independent purposes.
        </p>

        <h3>9.6 User Rights Regarding Transfers</h3>
        <p>
          Users may request information regarding whether their payout-related
          data is transferred internationally and the safeguards applied in
          such transfers.
        </p>

        <h3>9.7 Commitment to Transparency</h3>
        <p>
          DolRise is committed to transparency, regulatory compliance, and
          strong data protection standards in all jurisdictions where it
          operates.
        </p>
      </section>
          {/* ========================================= */}
      {/* SECTION 10 – YOUR RIGHTS REGARDING PAYOUT DATA */}
      {/* ========================================= */}

      <section className="legal-section">
        <h2>10. Your Rights Regarding Payout Data</h2>

        <p>
          As a DolRise user, you retain fundamental rights over the personal and
          financial data associated with your payout activity. This includes
          withdrawal records, transaction references, payout destinations,
          exchange conversions, and related audit information. DolRise does not
          claim ownership of your payout data; it is processed strictly for
          operational, regulatory, and security purposes.
        </p>

        <h3>10.1 Right of Access</h3>
        <p>
          You have the right to request access to payout-related data held by
          DolRise. This includes withdrawal history, applied fees, exchange
          rates, destination snapshots, payout status, and transaction
          references. Transparency is a core principle of our financial
          infrastructure.
        </p>

        <h3>10.2 Right to Rectification</h3>
        <p>
          If you identify inaccuracies in your payout method information—such as
          bank details, account identifiers, or currency preferences—you may
          update those details before a payout enters processing. Once a payout
          reaches processing or completion status, historical records cannot be
          modified for audit and compliance integrity.
        </p>

        <h3>10.3 Right to Erasure</h3>
        <p>
          Certain payout-related data cannot be erased due to financial
          regulations, anti-money laundering requirements, and accounting
          standards. However, inactive payout methods and unprocessed draft
          requests may be removed where legally permitted.
        </p>

        <h3>10.4 Right to Restrict Processing</h3>
        <p>
          You may request a temporary restriction of payout processing if you
          believe there is an error or require clarification. Once a payout has
          entered advanced processing stages, restrictions may be limited based
          on operational feasibility.
        </p>

        <h3>10.5 Right to Object</h3>
        <p>
          You may object to certain forms of data processing where not legally
          required. However, processing necessary for fraud prevention,
          regulatory compliance, AML controls, and financial integrity cannot
          be objected to or disabled.
        </p>

        <h3>10.6 Right to Data Portability</h3>
        <p>
          Upon request, DolRise may provide structured transaction summaries in
          a machine-readable format, enabling you to review or transfer your
          payout data for lawful financial purposes.
        </p>

        <h3>10.7 Right to Explanation of Rejection</h3>
        <p>
          If a payout request is rejected, you have the right to understand the
          reason. This may include KYC status issues, exceeded withdrawal limits,
          invalid payout methods, or regulatory restrictions.
        </p>

        <h3>10.8 Right to Lodge a Complaint</h3>
        <p>
          If you believe your payout data rights have been violated, you may
          contact DolRise Support for review. Where applicable, you may also
          escalate concerns to the relevant financial or data protection
          authority in your jurisdiction.
        </p>

        <h3>10.9 Right to Security Assurance</h3>
        <p>
          You are entitled to expect enterprise-grade security measures for your
          payout data, including encryption, access controls, audit logging, and
          secure infrastructure practices aligned with global financial
          standards.
        </p>
      </section>
         {/* ============================================= */}
{/* 11. DATA RETENTION & FINANCIAL RECORD KEEPING */}
{/* ============================================= */}

<section className="legal-section">

  <h2>11. Data Retention & Financial Record Keeping</h2>

  <p>
    DolRise retains payout and financial transaction records in accordance with
    applicable financial regulations, compliance standards, and internal audit
    requirements. Financial data retention is essential for maintaining platform
    integrity, preventing fraud, and ensuring legal compliance.
  </p>

  <p>
    Whenever a user initiates a withdrawal, sets up a payout method, or converts
    NC into fiat currency, a permanent transactional record is created. These
    records may include:
  </p>

  <ul>
    <li>Requested NC withdrawal amount</li>
    <li>Applicable processing fees</li>
    <li>Net payout amount</li>
    <li>Fiat conversion value</li>
    <li>Currency used</li>
    <li>Exchange rate snapshot at the time of transaction</li>
    <li>Transaction reference number</li>
    <li>Payout status (requested, processing, completed, rejected)</li>
    <li>Timestamps of creation and completion</li>
  </ul>

  <h3>11.1 Legal & Regulatory Compliance</h3>

  <p>
    Financial regulations in many jurisdictions require companies to retain
    transaction records for a defined minimum period, typically between five (5)
    to ten (10) years. DolRise complies with applicable Anti-Money Laundering
    (AML), financial reporting, and accounting regulations.
  </p>

  <h3>11.2 Fraud Prevention & Audit Requirements</h3>

  <p>
    Transactional records are retained to support fraud investigations,
    dispute resolution, internal audits, and regulatory inspections.
    These records help ensure transparency and accountability across the
    DolRise financial ecosystem.
  </p>

  <h3>11.3 Immutable Financial Records</h3>

  <p>
    Once a payout transaction reaches a final status (such as “completed” or
    “rejected”), its financial record becomes part of the permanent ledger.
    Such records cannot be modified or deleted in order to preserve financial
    integrity and audit traceability.
  </p>

  <h3>11.4 Secure Storage Infrastructure</h3>

  <p>
    All payout-related data is stored within secured infrastructure protected
    by encryption, role-based access controls (RBAC), and audit logging
    mechanisms. Access to financial records is strictly limited to authorized
    personnel responsible for compliance and security oversight.
  </p>

  <h3>11.5 Account Closure & Data Minimization</h3>

  <p>
    If a user closes their account, DolRise may anonymize or remove certain
    non-essential personal data where legally permissible. However, financial
    transaction records and ledger entries may be retained as required by law
    and regulatory compliance obligations.
  </p>

  <h3>11.6 Global Compliance Standards</h3>

  <p>
    DolRise’s data retention framework aligns with global fintech best
    practices, accounting standards, and financial compliance frameworks.
    Where user requests for data deletion conflict with regulatory retention
    obligations, applicable legal requirements shall take precedence.
  </p>

</section>
{/* ============================================================
   SECTION 13 – CONTACT INFORMATION & DATA PROTECTION
============================================================ */}

<section className="legal-section">
  <h2>13. Contact Information & Data Protection Oversight</h2>

  <p>
    DolRise is committed to transparency, accountability, and full compliance 
    with applicable data protection and financial regulations. If you have 
    questions, concerns, or requests related to this Payout Privacy Policy 
    or the processing of your personal data, you may contact us directly.
  </p>

  <p>
    All privacy-related inquiries concerning payout activities, financial 
    processing, identity verification, or data protection matters should 
    be directed to our dedicated privacy contact channel:
  </p>

  <div className="legal-contact-box">
    <p><strong>Email:</strong> privacy@dolrise.com</p>
    <p><strong>Subject Line Recommendation:</strong> Payout Privacy Inquiry</p>
  </div>

  <p>
    DolRise maintains internal oversight mechanisms to ensure that payout-
    related data is processed lawfully, fairly, and securely. Where required 
    by law, we may designate a Data Protection Officer (DPO) or equivalent 
    compliance authority responsible for monitoring adherence to privacy 
    regulations and responding to regulatory inquiries.
  </p>

  <p>
    We aim to respond to all legitimate privacy requests within a reasonable 
    timeframe and in accordance with applicable laws. In certain cases, we 
    may require identity verification before processing sensitive requests 
    involving financial or payout-related information.
  </p>

  <p>
    If you believe your privacy rights have been violated, you may also 
    contact your local data protection authority or regulatory body in 
    accordance with the laws of your jurisdiction.
  </p>
</section>
{/* ============================================================
   SECTION 14 – RIGHT TO MODIFY THIS PAYOUT PRIVACY POLICY
============================================================ */}

<section className="legal-section">
  <h2>14. Right to Modify This Payout Privacy Policy</h2>

  <p>
    DolRise reserves the right to update, amend, revise, or modify this 
    Payout Privacy Policy at any time. Such modifications may be necessary 
    to reflect changes in applicable laws and regulations, evolving financial 
    compliance requirements, technological advancements, or improvements 
    to our payout infrastructure and services.
  </p>

  <p>
    As a financial technology platform operating across multiple jurisdictions, 
    DolRise must adapt to regulatory developments, supervisory guidance, and 
    cross-border compliance standards. Where new legal or regulatory obligations 
    arise, we may update this Policy to ensure continued compliance with 
    applicable data protection, anti-money laundering, tax, and financial 
    oversight requirements.
  </p>

  <p>
    We may also revise this Policy when introducing new payout features, 
    integrating additional payment providers, enhancing exchange mechanisms, 
    or implementing new identity verification or risk monitoring procedures. 
    Such updates ensure transparency regarding how payout-related personal 
    data is processed.
  </p>

  <p>
    In the event of material changes that significantly affect how your 
    personal data is processed, we will take reasonable steps to notify you. 
    Notification may occur through in-dashboard announcements, email 
    communication, or prominent notices on the DolRise platform.
  </p>

  <p>
    Your continued use of DolRise payout services after any update becomes 
    effective constitutes your acknowledgment and acceptance of the revised 
    Policy. We encourage users to review this Policy periodically to remain 
    informed about how payout-related data is handled.
  </p>

  <p>
    DolRise will not materially reduce the level of data protection provided 
    under this Policy without appropriate notice or lawful basis. All 
    modifications are intended to enhance transparency, compliance, and 
    security standards.
  </p>

  <p>
    If you have questions regarding updates to this Policy, you may contact 
    us using the contact information provided in Section 13 above.
  </p>
</section>
{/* ============================================================
   SECTION 15 – POLICY VERSION & EFFECTIVE DATE
============================================================ */}

<section className="legal-section legal-final-section">
  <h2>15. Policy Version & Effective Date</h2>

  <div className="legal-meta-box">
    <p><strong>Policy Name:</strong> DolRise Payout Privacy Policy</p>
    <p><strong>Version:</strong> 1.0.0.0</p>
    <p><strong>Date Issued:</strong> February 18, 2026</p>
    <p><strong>Effective Date:</strong> February 25, 2026</p>
  </div>

  <p>
    This Payout Privacy Policy was formally issued on February 18, 2026, 
    and becomes effective on February 25, 2026. From the Effective Date 
    onward, this Policy governs the collection, use, processing, storage, 
    and protection of payout-related personal and financial data within 
    the DolRise platform.
  </p>

  <p>
    Version 1.0.0.0 represents the initial official release of the 
    DolRise Payout Privacy Policy. Future revisions, amendments, or 
    regulatory updates will be reflected through an incremented version 
    number and updated effective date.
  </p>

  <p>
    DolRise maintains internal policy version control mechanisms to ensure 
    legal traceability, regulatory alignment, and audit readiness. Users 
    are encouraged to review the version number and effective date when 
    referencing this Policy.
  </p>

  <p>
    This document constitutes the official and binding Payout Privacy 
    Policy of DolRise as of the Effective Date stated above.
  </p>
</section>
         <div className="policy-footer">
        </div>

      </div>
    </div>
  );
}
