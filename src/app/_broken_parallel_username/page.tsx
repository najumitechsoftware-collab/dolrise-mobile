export default function UserProfile({ params }: any) {
  return (
    <main>
      <h1>@{params.username}</h1>
      <p>Public posts by this user</p>
    </main>
  );
}
