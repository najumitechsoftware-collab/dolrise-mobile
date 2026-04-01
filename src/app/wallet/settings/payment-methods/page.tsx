"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./payment-methods.css";

interface PayoutMethod {
  id: number;
  method_type: string;
  payout_scope: string;
  country_code: string;
  currency: string;
  is_default: boolean;
  is_active: boolean;
  verification_status?: string;
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

export default function PaymentMethodsPage() {
  const router = useRouter();
  const [methods, setMethods] = useState<PayoutMethod[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    loadMethods();
  }, []);

  async function setDefault(methodId: number) {
    try {
      await fetch(
        "https://api.dolrise.com/api/wallet/payout/set-default",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            method_id: methodId,
          }),
        }
      );

      setMethods((prev) =>
        prev.map((m) => ({
          ...m,
          is_default: m.id === methodId,
        }))
      );
    } catch (err) {
      console.error("Set default failed", err);
    }
  }

  async function deleteMethod(methodId: number) {
    if (!confirm("Are you sure you want to remove this payout method?")) {
      return;
    }

    try {
      await fetch(
        `https://api.dolrise.com/api/wallet/payout/method/${methodId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      setMethods((prev) =>
        prev.filter((m) => m.id !== methodId)
      );
    } catch (err) {
      console.error("Delete failed", err);
    }
  }

  return (
    <div className="pm-page-container">
      {/* Header */}
      <div className="pm-page-header">
        <h1>Manage Payout Methods</h1>
        <p>
          Configure and manage your global payout destinations securely.
        </p>

        <button
          className="pm-add-btn"
          onClick={() =>
            router.push(
              "/wallet/settings/payment-methods/new"
            )
          }
        >
          + Add New Method
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="soft-loading">
          Loading payout methods…
        </div>
      ) : methods.length === 0 ? (
        <div className="pm-empty-state">
          <p>No payout methods added yet.</p>
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
        <div className="pm-method-grid">
          {methods.map((method) => (
            <div
              key={method.id}
              className={`pm-method-card ${
                method.is_default ? "default" : ""
              }`}
            >
              <div className="pm-method-header">
                <span className="pm-method-type">
                  {method.method_type.toUpperCase()}
                </span>

                {method.is_default && (
                  <span className="pm-default-badge">
                    Default
                  </span>
                )}
              </div>

              <div className="pm-method-body">
                {/* Bank */}
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

                {/* Card */}
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

                {/* Fintech */}
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

                <div className="pm-method-meta">
                  {method.country_code} •{" "}
                  {method.currency} •{" "}
                  {method.payout_scope}
                </div>
              </div>

              <div className="pm-method-actions">
                {!method.is_default && (
                  <button
                    className="pm-set-default"
                    onClick={() =>
                      setDefault(method.id)
                    }
                  >
                    Set Default
                  </button>
                )}

                <button
                  className="pm-delete-btn"
                  onClick={() =>
                    deleteMethod(method.id)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
