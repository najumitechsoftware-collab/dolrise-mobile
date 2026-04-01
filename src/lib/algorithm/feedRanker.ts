/* ============================================================
   🌟 DolRise Feed Intelligence v1 — Lightweight Algorithm
   ============================================================ */

/*
  This engine ranks posts based on:
  - Engagement Score
  - Emotional Score
  - Freshness
  - Flowlink Priority
  - Content Type Priority
*/

interface Post {
  id: number;
  type: string;
  content: string;
  mood?: string | null;

  feels_count: number;
  reflects_count: number;
  reecho_count: number;
  views?: number;

  isFlowlink?: boolean;
  created_at: string;
}

/* -------------------------
     1. Emotional Dictionary
   ------------------------- */
const emotionalKeywords: any = {
  happy: ["happy", "joy", "excited", "alhamdulillah", "blessing"],
  sad: ["sad", "hurt", "pain", "missing", "alone"],
  love: ["love", "heart", "dear", "sweet"],
  anger: ["angry", "hate", "annoyed", "mad"],
  motivate: ["rise", "grind", "focus", "goal", "win"],
};

/* -------------------------
     2. Emotional Scoring
   ------------------------- */
function getEmotionalScore(text: string): number {
  const lower = text.toLowerCase();

  let score = 0;

  for (const group in emotionalKeywords) {
    for (const word of emotionalKeywords[group]) {
      if (lower.includes(word)) {
        switch (group) {
          case "happy":
            score += 5;
            break;
          case "sad":
            score += 8;
            break;
          case "love":
            score += 4;
            break;
          case "anger":
            score -= 2;
            break;
          case "motivate":
            score += 3;
            break;
        }
      }
    }
  }

  return score;
}

/* -------------------------
     3. Freshness Score
   ------------------------- */
function getFreshnessScore(created_at: string): number {
  const now = new Date();
  const postTime = new Date(created_at);
  const diff = (now.getTime() - postTime.getTime()) / (1000 * 60); // minutes

  if (diff < 30) return 25;
  if (diff < 720) return 15; // < 12 hours
  if (diff < 2880) return 5; // < 2 days

  return 0;
}

/* -------------------------
     4. Engagement Score
   ------------------------- */
function getEngagementScore(p: Post): number {
  return (
    (p.feels_count || 0) * 1.5 +
    (p.reflects_count || 0) * 3 +
    (p.reecho_count || 0) * 4.5 +
    (p.views || 0) * 0.3
  );
}

/* -------------------------
     5. Content Type Boost
   ------------------------- */
function getTypeBoost(type: string): number {
  if (type.includes("video")) return 12;
  if (type.includes("photo")) return 6;
  if (type.includes("voice")) return 10;

  return 3; // text default
}

/* -------------------------
     6. Flowlink Priority
   ------------------------- */
function getFlowPriority(isFlow: boolean | undefined): number {
  return isFlow ? 25 : 0;
}

/* -------------------------
     7. FINAL RANKING ENGINE
   ------------------------- */
export function rankFeed(posts: Post[]): Post[] {
  return posts
    .map((p) => {
      const finalScore =
        getEngagementScore(p) +
        getEmotionalScore(p.content || "") +
        getFreshnessScore(p.created_at) +
        getFlowPriority(p.isFlowlink) +
        getTypeBoost(p.type);

      return { ...p, _score: finalScore };
    })
    .sort((a, b) => b._score - a._score); // highest score first
}
