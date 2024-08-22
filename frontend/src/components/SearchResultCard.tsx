import React from "react";
import { Link } from "react-router-dom";

const SearchResultCard: React.FC = () => {
  return (
    <div className="lg:h-[250px] custom:h-[220px] overflow-hidden w-full  custom:gap-4 flex custom:flex-row flex-col gap-1 custom:pt-3 p-4">
      <div className="relative  rounded-xl overflow-hidden hover:rounded-none transition-all duration-300 ease-in-out  lg:w-[380px] w-full custom:w-[350px]   h-full ">
        <Link to={""}>
          <img
            className="w-full h-full object-cover"
            src="https://plus.unsplash.com/premium_photo-1675368244448-b8cff9ffdb03?q=80&w=2003&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <span className="absolute bottom-2 text-sm bg-black bg-opacity-45 px-[5px] rounded-md right-2 z-5 text-center">
            12:22
          </span>
        </Link>
      </div>
      <div className="h-full custom:w-[calc(100%-400px)]  w-full flex flex-col gap-1 ">
        <h1 className="custom:text-lg text-md  ">nice video blah blah </h1>
        <span className="text-sm text-zinc-500">
          10.3k Views · 44 minutes ago{" "}
        </span>
        <div className="flex items-center gap-2 p-1">
          <img
            className="w-5 h-5 rounded-full"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt=""
          />
          <span className="text-sm text-zinc-500">Chai aur code</span>
        </div>
        <p className=" text-sm text-zinc-500 pt-5 hidden custom:line-clamp-3">
          Learn the basics of JavaScript, including variables, data types, and
          how to use them in your programs.
        </p>
      </div>
    </div>
  );
};

export default SearchResultCard;
