import React from "react";
import SideMenu from "../components/SideMenu";
import Main from "../components/Main";

const HomePage: React.FC = () => {
  return (
    <div className="h-screen text-white pt-20 ">
      <SideMenu />
      <Main />
    </div>
  );
};

export default HomePage;
