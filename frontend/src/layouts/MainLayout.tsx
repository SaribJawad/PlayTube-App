import React from "react";
import { Outlet } from "react-router-dom";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <header className="h-6 bg-black">Header</header>
      <Outlet />
      <footer>Footer</footer>
    </div>
  );
};

export default MainLayout;
