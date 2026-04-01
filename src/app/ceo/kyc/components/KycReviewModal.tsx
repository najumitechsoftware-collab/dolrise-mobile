"use client";

import axios from "axios";

export default function KycReviewModal({
  kyc,
  onClose,
  onRefresh,
}: any) {
  const handleApprove = async () => {
    const token = localStorage.getItem("ceo_token");

    await axios.post(
      `https://api.dolrise.com/api/platform/kyc/${kyc.id}/approve`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    onRefresh();
    onClose();
  };

  const handleReject = async () => {
    const reason = prompt("Enter rejection reason:");
    if (!reason) return;

    const token = localStorage.getItem("ceo_token");

    await axios.post(
      `https://api.dolrise.com/api/platform/kyc/${kyc.id}/reject`,
      { reason },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    onRefresh();
    onClose();
  };

  return (
    <div className="kyc-modal-overlay">
      <div className="kyc-modal">
        <div className="kyc-left">
          <h2>User Information</h2>

          <div className="info-block">
            <strong>Username:</strong> {kyc.user.username}
            <br />
            <strong>Email:</strong> {kyc.user.email}
            <br />
            <strong>Joined:</strong>{" "}
            {new Date(kyc.user.joined_date).toLocaleDateString()}
          </div>

          <div className="info-block">
            <strong>Full Name:</strong> {kyc.full_name}
            <br />
            <strong>Country:</strong> {kyc.country}
          </div>

          <div className="info-block">
            <strong>Bank:</strong> {kyc.bank_name}
            <br />
            <strong>Account Name:</strong> {kyc.account_name}
            <br />
            <strong>Account Number:</strong> {kyc.account_number}
          </div>

          <div className="info-block">
            <strong>ID Type:</strong> {kyc.id_type}
            <br />
            <strong>Liveness Score:</strong>{" "}
            {kyc.liveness_score || "N/A"}
          </div>
        </div>

        <div className="kyc-right">
          <img src={kyc.id_front_url} alt="ID Front" />
          {kyc.id_back_url && (
            <img src={kyc.id_back_url} alt="ID Back" />
          )}
          {kyc.selfie_url && (
            <img src={kyc.selfie_url} alt="Selfie" />
          )}
        </div>

        <div className="kyc-actions">
          <button className="reject-btn" onClick={handleReject}>
            Reject
          </button>
          <button className="approve-btn" onClick={handleApprove}>
            Approve
          </button>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
