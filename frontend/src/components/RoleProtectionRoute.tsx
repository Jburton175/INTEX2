import React, { JSX, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./AuthorizeView";

export interface RoleProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ children, allowedRoles }) => {
  const user = useContext(UserContext);

  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" replace />;

  return children;
};

export default RoleProtectedRoute;
