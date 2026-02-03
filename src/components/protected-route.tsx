import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/auth-provider";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { authState, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="font-mono text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    // Redirect to login page, saving the attempted location
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
