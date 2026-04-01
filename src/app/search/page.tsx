import { Suspense } from "react";
import SearchClient from "./SearchClient";

export const dynamic = "force-dynamic";

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchClient />
    </Suspense>
  );
}

function SearchLoading() {
  return <div style={{ padding: 24, opacity: 0.6 }}>Searching DolRise…</div>;
}
