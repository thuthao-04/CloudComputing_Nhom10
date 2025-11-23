"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

interface SearchBarProps {
  table: string;
  columns: string[];
  onResults: (data: any[]) => void;
  placeholder?: string;
}

export default function SearchBar({
  table,
  columns,
  onResults,
  placeholder = "Tìm kiếm...",
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    // Debounce 400ms
    const delayDebounce = setTimeout(async () => {
      try {
        let data, error;

        if (!query) {
          ({ data, error } = await supabase.from(table).select("*"));
        } else {
          const filterString = columns
            .map((col) => `${col}.ilike.%${query}%`)
            .join(",");

          ({ data, error } = await supabase
            .from(table)
            .select("*")
            .or(filterString));
        }

        if (error) throw error;
        onResults(data || []);
      } catch (error) {
        console.error("Search error:", error);
        onResults([]);
      }
    }, 400); 

    return () => clearTimeout(delayDebounce);
  }, [query, table, columns, onResults]);

  return (
    <div className="search-bar-container">
      <span className="search-icon">
        <i className="bi bi-search"></i>
      </span>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
    </div>
  );
}
