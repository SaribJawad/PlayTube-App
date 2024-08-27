import mongoose, { mongo } from "mongoose";
import { Comment } from "../models/comment.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  // Ensure the page and limit are integers
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  const verifyVideo = await Video.findById(videoId);

  if (!verifyVideo) {
    throw new ApiError(400, "Invalid ID");
  }

  const allComments = await Comment.aggregate([
    {
      $match: {
        video: new mongoose.Types.ObjectId(videoId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      },
    },
    {
      $addFields: {
        owner: { $arrayElemAt: ["$owner", 0] },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $project: {
        content: 1,
        video: 1,
        createdAt: 1,
        "owner.username": 1,
        "owner.fullname": 1,
        "owner.avatar.url": 1,
        "owner._id": 1,
      },
    },
  ])
    .skip((pageNumber - 1) * limitNumber)
    .limit(limitNumber);

  if (!allComments) {
    throw new ApiError(500, "Error while fetching comments");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, allComments, "Comments fetched successfully"));
});

const addComment = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { content } = req.body;

  if (!content) {
    throw new ApiError(400, "Comment content cannot be empty");
  }

  const comment = await Comment.create({
    content: content,
    video: videoId,
    owner: req.user?._id,
  });

  if (!comment) {
    throw new ApiError(500, "Something went wrong while creating the comment");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment created successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  if (!commentId) {
    throw new ApiError(400, "Invalid commentId");
  }

  const verifyComment = await Comment.findById(commentId);

  if (!verifyComment) {
    throw new ApiError(400, "Couldnt find the comment");
  }

  if (verifyComment.owner.toString() != req.user?._id) {
    throw new ApiError(400, "Only valid user can update comment");
  }

  if (!content || content.trim().length === 0) {
    throw new ApiError(400, "Comment content cannot be empty");
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: {
        content: content,
      },
    },
    {
      new: true,
    }
  );

  if (!updatedComment) {
    throw new ApiError(500, "Something went wrong while updating the comment");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedComment, "Comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!commentId) {
    throw new ApiError(400, "Invalid comment Id");
  }

  const deletedComment = await Comment.findByIdAndDelete(commentId);

  if (!deletedComment) {
    throw new ApiError(500, "Error while deleting the comment");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Successfully deleted the comment"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
