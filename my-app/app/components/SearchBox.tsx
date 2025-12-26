"use client";

import { useEffect, useRef, useState } from "react";

type Result = {
  id: number;
  title: string;
};

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // 🔹 Debounced Search
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      const res = await fetch(`/api/search?q=${query}`);
      const data = await res.json();
      setResults(data);
      setLoading(false);
      setActiveIndex(-1);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // 🔹 Keyboard Navigation
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!results.length) return;

    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev + 1) % results.length);
    }

    if (e.key === "ArrowUp") {
      setActiveIndex((prev) =>
        prev <= 0 ? results.length - 1 : prev - 1
      );
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      alert(`Selected: ${results[activeIndex].title}`);
      setQuery(results[activeIndex].title);
      setResults([]);
    }
  }

  return (
    <div style={{ width: "300px", position: "relative" }}>
      <input
        type="text"
        value={query}
        placeholder="Search products..."
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ width: "100%", padding: "8px" }}
      />

      {loading && <div style={{ fontSize: "12px" }}>Loading...</div>}

      {results.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            border: "1px solid #ccc",
            background: "#fff",
            listStyle: "none",
            margin: 0,
            padding: 0,
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 10,
          }}
        >
          {results.map((item, index) => (
            <li
              key={item.id}
              style={{
                padding: "8px",
                background:
                  index === activeIndex ? "#eee" : "#fff",
                cursor: "pointer",
              }}
              onMouseDown={() => {
                setQuery(item.title);
                setResults([]);
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
