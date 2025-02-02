import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

const uploadOnCloudinary = async (localFilePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteFromCloudinary = async (publicId, resource_type = "image") => {
  try {
    if (!publicId) return null;

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: `${resource_type}`,
    });
  } catch (error) {
    return error;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
