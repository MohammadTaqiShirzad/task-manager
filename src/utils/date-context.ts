import { createContext, useContext } from "react";

export const DateContext = createContext<string>("");

export const useDate = () => useContext(DateContext);
