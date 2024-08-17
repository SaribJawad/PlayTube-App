import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

interface ProtectedRouteProps {
  component: React.ComponentType;
  path?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  path,
}) => {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  if (path === "/auth" || path === "/auth/signup") {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default ProtectedRoute;
