import React from "react";
import { MdModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const CommentPanel: React.FC = () => {
  return (
    <div id="comments" className=" w-full h-full flex flex-col gap-2 p-2">
      <h1>2342 Comments</h1>
      <div id="comment-input" className="flex items-center gap-3">
        <img
          className="w-8 h-8 rounded-full"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          alt=""
        />
        <input
          className=" placeholder:text-zinc-700 text-white text-[16px] w-[100%] p-2 outline-none  bg-zinc-900 rounded-lg "
          placeholder="Add a comment "
          type="text"
        />
      </div>
      <span className="h-[1px] border w-full mt-3 mb-3"></span>
      <div className="flex flex-col gap-10">
        <div
          id="comment"
          className="flex justify-start   items-start gap-3 h-auto "
        >
          <img
            className="w-8 h-8 rounded-full"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt=""
          />
          <div className="w-full">
            <div className="w-full flex items-center justify-between">
              <h1 className="text-sm">
                Sarib jawad .{" "}
                <span className="text-xs text-zinc-500">2 hours ago</span>
              </h1>
              <button>
                <MdModeEditOutline size={18} />
              </button>
            </div>
            <p className="text-xs inline-block text-zinc-500 hover:text-white">
              <Link to={""}> @saribjawad</Link>
            </p>
            <p className="text-sm mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              libero mollitia tenetur officia neque sequi magnam eius nulla
              praesentium facilis!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentPanel;
