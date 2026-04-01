import "./company.css";

export default function NajumiTechCompanyPage() {
  return (
    <main className="company-page">
      <section className="hero">
        <h1>Najumi Tech</h1>
        <p className="subtitle">
          A technology company building modern digital products and platforms.
        </p>
      </section>

      <section className="content">
        <p>
          Najumi Tech is a technology company registered in Nigeria, operating in
          the field of software development and digital communication.
        </p>

        <p>
          The company focuses on building modern digital products and platforms
          that help people communicate, express ideas, and share stories through
          technology.
        </p>

        <h2>What We Do</h2>
        <p>
          Najumi Tech develops digital products and online platforms, including
          communication tools and modern information systems.
        </p>

        <h2>Our Product</h2>
        <div className="product-card">
          <strong>DolRise</strong>
          <p>
            A social platform focused on emotional expression and storytelling,
            allowing users to share videos, photos, audio, and text.
          </p>
          <a
            href="https://dolrise.com"
            target="_blank"
            rel="noopener noreferrer"
            className="product-link"
          >
            Visit DolRise →
          </a>
        </div>

        <h2>Business Registration</h2>
        <p>
          Najumi Tech is a company registered with the Corporate Affairs
          Commission (CAC) of Nigeria.
        </p>

        <h2>Contact</h2>
        <p>Email: <strong>najumitechsoftware@gmail.com</strong></p>
        <p>Country: Nigeria</p>

        <h2>Legal</h2>
        <ul className="legal-links">
          <li>
            <a href="/company/najumi-tech/privacy">Privacy Policy</a>
          </li>
          <li>
            <a href="/company/najumi-tech/terms">Terms & Conditions</a>
          </li>
        </ul>
      </section>
    </main>
  );
}
