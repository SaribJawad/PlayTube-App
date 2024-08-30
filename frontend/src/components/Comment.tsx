import React, { useState } from "react";
import { MdModeEditOutline, MdOutlineDeleteOutline } from "react-icons/md";
import { FiSave } from "react-icons/fi";

import { Link } from "react-router-dom";
import { formatDate } from "../utils/formateDate";

interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  video: string;
  owner: {
    username: string;
    fullname: string;
    avatar: {
      url: string;
    };
    _id: string;
  };
}

interface CommentProps {
  comment: Comment;
  userId: string | undefined;
  handleUpdate: (id: string, newContent: string) => void;
  handleDelete: (commendId: string) => void;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  userId,
  handleUpdate,
  handleDelete,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(comment.content);

  const {
    _id: commentId,
    content,
    owner: {
      username,
      fullname,
      avatar: { url },
      _id,
    },
    createdAt,
  } = comment;

  function handleSaveClick() {
    handleUpdate(commentId, editContent);
    setIsEditing(editContent.trim() === "" ? true : false);
  }

  function handleDeleteClick() {
    handleDelete(commentId);
  }

  return (
    <div
      id="comment"
      className="flex justify-start   items-start gap-3 h-auto "
    >
      <img className="w-8 h-8 rounded-full" src={url} alt="profile picture" />
      <div className="w-full">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-sm">
            {fullname} •{" "}
            <span className="text-xs text-zinc-500">
              {formatDate(createdAt)}
            </span>
          </h1>
          <div
            className={`${
              _id === userId ? "block" : "hidden"
            } flex gap-2 items-center`}
          >
            {isEditing ? (
              <button onClick={handleSaveClick}>
                <FiSave size={18} />
              </button>
            ) : (
              <>
                <button onClick={() => setIsEditing((prev) => !prev)}>
                  <MdModeEditOutline size={18} />
                </button>

                <button onClick={handleDeleteClick}>
                  <MdOutlineDeleteOutline size={18} />
                </button>
              </>
            )}
          </div>
        </div>
        <p className="text-xs  text-zinc-500  hover:text-white">
          <Link to={""}> @{username}</Link>
        </p>
        {isEditing ? (
          <div className="text-sm  w-full">
            <input
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              type="text"
              className="w-full mt-2 p-2 border-none outline-none bg-zinc-900 rounded-lg"
            />
          </div>
        ) : (
          <p className="text-sm mt-2">{content}</p>
        )}
      </div>
    </div>
  );
};

export default Comment;
