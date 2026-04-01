"use client";

import { useEffect, useState } from "react";

export interface WalletDashboard {
  balance: {
    available_nc: number;
    locked_nc: number;
  };
  withdrawal: {
    can_withdraw: boolean;
    reason?: string;
    next_unlock_at?: string;
  };
  kyc: {
    status: string;
  };
  recent_activity: {
    type: string;
    amount_nc: number;
    created_at: string;
    reference?: string;
  }[];
}

export function useWalletDashboard() {
  const [data, setData] = useState<WalletDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          "https://api.dolrise.com/api/wallet/dashboard",
          {
            credentials: "include",
          }
        );

        const json = await res.json();

        if (!res.ok || !json.success) {
          throw new Error(json.error || "FAILED");
        }

        setData(json.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { data, loading, error };
}
