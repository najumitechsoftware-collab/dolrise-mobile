const API_BASE = "/api/linkchat";

/* ===============================
   CORE FETCH WRAPPER
=============================== */
async function apiFetch<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw data || { message: "API error" };
  }

  return data;
}

/* ===============================
   📥 INBOX
   Active + Pending (sent) + Rejected (sent)
=============================== */
export function fetchInbox() {
  return apiFetch<{
    conversations: any[];
  }>(`${API_BASE}/inbox`);
}

/* ===============================
   💬 SINGLE CONVERSATION
=============================== */
export function fetchConversation(conversationId: number) {
  return apiFetch<{
    me: { id: number };
    otherUser: any;
    messages: any[];
  }>(`${API_BASE}/conversations/${conversationId}`);
}

/* ===============================
   🔍 SEARCH USERS
   (username | full_name | email)
=============================== */
export function searchUsers(query: string) {
  return apiFetch<{
    users: any[];
  }>(
    `${API_BASE}/search-users?q=${encodeURIComponent(query)}`,
  );
}

/* ===============================
   📨 SEND CHAT REQUEST
   Emotional-safe
=============================== */
export async function sendChatRequest(
  targetUserId: number,
  intent?: string,
  reason?: string,
) {
  return apiFetch<{
    success: boolean;
    alreadySent?: boolean;
    conversationId?: number;
    message: string;
  }>(`${API_BASE}/requests/send`, {
    method: "POST",
    body: JSON.stringify({
      targetUserId,
      intent,
      reason,
    }),
  });
}

/* ===============================
   📥 INCOMING REQUESTS
=============================== */
export function getIncomingRequests() {
  return apiFetch<{
    success: boolean;
    requests: {
      id: number; // conversationId
      creator: any;
    }[];
  }>(`${API_BASE}/requests/incoming`);
}

/* ===============================
   📤 SENT REQUESTS (optional)
=============================== */
export function getSentRequests() {
  return apiFetch<{
    success: boolean;
    requests: any[];
  }>(`${API_BASE}/requests/sent`);
}

/* ===============================
   ✅ ACCEPT REQUEST
=============================== */
export function acceptRequest(conversationId: number) {
  return apiFetch<{
    success: boolean;
    message: string;
  }>(`${API_BASE}/requests/${conversationId}/accept`, {
    method: "POST",
  });
}

/* ===============================
   ❌ DECLINE REQUEST
=============================== */
export function declineRequest(conversationId: number) {
  return apiFetch<{
    success: boolean;
    message: string;
  }>(`${API_BASE}/requests/${conversationId}/decline`, {
    method: "POST",
  });
}
