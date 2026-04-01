"use client";

type IdType =
  | "passport"
  | "national_id"
  | "driver_license";

export default function KycIdType({
  value,
  onChange,
}: {
  value: IdType | null;
  onChange: (v: IdType) => void;
}) {
  return (
    <div className="kyc-card">
      <h2>Select ID type</h2>

      <div className="kyc-options">
        {[
          {
            id: "passport",
            label: "Passport",
          },
          {
            id: "national_id",
            label: "National ID",
          },
          {
            id: "driver_license",
            label: "Driver’s License",
          },
        ].map((opt) => (
          <button
            key={opt.id}
            className={`kyc-option ${
              value === opt.id ? "active" : ""
            }`}
            onClick={() =>
              onChange(opt.id as IdType)
            }
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
