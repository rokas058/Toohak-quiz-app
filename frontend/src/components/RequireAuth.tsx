import { useAuth0 } from "@auth0/auth0-react";
import { PublicAppRoutes } from "@models/PublicRoutes";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    // with replace: navigation replaces the current entry,
    // so “back” won’t take you back to the route you just got redirected from
    return <Navigate to={PublicAppRoutes.HOME} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
