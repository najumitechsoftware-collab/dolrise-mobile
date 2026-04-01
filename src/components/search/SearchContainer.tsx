"use client";

import { useEffect, useState } from "react";
import SearchResults from "./SearchResults";
import SearchInput from "./ui/SearchInput";

export default function SearchContainer() {
  const [query, setQuery] = useState("");

  return (
    <div className="search-page">
      <SearchInput
        value={query}
        onChange={setQuery}
        onFocus={() => {}}
        onClose={() => setQuery("")}
      />

      {query ? (
        <SearchResults query={query} onSelect={() => {}} />
      ) : (
        <div className="search-welcome">
          <h3>Ask LUMI ✨</h3>
          <p>
            Search people, feelings, trending thoughts
            <br />
            or ask LUMI anything about DolRise.
          </p>

          <div className="search-suggestions">
            <span>🌱 Who feels like me?</span>
            <span>🔥 Trending emotions</span>
            <span>🧠 What is DolRise?</span>
            <span>💫 Find inspiring posts</span>
          </div>
        </div>
      )}
    </div>
  );
}
