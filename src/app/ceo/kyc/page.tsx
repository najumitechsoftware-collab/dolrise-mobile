"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import KycReviewModal from "./components/KycReviewModal";
import "./kyc.css";

interface KycItem {
  id: number;
  full_name: string;
  country: string;
  status: string;
  created_at: string;
  bank_name: string;
  account_number: string;
  account_name: string;
  id_type: string;
  id_front_url: string;
  id_back_url?: string;
  selfie_url?: string;
  live_selfie_url: string;
  liveness_score?: number;
  user: {
    id: number;
    username: string;
    email: string;
    joined_date?: string;
  };
}

export default function CeoKycPage() {
  const router = useRouter();
  const [kycList, setKycList] = useState<KycItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<KycItem | null>(null);

  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("ceo_token");
    if (!token) {
      router.push("/ceo/login");
      return;
    }

    fetchKyc();
  }, []);

  const fetchKyc = async () => {
    try {
      const token = localStorage.getItem("ceo_token");
      const res = await axios.get(
        "https://api.dolrise.com/api/platform/kyc/pending",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setKycList(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = kycList.filter((k) => {
    const matchesSearch =
      k.user.username.toLowerCase().includes(search.toLowerCase()) ||
      k.full_name.toLowerCase().includes(search.toLowerCase()) ||
      k.user.email.toLowerCase().includes(search.toLowerCase());

    const matchesDate = date
      ? new Date(k.created_at).toDateString() ===
        new Date(date).toDateString()
      : true;

    return matchesSearch && matchesDate;
  });

  return (
    <div className="ceo-kyc-container">
      <h1>KYC Review Center</h1>

      <div className="kyc-search-bar">
        <input
          placeholder="Search by username, full name, or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {loading && <p>Loading KYC requests...</p>}

      <div className="ceo-kyc-grid">
        {filtered.map((kyc) => (
          <div key={kyc.id} className="ceo-kyc-card">
            <h3>{kyc.user.username}</h3>
            <p>{kyc.full_name}</p>
            <p>{kyc.country}</p>
            <p>
              {new Date(kyc.created_at).toLocaleDateString()}
            </p>

            <button
              className="review-btn"
              onClick={() => setSelected(kyc)}
            >
              Review
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <KycReviewModal
          kyc={selected}
          onClose={() => setSelected(null)}
          onRefresh={fetchKyc}
        />
      )}
    </div>
  );
}
