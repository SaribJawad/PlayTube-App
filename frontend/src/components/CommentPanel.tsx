import React, { FormEvent, useState } from "react";
import useGetVideoComments from "../customHooks/useGetVideoComments";
import { BiCommentCheck } from "react-icons/bi";
import { useAppSelector } from "../app/hooks";
import Comment from "./Comment";
import useAddComment from "../customHooks/useAddComment";
import { Flip, toast, ToastContainer } from "react-toastify";
import useUpdateComment from "../customHooks/useUpdateComment";

const CommentPanel: React.FC = () => {
  const { mutate: addComment } = useAddComment();
  const { mutate: updatedComment } = useUpdateComment();
  const { invalidateComment } = useGetVideoComments();
  const [comment, setComment] = useState<string>("");
  const user = useAppSelector((state) => state.auth.user);
  const { comments } = useAppSelector((state) => state.comment);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!comment) {
      toast.error("Please provide a comment to post.");
      return;
    }
    addComment(comment, {
      onSuccess: () => {
        invalidateComment();
        setComment("");
        toast.success("Comment added successfully!");
      },
    });
  }

  function handleUpdate(id: string, newContent: string) {
    if (newContent.trim() === "") {
      toast.error("Comment cannot be empty");
      return;
    }
    updatedComment(
      { content: newContent, commentId: id },
      {
        onSuccess: () => {
          invalidateComment();
          toast.success("Comment updated successfully");
        },
      }
    );
  }

  return (
    <div id="comments" className=" w-full h-full flex flex-col gap-2 p-2">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        transition={Flip}
      />
      <h1>{comments.length} Comments</h1>
      <div id="comment-input" className="flex items-center gap-3">
        <img className="w-8 h-8 rounded-full" src={user?.avatar.url} alt="" />
        <form
          onSubmit={handleSubmit}
          className="w-full flex items-center gap-3"
        >
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className=" placeholder:text-zinc-700 text-white text-[16px] w-[100%] p-2 outline-none  bg-zinc-900 rounded-lg "
            placeholder="Add a comment"
            name="content"
            type="text"
          />
          <button type="submit">
            <BiCommentCheck size={30} />
          </button>
        </form>
      </div>
      <span className="h-[1px] border w-full mt-3 mb-3"></span>
      <div className="flex flex-col gap-5">
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            userId={user?._id}
            handleUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentPanel;
