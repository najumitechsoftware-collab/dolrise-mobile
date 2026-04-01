import axios from "axios";

const API = "https://api.dolrise.com/api/feed/lumi";

export type LumiMode = "space" | "moments" | "notes" | "rising";

/* ===============================
   LUMI FEED RESPONSE SHAPE
================================ */
export type LumiReason = {
  type: "interest" | "flowlink" | "rising" | "explore" | "fresh";
  message: string;
};

export type LumiFeedItem = {
  id: number;
  type: string;
  author_id: number;
  lumi_reason?: LumiReason;
  [key: string]: any;
};

export type LumiFeedResponse = {
  source: "feed";
  engine: "lumi";
  mode: LumiMode;
  count: number;
  feed: LumiFeedItem[];
};

/* ===============================
   FETCH LUMI FEED
================================ */
export async function fetchLumiFeed(
  mode: LumiMode = "space",
  limit = 20,
): Promise<LumiFeedResponse> {
  const res = await axios.get<LumiFeedResponse>(API, {
    params: { mode, limit },
    withCredentials: true,
  });

  return res.data;
}
