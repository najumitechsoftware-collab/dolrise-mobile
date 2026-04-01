import { useRouter } from "next/navigation";

export default function NotificationItem({ data }: { data: any }) {
  const router = useRouter();

  return (
    <div
      className={`notification-card ${data.is_read ? "" : "unread"}`}
      onClick={() => data.deep_link && router.push(data.deep_link)}
    >
      <div className="message">
        {data.icon && <span className="icon">{data.icon}</span>}
        {data.message}
      </div>
      <div className="time">
        {new Date(data.created_at).toLocaleString()}
      </div>
    </div>
  );
}
