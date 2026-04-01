"use client";

import { useEffect, useState } from "react";
import "./payment-methods.css";

interface Props {
  router: any;
}

interface PayoutMethod {
  id: number;
  method_type: string;
  payout_scope: string;
  country_code: string;
  currency: string;
  is_default: boolean;
  is_active: boolean;
  bank_account?: {
    bank_name: string;
    account_number: string;
  };
  card_account?: {
    brand: string;
    last4: string;
  };
  fintech_account?: {
    provider_name: string;
    account_identifier: string;
  };
}

export default function PaymentMethodsSection({ router }: Props) {
  const [methods, setMethods] = useState<PayoutMethod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMethods() {
      try {
        const res = await fetch(
          "https://api.dolrise.com/api/wallet/payout/methods",
          { credentials: "include" }
        );

        const data = await res.json();

        if (data?.success) {
          setMethods(data.data);
        }
      } catch (err) {
        console.error("Failed to load payout methods", err);
      } finally {
        setLoading(false);
      }
    }

    loadMethods();
  }, []);

  async function setDefault(methodId: number) {
    await fetch(
      "https://api.dolrise.com/api/wallet/payout/set-default",
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method_id: methodId }),
      }
    );

    setMethods((prev) =>
      prev.map((m) => ({
        ...m,
        is_default: m.id === methodId,
      }))
    );
  }

  return (
    <div className="wallet-card payout-methods-card">

      <div className="card-header">
        <h2>Payout Methods</h2>
        <button
          className="add-method-btn"
          onClick={() =>
            router.push("/wallet/settings/payment-methods/new")
          }
        >
          + Add Method
        </button>
      </div>

      {loading ? (
        <div className="soft-loading">
          Loading payout methods…
        </div>
      ) : methods.length === 0 ? (
        <div className="empty-state">
          <p>No payout method added yet.</p>
          <button
            onClick={() =>
              router.push(
                "/wallet/settings/payment-methods/new"
              )
            }
          >
            Add First Method
          </button>
        </div>
      ) : (
        <div className="method-list">
          {methods.map((method) => (
            <div
              key={method.id}
              className={`method-item ${
                method.is_default ? "default" : ""
              }`}
            >
              <div className="method-left">
                <div className="method-type">
                  {method.method_type.toUpperCase()}
                </div>

                <div className="method-details">
                  {method.bank_account && (
                    <>
                      <strong>
                        {method.bank_account.bank_name}
                      </strong>
                      <span>
                        ****
                        {method.bank_account.account_number.slice(
                          -4
                        )}
                      </span>
                    </>
                  )}

                  {method.card_account && (
                    <>
                      <strong>
                        {method.card_account.brand}
                      </strong>
                      <span>
                        ****{method.card_account.last4}
                      </span>
                    </>
                  )}

                  {method.fintech_account && (
                    <>
                      <strong>
                        {method.fintech_account.provider_name}
                      </strong>
                      <span>
                        {
                          method.fintech_account
                            .account_identifier
                        }
                      </span>
                    </>
                  )}

                  <div className="method-meta">
                    {method.country_code} •{" "}
                    {method.currency} •{" "}
                    {method.payout_scope}
                  </div>
                </div>
              </div>

              <div className="method-right">
                {method.is_default ? (
                  <span className="default-badge">
                    Default
                  </span>
                ) : (
                  <button
                    className="set-default-btn"
                    onClick={() =>
                      setDefault(method.id)
                    }
                  >
                    Set Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
