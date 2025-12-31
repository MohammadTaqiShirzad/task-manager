import React from "react";
import { LuSearch } from "react-icons/lu";
import { useSearch } from "../utils/search-context";

const Search = () => {
  const { query, setQuery } = useSearch();

  return (
    <div className="w-full border border-gray-500 rounded-xl py-1 px-4 lg:py-2 shadow-md shadow-gray-300 flex items-center gap-3">
      <LuSearch />
      <input
        type="text"
        placeholder="Search reports, names, tasks..."
        className="w-full outline-0 bg-transparent"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;
