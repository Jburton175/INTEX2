import React, { JSX } from "react";
import { Navigate } from "react-router-dom";

export interface RoleProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

const getUserRole = (): string | null => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.role || null;
  } catch {
    return null;
  }
};

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ children, allowedRoles }) => {
  const role = getUserRole();

  if (!role) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" replace />;

  return children;
};

export default RoleProtectedRoute;
