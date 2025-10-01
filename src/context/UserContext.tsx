import React from 'react';
import { jwtDecode } from 'jwt-decode';

export type AuthContextProps = {
  token: string | null;
  isAuthenticated: boolean;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = React.createContext<AuthContextProps | null>(null);

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth deve estar dentro do Provider');
  }
  return context;
};

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = React.useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const validateToken = (token: string | null) => {
    if (!token) {
      return false;
    }

    try {
      const decoded = jwtDecode(token);

      if (!decoded.exp) return false;

      const isExpire = decoded.exp < Date.now() / 1000;

      if (isExpire) return false;

      return true;
    } catch (e: unknown) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
  };

  React.useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return;
    }

    if (validateToken(token)) {
      setToken(token);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
