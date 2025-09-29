import React from "react";
import { jwtDecode } from "jwt-decode";

export type AuthContextProps = {
  token: string | null;
  isAuthenticated: boolean;
  logout: () => void;
};

export const AuthContext = React.createContext<AuthContextProps | null>(null);

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth deve estar dentro do Provider");
  }
  return context;
};

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = React.useState<string | null>(null);

  const validateToken = (token: string | null) => {
    if (!token) {
      return false;
    }

    try {
      const decoded = jwtDecode(token);

      if (decoded.exp) {
        const isExpire = decoded.exp < Date.now() / 1000;

        if (isExpire) return false;
      }
      return true;
    } catch (e: unknown) {
      return false;
    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    if (validateToken(token)) {
      setToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
