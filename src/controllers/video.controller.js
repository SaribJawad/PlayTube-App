import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/fileHandler.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title && !description) {
    throw new ApiError(400, "All fields are required");
  }

  const videoFile = req?.files?.videoFile?.[0];
  const thumbnailLocalPath = req?.files?.thumbnail?.[0]?.path;

  if (!videoFile || !thumbnailLocalPath) {
    throw new ApiError(400, "Both video and thumbnail are required");
  }

  const allowedVideoMimeTypes = [
    "video/mp4",
    "video/mkv",
    "video/x-matroska",
    "video/webm",
    "video/ogg",
    "video/avi",
    "video/mov",
    "video/wmv",
    "video/flv",
  ];

  if (!allowedVideoMimeTypes.includes(videoFile.mimetype)) {
    throw new ApiError(400, "Invalid file type. Only video files are allowed");
  }

  const videoFileLocalPath = videoFile.path;

  // Upload on cloudinary
  const uploadedVideo = await uploadOnCloudinary(videoFileLocalPath);
  const uploadedThumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  if (!uploadedVideo) {
    throw new ApiError(500, "Failed to upload video to Cloudinary");
  }

  if (!uploadedThumbnail) {
    throw new ApiError(500, "Failed to upload thumbnail to Cloudinary");
  }

  // create user object in db
  const video = await Video.create({
    videoFile: {
      url: uploadedVideo?.url,
      public_id: uploadedVideo?.public_id,
    },
    thumbnail: {
      url: uploadedThumbnail?.url,
      public_id: uploadedThumbnail?.public_id,
    },
    title: title,
    description: description,
    duration: uploadedVideo?.duration,
    owner: req?.user?._id,
  });

  const createdVideo = await Video.findById(video._id);

  if (!createdVideo) {
    throw new ApiError(500, "Something went wrong while creating the video");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdVideo, "Video published successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  const video = await Video.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(videoId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $lookup: {
              from: "subscriptions",
              localField: "_id",
              foreignField: "channel",
              as: "subscribers",
            },
          },
          {
            $addFields: {
              subscribers: {
                $size: "$subscribers",
              },
              isSubscribed: {
                $in: [req?.user, "$subscribers.subscriber"],
              },
            },
          },
        ],
      },
    },
    {
      $addFields: {
        owner: {
          $first: "$owner",
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video fetched successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { title, description } = req.body;
  const thumbnailLocalPath = req.file?.path;

  const currentVideo = await Video.findById(videoId);

  if (currentVideo?.owner.toString != req.user?._id) {
    throw new ApiError(
      400,
      "You can't update video as you are not owner of this video"
    );
  }

  if (!title && !description && !thumbnailLocalPath) {
    // Validate input
    throw new ApiError(
      400,
      "At least one of title, description, or thumbnail must be provided"
    );
  }

  let oldPublicId;
  let thumbnail;

  // Handle thumbnail update
  if (thumbnailLocalPath) {
    thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    if (!thumbnail) {
      throw new ApiError(400, "Error while uploading thumbnail on cloudinary");
    }

    const outDatedVideo = await Video.findById(videoId).select("thumbnail");
    oldPublicId = outDatedVideo.thumbnail.public_id;
  }

  // Prepare update fields
  const updateFields = {};
  if (title) updateFields.title = title;
  if (description) updateFields.description = description;
  if (thumbnailLocalPath)
    updateFields.thumbnail = {
      url: thumbnail.url,
      public_id: thumbnail.public_id,
    };

  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: updateFields,
    },
    {
      new: true,
    }
  );

  if (!updatedVideo) {
    throw new ApiError(404, "Video not found");
  }

  if (oldPublicId) {
    await deleteFromCloudinary(oldPublicId);
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Video updated successfully", updatedVideo));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  const currentVideo = await Video.findById(videoId).select(
    "thumbnail videoFile owner"
  );

  if (!currentVideo) {
    throw new ApiError(400, "Invalid video ID");
  }

  if (currentVideo?.owner.toString() != req.user?._id) {
    return new ApiError(
      "You cannot delete the video as you are not the owner of the video"
    );
  }

  // removing video history data
  await User.updateMany({
    watchedHistory: {
      $in: [videoId],
    },
    $pull: {
      watchedHistory: videoId,
    },
  });

  const videoFile = currentVideo.videoFile.public_id;
  const thumbnailFile = currentVideo.thumbnail.public_id;

  const deletedVideo = await Video.findByIdAndDelete(videoId);

  if (!deletedVideo) {
    throw new ApiError(400, "Error while deleting the video");
  }

  // delete files from cloudinary
  try {
    await deleteFromCloudinary(videoFile, "video");
    await deleteFromCloudinary(thumbnailFile);
  } catch (error) {
    throw new ApiError(500, "Error while deleting files from cloudinary");
  }

  res
    .status(200)
    .json(new ApiResponse(200, deleteVideo, "Video deleted successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
