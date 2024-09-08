import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const user = req.user?._id;

  const isSubscribed = await Subscription.findOne({
    channel: channelId,
    subscriber: user,
  });

  if (isSubscribed) {
    try {
      const unsubscribe = await Subscription.findByIdAndDelete(
        isSubscribed?._id
      );

      return res
        .status(200)
        .json(
          new ApiResponse(200, unsubscribe, "Channel unsubscribed successfully")
        );
    } catch {
      throw new ApiError(500, "Error while unsubscribing");
    }
  } else {
    try {
      const subscribe = await Subscription.create({
        channel: channelId,
        subscriber: user,
      });

      return res
        .status(200)
        .json(
          new ApiResponse(200, subscribe, "Channel subscribed successfully")
        );
    } catch {
      throw new ApiError(500, "Error while subscribing");
    }
  }
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  try {
    const channelSubscribers = await Subscription.find({
      channel: channelId,
      subscriber: { $ne: null },
    });

    if (channelSubscribers.length === 0) {
      return res
        .status(200)
        .json(
          new ApiResponse(200, [], "No subscribers found for this channel")
        );
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          channelSubscribers,
          "Subscribers fetched successfully"
        )
      );
  } catch {
    throw new ApiError(500, "Error while fetching subscribers");
  }
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;

  try {
    const subscribedChannels = await Subscription.aggregate([
      {
        $match: {
          subscriber: new mongoose.Types.ObjectId(subscriberId),
          channel: { $ne: null },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "channel",
          foreignField: "_id",
          as: "channel",
          pipeline: [
            {
              $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscriberCount",
              },
            },

            {
              $addFields: {
                subscriberCount: "$subscriberCount.subscriber",
              },
            },
          ],
        },
      },
      {
        $unwind: "$channel",
      },

      {
        $project: {
          _id: 1,
          subscriber: 1,
          channel: {
            _id: 1,
            username: 1,
            fullname: 1,
            avatar: {
              url: 1,
            },
            subscriberCount: 1,
          },
        },
      },
    ]);

    if (subscribedChannels.length === 0) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            subscribedChannels,
            "No subscribed channel found for user"
          )
        );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          subscribedChannels,
          "Subscribed channel fetched successfully"
        )
      );
  } catch {
    throw new ApiError(500, "Error while fetching subscribed channel");
  }
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
