import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const user = req.user?._id;

  if (!name || !description) {
    throw new ApiError(400, "Name and description field is required");
  }

  const playlist = await Playlist.create({
    name: name,
    description: description,
    owner: user,
  });

  if (!playlist) {
    throw new ApiError(500, "Error while creating playlist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist created successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const userPlaylist = await Playlist.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "videos",
        foreignField: "_id",
        as: "videos",
      },
    },
    {
      $addFields: {
        videoCount: {
          $size: "$videos",
        },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        videos: {
          _id: 1,
          thumbnail: 1,
        },
        videoCount: 1,
        updatedAt: 1,
        createdAt: 1,
        owner: 1,
      },
    },
  ]);

  if (!userPlaylist) {
    throw new ApiError(500, "Error while fetching user's playlist");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, userPlaylist, "User's playlist fetched successfully")
    );
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  const playlist = await Playlist.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(playlistId),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "videos",
        foreignField: "_id",
        as: "videos",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",

              pipeline: [
                {
                  $project: {
                    _id: 1,
                    username: 1,
                    fullname: 1,
                    avatar: {
                      url: 1,
                    },
                  },
                },
              ],
            },
          },
          {
            $unwind: {
              path: "$owner",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $addFields: {
              views: {
                $size: "$views",
              },
            },
          },
        ],
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
            $project: {
              _id: 1,
              username: 1,
              fullname: 1,
              avatar: {
                url: 1,
              },
            },
          },
        ],
      },
    },
    {
      $unwind: "$owner",
    },
    {
      $addFields: {
        videoCount: {
          $size: "$videos",
        },
      },
    },
    {
      $project: {
        videos: {
          _id: 1,
          thumbnail: {
            url: 1,
          },
          title: 1,
          description: 1,
          views: 1,
          duration: 1,
          owner: 1,
          createdAt: 1,
          playlist: 1,
        },
        name: 1,
        description: 1,
        videoCount: 1,
        createdAt: 1,
        owner: 1,
      },
    },
  ]);

  if (playlist.length === 0) {
    throw new ApiError(500, "Error while fetching playlist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist[0], "Playlist fetched successfully"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  const playlist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $push: { videos: videoId },
    },
    {
      new: true,
    }
  );

  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, playlist, "Successfully added video to the playlist")
    );
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  const playlist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $pull: { videos: videoId },
    },
    {
      new: true,
    }
  );

  if (!playlist || playlist.length === 0) {
    throw new ApiError(500, "Error while deleting video from the playlist");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        playlist,
        "Successfully deleted video from the playlist"
      )
    );
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const loggedInUserId = req.user?._id;

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }

  if (playlist.owner.toString() != loggedInUserId) {
    throw new ApiError(
      400,
      "You cannot delete the playlist as you are not owner of the playlist"
    );
  }

  const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId);

  if (!deletedPlaylist) {
    throw new ApiError(500, "Error while deleting the playlist");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, deletedPlaylist, "Playlist deleted successfully")
    );
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;

  if (!name && !description) {
    throw new ApiError(
      400,
      "Atleast one field name or description is required"
    );
  }

  const playlist = await Playlist.findById(playlistId).select("owner");

  if (!playlist) {
    throw new ApiError(400, "Invalid playlist Id");
  }

  if (playlist.owner.toString() != req.user?._id) {
    throw new ApiError(
      400,
      "You cannot update the playlist as you are not the owner"
    );
  }

  const query = {};
  if (name) query.name = name;
  if (description) query.description = description;

  const updatedPlaylist = await Playlist.findByIdAndUpdate(playlistId, query, {
    new: true,
  });

  if (!updatePlaylist) {
    throw new ApiError(500, "Error while updating playlist");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedPlaylist, "Playlist updated successfully")
    );
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
