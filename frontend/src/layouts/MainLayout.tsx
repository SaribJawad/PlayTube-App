import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SideMenu from "../components/SideMenu";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = () => {
  return (
    <div className="bg-black h-screen ">
      <Navbar />
      <SideMenu />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
