import React, { useEffect, useState } from "react";
import { MdModeEditOutline, MdOutlineDeleteOutline } from "react-icons/md";
import { FiSave } from "react-icons/fi";

import { Link } from "react-router-dom";
import { formatDate } from "../utils/getTimeAgo";
import { BiLike, BiSolidLike } from "react-icons/bi";
import useLikeToggleComment from "../customHooks/useLikeToggleComment";
import useGetVideoComments from "../customHooks/useGetVideoComments";
import { useAppSelector } from "../app/hooks";

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
  likes: string[];
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
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(comment.content);
  const { mutateAsync: LikeToggleComment } = useLikeToggleComment();
  const { invalidateComment } = useGetVideoComments();
  const loggedInUserId = useAppSelector((state) => state.auth.user?._id);

  const {
    _id: commentId,
    content,
    owner: {
      username,
      fullname,
      avatar: { url },
      _id,
    },
    likes,
    createdAt,
  } = comment;

  function handleSaveClick(commentId: string, editContent: string) {
    if (editContent !== content) {
      handleUpdate(commentId, editContent);
    }
    setIsEditing(editContent.trim() === "" ? true : false);
  }

  function handleDeleteClick(commentId: string) {
    handleDelete(commentId);
  }

  async function handleLike(commentId: string) {
    await LikeToggleComment(commentId, {
      onSuccess: () => {
        invalidateComment();
      },
    });
  }

  useEffect(() => {
    if (loggedInUserId) {
      setIsLiked(likes.includes(loggedInUserId));
    }
  }, [likes]);

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
              <button onClick={() => handleSaveClick(commentId, editContent)}>
                <FiSave size={18} />
              </button>
            ) : (
              <>
                <button onClick={() => setIsEditing((prev) => !prev)}>
                  <MdModeEditOutline size={18} />
                </button>

                <button onClick={() => handleDeleteClick(commentId)}>
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
        <button
          className="flex items-center gap-2 mt-3 "
          onClick={() => handleLike(commentId)}
        >
          {isLiked ? <BiSolidLike size={20} /> : <BiLike size={20} />}

          <span className="text-xs">{likes.length}</span>
        </button>
      </div>
    </div>
  );
};

export default Comment;
