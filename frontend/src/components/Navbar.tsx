import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import Slider from "./Slider";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  function toggleMenu(): void {
    setIsOpen((prev) => !prev);
  }

  return (
    <nav className="z-10 w-screen border-b border-zinc-800 fixed h-20 bg-black text-white flex items-center justify-between px-4">
      <h1 className="text-center md:text-[23px] text-[20px] font-bold font-Montserrat mx-3">
        Play<span className="text-red-700">Tube</span>
      </h1>

      <div
        className={`w-full top-20 left-0 fixed sm:static  md:w-[600px]  items-center sm:flex  sm:opacity-100 ${
          openSearch ? "opacity-100 block" : "opacity-0 hidden"
        } `}
      >
        <input
          type="text"
          name="query"
          placeholder="Search"
          className=" placeholder-zinc-700 border border-zinc-800 font-medium  bg-black text-white text-[16px] sm:rounded-l-full w-[100%] py-2 px-4 outline-none"
        />
        <button className="hidden sm:block bg-zinc-700 py-[11px] px-4 rounded-r-full ">
          <IoIosSearch size={20} />
        </button>
      </div>

      <div>
        <img
          className=" hidden sm:block max-w-12 rounded-full mx-3 "
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png  "
          alt="Profile"
        />
      </div>

      {/* Hamburger */}
      <div className="flex items-center sm:hidden m-2 gap-3">
        <button>
          <span onClick={() => setOpenSearch((prev) => !prev)}>
            <IoIosSearch size={27} />
          </span>
        </button>
        <button onClick={toggleMenu} aria-label="Toggle navigation ">
          <span>
            <RxHamburgerMenu size={28} />
          </span>
        </button>
      </div>

      {/* Slidder */}
      <Slider isOpen={isOpen} toggleMenu={toggleMenu} />
    </nav>
  );
};

export default Navbar;
