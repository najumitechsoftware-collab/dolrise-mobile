import Link from "next/link";

export default function UsersSection({ users = [], onSelect }: any) {
  if (!users.length) return null;

  return (
    <div className="search-section">
      <h4>People</h4>

      {users.map((u: any) => (
        <Link
          key={u.id}
          href={`/profile/${u.username}`}
          onClick={onSelect}
          className="search-item"
        >
          <img src={u.avatar_url || "/default-avatar.png"} />
          <div>
            <strong>{u.full_name}</strong>
            <span>@{u.username}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
