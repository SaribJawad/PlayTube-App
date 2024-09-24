import React from "react";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { Navigate } from "react-router-dom";
import useCheckAuthStatus from "../customHooks/useCheckAuthStatus";
import LoadingSpinner from "../components/LoadingSpinner";

interface PublicRouteProps {
  component: React.ComponentType;
  path?: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ component: Component }) => {
  const { isLoading } = useCheckAuthStatus();
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  if (isLoading) {
    return (
      <div className=" w-full h-screen bg-black  flex items-center justify-center min-h-full  sm:pl-[70px] lg:pl-[260px]">
        <LoadingSpinner width="8" height="8" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default PublicRoute;
