"use client";
import { createContext, useContext, useState } from "react";

/* =========================================================
   KYC PAYLOAD TYPE – STRICT & PRODUCTION SAFE
========================================================= */

export type IdType =
  | "passport"
  | "national_id"
  | "driver_license";

export interface KycPayload {
  /* 🌍 Location */
  country?: string;

  /* 🏦 Bank */
  bank_name?: string;
  account_number?: string;
  iban?: string;
  routing_number?: string;
  swift_code?: string;

  /* 🪪 ID */
  id_type?: IdType;
  id_number?: string;
  id_front_url?: string;
  id_back_url?: string;

  /* 📸 Selfie */
  selfie_url?: string;
}

/* =========================================================
   CONTEXT TYPE
========================================================= */

interface KycContextValue {
  data: KycPayload;
  update: (values: Partial<KycPayload>) => void;
  reset: () => void;
  isComplete: () => boolean;
}

/* =========================================================
   CONTEXT
========================================================= */

const KycContext = createContext<KycContextValue | null>(null);

/* =========================================================
   PROVIDER
========================================================= */

export function KycProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<KycPayload>({});

  function update(values: Partial<KycPayload>) {
    setData((prev) => ({
      ...prev,
      ...values,
    }));
  }

  function reset() {
    setData({});
  }

  /* =========================================================
     VALIDATION CHECK BEFORE SUBMIT
  ========================================================= */

  function isComplete(): boolean {
    if (!data.country) return false;
    if (!data.bank_name) return false;

    if (
      !data.account_number &&
      !data.iban &&
      !data.routing_number
    ) {
      return false;
    }

    if (!data.id_type) return false;
    if (!data.id_number) return false;
    if (!data.id_front_url) return false;

    if (
      (data.id_type === "national_id" ||
        data.id_type === "driver_license") &&
      !data.id_back_url
    ) {
      return false;
    }

    if (!data.selfie_url) return false;

    return true;
  }

  return (
    <KycContext.Provider
      value={{ data, update, reset, isComplete }}
    >
      {children}
    </KycContext.Provider>
  );
}

/* =========================================================
   HOOK
========================================================= */

export function useKyc() {
  const ctx = useContext(KycContext);
  if (!ctx) {
    throw new Error(
      "useKyc must be used inside KycProvider"
    );
  }
  return ctx;
}
