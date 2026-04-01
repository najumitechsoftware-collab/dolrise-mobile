import { Notification } from "./api";

export type NotificationGroupKey =
  | "system"
  | "engagement"
  | "connections"
  | "milestones";

export function groupNotifications(
  notifications: Notification[]
): Record<NotificationGroupKey, Notification[]> {
  return {
    system: notifications.filter(n =>
      ["welcome", "how_it_works", "system"].includes(n.type)
    ),

    engagement: notifications.filter(n =>
      ["post_engagement", "reflect", "reecho"].includes(n.type)
    ),

    connections: notifications.filter(n =>
      n.type === "flow"
    ),

    milestones: notifications.filter(n =>
      n.extra?.kind === "first_post"
    ),
  };
}
