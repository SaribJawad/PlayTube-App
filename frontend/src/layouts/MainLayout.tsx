import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SideMenu from "../components/SideMenu";
import { Flip, ToastContainer } from "react-toastify";

const MainLayout: React.FC = () => {
  return (
    <div className="bg-black h-screen ">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        transition={Flip}
      />
      <Navbar />
      <SideMenu />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
