import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user?._id;

  const isLiked = await Like.findOne({
    video: videoId,
    likedBy: userId,
  });

  if (isLiked) {
    try {
      const unlike = await Like.findByIdAndDelete(isLiked._id);

      return res
        .status(200)
        .json(new ApiResponse(200, unlike, "Video unliked successfully"));
    } catch {
      throw new ApiError(500, "Error while unliking the video");
    }
  } else {
    try {
      const like = await Like.create({
        likedBy: userId,
        video: videoId,
      });

      return res
        .status(200)
        .json(new ApiResponse(200, like, "Video liked successfully"));
    } catch {
      throw new ApiError(500, "Error while liking the video");
    }
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user?._id;

  const isLiked = await Like.findOne({
    comment: commentId,
    likedBy: userId,
  });

  if (isLiked) {
    try {
      const unlike = await Like.findByIdAndDelete(isLiked?._id);

      return res
        .status(200)
        .json(new ApiResponse(200, unlike, "Comment unliked successfully"));
    } catch {
      throw new ApiError(500, "Error while unliking the comment");
    }
  } else {
    try {
      const like = await Like.create({
        comment: commentId,
        likedBy: userId,
      });

      return res
        .status(200)
        .json(new ApiResponse(200, like, "Comment liked successfully"));
    } catch {
      throw new ApiError(500, "Error while liking the comment");
    }
  }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const userId = req.user?._id;

  const isLiked = await Like.findOne({
    tweet: tweetId,
    likedBy: userId,
  });

  if (isLiked) {
    try {
      const unlike = await Like.findByIdAndDelete(isLiked?._id);

      return res
        .status(200)
        .json(new ApiResponse(200, unlike, "Tweet unliked successfully"));
    } catch {
      throw new ApiError(500, "Error while unliking the tweet");
    }
  } else {
    try {
      const like = await Like.create({
        likedBy: userId,
        tweet: tweetId,
      });

      return res
        .status(200)
        .json(new ApiResponse(200, like, "Tweet liked successfully"));
    } catch {
      throw new ApiError(500, "Error while liking the tweet");
    }
  }
});

const getLikedVideos = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  try {
    const likedVideos = await Like.find({
      likedBy: userId,
      video: { $ne: null },
    }).populate({
      path: "video",
      select: "title duration views thumbnail.url  owner",
      populate: {
        path: "owner",
        select: "username fullname avatar.url",
      },
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, likedVideos, "Liked videos fetched successfully")
      );
  } catch {
    throw new ApiError(500, "Error while fetching all the liked video");
  }
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
