import React, { FormEvent, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import Slider from "./Slider";
import { Link, useNavigate } from "react-router-dom";
import useGetSearchVideos from "../customHooks/useGetSearchVideos";
import { useAppSelector } from "../app/hooks";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const loggedInUser = useAppSelector((state) => state?.auth?.user);
  const { refetch } = useGetSearchVideos();
  const navigate = useNavigate();

  function toggleMenu(): void {
    setIsOpen((prev) => !prev);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    navigate(`/searchResult/${searchQuery.trim()}`);
    setSearchQuery("");
    setOpenSearch(false);
  }

  return (
    <nav className="z-10 w-screen border-b border-zinc-800 fixed h-20 bg-black text-white flex items-center justify-between px-4">
      <Link to={""}>
        <h1 className="text-center md:text-[23px] text-[20px] font-bold font-Montserrat mx-3">
          Play<span className="text-red-700">Tube</span>
        </h1>
      </Link>

      <form
        onSubmit={(e) => handleSubmit(e)}
        className={`w-full top-20 left-0 fixed sm:static  md:w-[600px]  items-center sm:flex  sm:opacity-100 ${
          openSearch ? "opacity-100 block" : "opacity-0 hidden"
        } `}
      >
        <input
          type="text"
          name="query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className=" placeholder-zinc-700 border border-zinc-800 font-medium  bg-black text-white text-[16px] sm:rounded-l-full w-[100%] py-2 px-4 outline-none"
        />
        <button className="hidden sm:block bg-zinc-700 py-[11px] px-4 rounded-r-full ">
          <IoIosSearch size={20} />
        </button>
      </form>

      {/* profile icon */}
      <div>
        <Link to={`/profile/${loggedInUser?._id}/${loggedInUser?.username}`}>
          <img
            className=" hidden sm:block max-w-12 rounded-full mx-3 "
            src={loggedInUser?.avatar.url}
            alt="Profile"
          />
        </Link>
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
