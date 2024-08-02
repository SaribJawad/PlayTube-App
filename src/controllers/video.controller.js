import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/fileHandler.js";

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

  console.log("Video MIME type:", videoFile.mimetype);

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
    .json(new ApiResponse(200, createdVideo, "Video published succesfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video
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
