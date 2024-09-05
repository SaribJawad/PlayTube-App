import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  const { tweetContent } = req.body;

  if (!tweetContent) {
    throw new ApiError(400, "Tweet content is required");
  }

  const createdTweet = await Tweet.create({
    content: tweetContent,
    owner: req.user?._id,
  });

  if (!createdTweet) {
    throw new ApiError(500, "Error while creating tweet");
  }

  const aggregatedTweet = await Tweet.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(createdTweet._id) },
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
        owner: {
          $first: "$owner",
        },
      },
    },
    {
      $project: {
        _id: 1,
        content: 1,
        owner: {
          username: "$owner.username",
          fullname: "$owner.fullname",
          avatar: "$owner.avatar.url",
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, aggregatedTweet, "Created tweet successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const userTweets = await Tweet.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
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
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "tweet",
        as: "likes",
      },
    },
    {
      $addFields: {
        likes: "$likes.likedBy",
      },
    },
    {
      $unwind: "$owner",
    },
    {
      $project: {
        _id: 1,
        content: 1,
        owner: {
          _id: 1,
          username: 1,
          fullname: 1,
          avatar: { url: 1 },
        },
        createdAt: 1,
        likes: 1,
      },
    },
  ]);

  console.log(userTweets);

  if (!userTweets) {
    throw new ApiError(500, "Error while fetching user's tweets");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, userTweets, "Tweets fetched successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const { tweetContent } = req.body;

  if (!tweetContent) {
    throw new ApiError(400, "Tweet content is required");
  }

  const currentTweet = await Tweet.findById(tweetId);

  if (currentTweet.owner.toString() != req.user._id) {
    throw new ApiError(
      400,
      "You can not update the tweet as you are not the owner of this tweet"
    );
  }

  const updatedTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      $set: {
        content: tweetContent,
      },
    },
    {
      new: true,
    }
  );

  if (!updateTweet) {
    throw new ApiError(500, "Error while updating the tweet");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedTweet, "Tweet updated successfulyy"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  const deletedTweet = await Tweet.findByIdAndDelete(tweetId);

  if (!deleteTweet) {
    throw new ApiError(500, "Error while deleting the tweet");
  }

  res
    .status(200)
    .json(new ApiResponse(200, deletedTweet, "Tweet deleted successfully"));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
