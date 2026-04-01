/* =========================================================
   🧑‍🚀 DolRise Profile Header – FINAL (IMAGE-BASED)
========================================================= */

.profile-header {
  position: relative;
  background: #fdf6e9;
  z-index: 20;
  padding-bottom: 32px;
}

/* ======================
   BACK BUTTON
====================== */
.back-btn {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 60;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 13px;
  cursor: pointer;
}

/* ======================
   COVER
====================== */
.profile-cover {
  position: relative;
  height: 180px;
  border-bottom-left-radius: 22px;
  border-bottom-right-radius: 22px;
  overflow: hidden;
  background: #d4af37;
}

/* REAL COVER IMAGE */
.profile-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* FALLBACK IF NO COVER */
.profile-cover-fallback {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    #d4af37 0%,
    #c9a64d 40%,
    #9b7a2f 100%
  );
}

/* ======================
   AVATAR
====================== */
.profile-avatar-float {
  position: absolute;
  right: 18px;
  bottom: -42px;
  z-index: 50;
}

.profile-avatar {
  width: 84px;
  height: 84px;
  border-radius: 50%;
  object-fit: cover;
  background: #ffffff;
  border: 4px solid #fdf6e9;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.22);
}

.profile-avatar.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 24px;
}

/* ======================
   IDENTITY
====================== */
.profile-identity {
  margin-top: 64px;
  text-align: center;
}

.profile-name {
  font-size: 22px;
  font-weight: 700;
  color: #1f2937;
}

.profile-username {
  margin-top: 2px;
  font-size: 14px;
  color: #6b7280;
}

.profile-badge {
  display: inline-block;
  margin-top: 8px;
  padding: 6px 14px;
  font-size: 12px;
  border-radius: 999px;
  background: #efe2b3;
  color: #6b5200;
  font-weight: 600;
}

/* ======================
   STATS
====================== */
.profile-stats {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.profile-stats .stat strong {
  font-size: 18px;
  display: block;
}

.profile-stats .stat span {
  font-size: 12px;
  color: #6b7280;
}

/* ======================
   ACTION BUTTONS
====================== */
.profile-actions {
  display: flex;
  justify-content: center;
  gap: 14px;
  margin: 22px 16px;
}

.profile-actions .btn {
  padding: 10px 20px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 14px;
  border: none;
  cursor: pointer;
}

.profile-actions .btn.primary {
  background: #d4af37;
  color: #ffffff;
}

.profile-actions .btn.ghost {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: #1f2937;
}
