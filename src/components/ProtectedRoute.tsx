import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>Carregando...</p>;

  if (!isAuthenticated) return <Navigate to={'/login'} replace />;

  return children;
}

export default ProtectedRoute;
