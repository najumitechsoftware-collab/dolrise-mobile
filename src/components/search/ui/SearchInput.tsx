"use client";

import { Search, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onFocus: () => void;
  onClose: () => void;
}

export default function SearchInput({
  value,
  onChange,
  onFocus,
  onClose,
}: Props) {
  return (
    <div className="search-input-wrapper">
      <Search size={20} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        placeholder="Search people, feelings, posts… or ask LUMI"
        autoFocus
      />
      {value && (
        <button onClick={() => onChange("")}>
          <X size={16} />
        </button>
      )}
    </div>
  );
}
