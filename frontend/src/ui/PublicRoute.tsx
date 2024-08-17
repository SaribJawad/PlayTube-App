import React, { useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  component: React.ComponentType;
  path?: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  component: Component,
  path,
}) => {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default PublicRoute;
