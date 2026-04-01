"use client";

import { useRouter } from "next/navigation";
import "./AboutUsSection.css";

interface AboutUsSectionProps {
  onBack: () => void;
}

export default function AboutUsSection({ onBack }: AboutUsSectionProps) {
  const router = useRouter();

  return (
    <div className="settings-sheet about-sheet">
      {/* HEADER */}
      <header className="sheet-header">
        <button onClick={onBack} className="settings-back">
          ← Back
        </button>
        <h2>About DolRise</h2>
        <p>Learn more about our values, care, and community</p>
      </header>

      {/* BODY */}
      <div className="sheet-body about-body">
        <div className="about-intro">
          <p>
            DolRise is an emotional-first social space built to help people
            express, reflect, and grow — calmly, safely, and without pressure.
          </p>
        </div>

        {/* LINKS */}
        <div className="about-links">
          <button
            className="about-link-card"
            onClick={() => router.push("/about")}
          >
            <div>
              <h3>About DolRise</h3>
              <p>Our story, purpose, and the heart behind DolRise</p>
            </div>
            <span>›</span>
          </button>

          <button
            className="about-link-card"
            onClick={() => router.push("/legal/privacy-policy")}
          >
            <div>
              <h3>Privacy & Safety</h3>
              <p>How we protect your space, emotions, and personal data</p>
            </div>
            <span>›</span>
          </button>

          <button
            className="about-link-card"
            onClick={() => router.push("/legal/terms-of-use")}
          >
            <div>
              <h3>Community Guidelines & Terms</h3>
              <p>The principles that keep DolRise respectful and safe</p>
            </div>
            <span>›</span>
          </button>

          <button
            className="about-link-card"
            onClick={() => router.push("/support")}
          >
            <div>
              <h3>Support & Care</h3>
              <p>Get help, ask questions, or reach out when you need support</p>
            </div>
            <span>›</span>
          </button>
        </div>
      </div>
    </div>
  );
}
