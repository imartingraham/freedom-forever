import React, { useState, useEffect } from "react";

export default function SearchInput({ onSearchLeads, defaultValue }) {
  const [query, setQuery] = useState(defaultValue);
  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);
  return (
    <form className="max-w-md mx-auto">
      <div className="relative">
        <input
          value={query || ""}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearchLeads(e.target.value);
          }}
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-400 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search by Name or Email"
          required
        />
      </div>
    </form>
  );
}
