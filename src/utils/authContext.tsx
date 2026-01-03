import { createContext, useContext, useState, useEffect } from "react";

type SimpleAuthContextType = {
  hasToken: boolean;
  setHasToken: (value: boolean) => void;
};

const AuthContext = createContext<SimpleAuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ hasToken, setHasToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLoginUser = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useLoginUser must be used inside AuthProvider");
  }
  return ctx;
};
