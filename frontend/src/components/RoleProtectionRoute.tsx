import React, { JSX, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export interface RoleProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ children, allowedRoles }) => {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch(
          "https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/pingauth",
          { credentials: "include" }
        );

        const data = await res.json();
        console.log("[RoleProtectedRoute] /pingauth:", data);

        if (res.ok && allowedRoles.includes(data.role)) {
          setAuthorized(true);
        } else {
          console.warn("User is not authorized for this route.");
        }
      } catch (err) {
        console.error("Error checking /pingauth:", err);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [allowedRoles]);

  if (loading) return <p>Checking access...</p>;
  if (!authorized) return <Navigate to="/unauthorized" replace />;
  return children;
};

export default RoleProtectedRoute;
