"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PinSection from "./components/PinSection";
import ConfirmSection from "./components/ConfirmSection";
import "./styles/withdraw.css";

const MIN = 100;
const MAX_SINGLE = 5000;
const FEE_PERCENT = 3; // 🔥 match backend default

export default function WithdrawPage() {
  const router = useRouter();

  const [amount, setAmount] = useState<number | "">("");
  const [transactionPin, setTransactionPin] = useState("");

  const [availableBalance, setAvailableBalance] = useState(0);
  const [defaultMethod, setDefaultMethod] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const numericAmount = typeof amount === "number" ? amount : 0;
  const fee =
    numericAmount > 0
      ? Math.floor((numericAmount * FEE_PERCENT) / 100)
      : 0;

  const net =
    numericAmount > 0 ? numericAmount - fee : 0;

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    async function load() {
      try {
        const [walletRes, methodRes] =
          await Promise.all([
            fetch(
              "https://api.dolrise.com/api/wallet/dashboard",
              { credentials: "include" }
            ),
            fetch(
              "https://api.dolrise.com/api/wallet/payout/methods",
              { credentials: "include" }
            ),
          ]);

        if (!walletRes.ok) {
          router.replace("/login");
          return;
        }

        const walletData =
          await walletRes.json();
        const methodData =
          await methodRes.json();

        setAvailableBalance(
          walletData?.data?.balance
            ?.available_nc ?? 0
        );

        if (methodData.success) {
          const defaultM =
            methodData.data.find(
              (m: any) =>
                m.is_default && m.is_active
            );
          setDefaultMethod(defaultM || null);
        }
      } catch (err) {
        console.error(
          "Withdraw load error:",
          err
        );
      }
    }

    load();
  }, [router]);

  /* ================= HELPERS ================= */

  function handleAmountChange(
    value: string
  ) {
    if (!value) {
      setAmount("");
      return;
    }

    const num = Number(value);
    if (!isNaN(num)) {
      setAmount(num);
    }
  }

  function isValidPin(pin: string) {
    return /^\d{6,8}$/.test(pin);
  }

  /* ================= SUBMIT ================= */

  async function handleSubmit() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        "https://api.dolrise.com/api/wallet/payout",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            amount_nc: numericAmount,
            pin: transactionPin,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log(
          "Withdrawal error:",
          data
        );

        throw new Error(
          data?.error ||
            data?.message ||
            "Withdrawal failed"
        );
      }

      router.push("/wallet");
    } catch (err: any) {
      setError(
        err.message ||
          "Unexpected server error"
      );
    } finally {
      setLoading(false);
    }
  }

  const canSubmit =
    numericAmount >= MIN &&
    numericAmount <= MAX_SINGLE &&
    numericAmount <= availableBalance &&
    isValidPin(transactionPin) &&
    defaultMethod;

  /* ================= UI ================= */

  return (
    <div className="withdraw-container">
      <h1 className="withdraw-title">
        Secure Withdrawal
      </h1>

      <div className="withdraw-card">
        <h2>Available Earnings</h2>

        <div className="balance-box">
          <span>
            Available Balance
          </span>
          <strong>
            {availableBalance} NC
          </strong>
        </div>

        <div className="withdraw-field">
          <label>
            Withdrawal Amount (NC)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) =>
              handleAmountChange(
                e.target.value
              )
            }
            placeholder="Enter amount"
          />
        </div>

        <div className="withdraw-breakdown">
          <div>
            <span>
              Processing Fee
            </span>
            <span>
              {fee} NC
            </span>
          </div>

          <div>
            <span>
              Net After Fee
            </span>
            <strong>
              {net > 0 ? net : 0} NC
            </strong>
          </div>
        </div>
      </div>

      {defaultMethod && (
        <div className="withdraw-card">
          <h2>
            Payment Destination
          </h2>

          {defaultMethod.bank_account && (
            <>
              <p>
                <strong>
                  {
                    defaultMethod
                      .bank_account
                      .bank_name
                  }
                </strong>
              </p>

              <p>
                Account: ****
                {
                  defaultMethod
                    .bank_account
                    .account_number?.slice(
                      -4
                    )
                }
              </p>

              <p>
                Currency:{" "}
                {
                  defaultMethod.currency
                }
              </p>
            </>
          )}

          <button
            className="edit-method-btn"
            onClick={() =>
              router.push(
                "/wallet/settings/payout-methods"
              )
            }
          >
            Edit Method
          </button>
        </div>
      )}

      <PinSection
        transactionPin={transactionPin}
        setTransactionPin={
          setTransactionPin
        }
      />

      {error && (
        <div className="withdraw-error">
          {error}
        </div>
      )}

      <ConfirmSection
        disabled={
          !canSubmit || loading
        }
        amount={numericAmount}
        net={net}
        loading={loading}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
