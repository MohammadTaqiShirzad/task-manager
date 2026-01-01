import { createContext, useContext } from "react";

type SimpleAuthContextType = {
  hasToken: boolean;
};

const AuthContext = createContext<SimpleAuthContextType | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const token = localStorage.getItem("token");

  return (
    <AuthContext.Provider value={{ hasToken: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLoginUser = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside SimpleAuthProvider");
  }
  return ctx;
};
