import NotificationItem from "./NotificationItem";
import { Notification } from "@/lib/notifications/api";

export default function NotificationGroup({
  title,
  items,
}: {
  title: string;
  items: Notification[];
}) {
  if (!items.length) return null;

  return (
    <section className="mb-6">
      <h3 className="text-sm font-semibold opacity-70 mb-2">
        {title}
      </h3>

      <div className="flex flex-col gap-2">
        {items.map(n => (
          <NotificationItem
            key={n.id}
            notification={n}
          />
        ))}
      </div>
    </section>
  );
}
