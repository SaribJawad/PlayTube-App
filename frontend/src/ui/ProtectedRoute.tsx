import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import useCheckAuthStatus from "../customHooks/useCheckAuthStatus";
import LoadingSpinner from "../components/LoadingSpinner";

interface ProtectedRouteProps {
  component: React.ComponentType;
  path?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  path,
}) => {
  const { isLoading } = useCheckAuthStatus();
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  if (isLoading) {
    return (
      <div className=" w-full h-screen bg-black  flex items-center justify-center min-h-full  sm:pl-[70px] lg:pl-[260px]">
        <LoadingSpinner width="8" height="8" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  if (path === "/auth" || path === "/auth/signup") {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default ProtectedRoute;
