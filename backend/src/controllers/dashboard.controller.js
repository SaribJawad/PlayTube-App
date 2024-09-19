import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const channel = await User.aggregate([
    {
      $match: {
        _id: userId,
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "_id",
        foreignField: "owner",
        as: "videos",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "videos._id",
        foreignField: "video",
        as: "likes",
      },
    },

    {
      $addFields: {
        totalViews: {
          $sum: "$videos.views",
        },
        totalVideos: { $size: "$videos" },
        totalSubscribers: { $size: "$subscribers" },
        totalLikes: { $size: "$likes" },
      },
    },
    {
      $project: {
        totalViews: 1,
        totalVideos: 1,
        totalSubscribers: 1,
        totalLikes: 1,
      },
    },
  ]);

  res.status(200).json(new ApiResponse(200, channel[0]));
});

const getChannelVideos = asyncHandler(async (req, res) => {
  try {
    const allVideos = await Video.aggregate([
      {
        $match: {
          owner: req.user?._id,
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "video",
          as: "likes",
        },
      },
      {
        $addFields: {
          likes: {
            $size: "$likes",
          },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          isPublished: 1,
          createdAt: 1,
          likes: 1,
          description: 1,
          thumbnail: {
            url: 1,
          },
        },
      },
    ]);

    if (allVideos.length === 0) {
      new ApiResponse(200, allVideos, "Channel have no videos uploaded");
    }

    res
      .status(200)
      .json(new ApiResponse(200, allVideos, "All videos fetched successfull"));
  } catch {
    throw new ApiError(500, "Error while fetching all videos");
  }
});

export { getChannelStats, getChannelVideos };
