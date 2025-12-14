import { Navigate } from "react-router-dom";
import { type ReactNode } from "react";
import { useAuth } from "../context/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  role?: "admin" | "user";
}

export default function ProtectedRoute({
  children,
  role,
}: ProtectedRouteProps) {
  const { user, token } = useAuth();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
