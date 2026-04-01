"use client";
import "./DeleteGoodbye.css";

export default function DeleteGoodbye() {
  return (
    <div className="goodbye-wrapper">
      <h2>Account Scheduled for Deletion</h2>
      <p>
        Your account has been scheduled for deletion.
        You have 30 days to cancel this request.
      </p>

      <a href="/" className="return-btn">
        Return to homepage
      </a>
    </div>
  );
}
