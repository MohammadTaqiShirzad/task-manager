import { createContext, useContext } from "react";

type SearchContextValue = {
  query: string;
  setQuery: (q: string) => void;
};

export const SearchContext = createContext<SearchContextValue | null>(null);

export const useSearch = () => {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within SearchContext.Provider");
  return ctx;
};
