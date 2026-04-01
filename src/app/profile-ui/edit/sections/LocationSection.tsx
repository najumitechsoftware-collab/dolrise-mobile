"use client";

import { useEffect, useState } from "react";
import "./LocationSection.css";

/* ======================
   MOCK DATA (can grow later)
====================== */
const DATA: Record<string, Record<string, string[]>> = {
  Nigeria: {
    Kano: ["Dala", "Gwale", "Nasarawa"],
    Lagos: ["Ikeja", "Surulere", "Yaba"],
    Abuja: ["Gwagwalada", "Kuje", "Bwari"],
  },
  Ghana: {
    Accra: ["Ablekuma", "Ayawaso"],
    Kumasi: ["Asokwa", "Bantama"],
  },
};

/* ======================
   COMPONENT
====================== */
export default function LocationSection({
  value,
  saving,
  onSave,
  onBack,
}: {
  value?: string;
  saving: boolean;
  onSave: (data: { location: string }) => void;
  onBack: () => void;
}) {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [step, setStep] = useState<"country" | "state" | "lga">("country");

  /* Prefill if exists */
  useEffect(() => {
    if (value) {
      const parts = value.split(",").map((p) => p.trim());
      setLga(parts[0] || "");
      setState(parts[1] || "");
      setCountry(parts[2] || "");
      setStep("lga");
    }
  }, [value]);

  /* FILTERS (REAL TIME) */
  const countryResults = Object.keys(DATA).filter((c) =>
    c.toLowerCase().includes(country.toLowerCase())
  );

  const stateResults =
    country && DATA[country]
      ? Object.keys(DATA[country]).filter((s) =>
          s.toLowerCase().includes(state.toLowerCase())
        )
      : [];

  const lgaResults =
    country && state && DATA[country]?.[state]
      ? DATA[country][state].filter((l) =>
          l.toLowerCase().includes(lga.toLowerCase())
        )
      : [];

  const finalLocation =
    country && state && lga
      ? `${lga}, ${state}, ${country}`
      : "";

  return (
    <div className="location-sheet">
      {/* HEADER */}
      <header className="location-header">
        <button className="location-back" onClick={onBack}>
          ← Back
        </button>
        <h2>Your location</h2>
        <p className="location-emotion">
          You control how visible your place is.  
          Share only what feels safe.
        </p>
      </header>

      {/* BODY */}
      <div className="location-body">
        {step === "country" && (
          <>
            <label>Country</label>
            <input
              autoFocus
              placeholder="Start typing your country…"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <ul className="suggestions">
              {countryResults.map((c) => (
                <li
                  key={c}
                  onClick={() => {
                    setCountry(c);
                    setStep("state");
                  }}
                >
                  {c}
                </li>
              ))}
            </ul>
          </>
        )}

        {step === "state" && (
          <>
            <label>State</label>
            <input
              autoFocus
              placeholder={`State in ${country}`}
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <ul className="suggestions">
              {stateResults.map((s) => (
                <li
                  key={s}
                  onClick={() => {
                    setState(s);
                    setStep("lga");
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          </>
        )}

        {step === "lga" && (
          <>
            <label>Local area</label>
            <input
              autoFocus
              placeholder="Local government / area"
              value={lga}
              onChange={(e) => setLga(e.target.value)}
            />
            <ul className="suggestions">
              {lgaResults.map((l) => (
                <li key={l} onClick={() => setLga(l)}>
                  {l}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* FOOTER */}
      <footer className="location-footer">
        <button
          className="save-btn"
          disabled={!finalLocation || saving}
          onClick={() => onSave({ location: finalLocation })}
        >
          {saving ? "Saving…" : "Save location"}
        </button>
      </footer>
    </div>
  );
}
