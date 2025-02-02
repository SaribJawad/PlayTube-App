import { v2 as cloudinary } from "cloudinary";

const uploadOnCloudinary = async (fileBuffer) => {
  try {
    if (!fileBuffer) {
      return null;
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );

      const readStream = new Readable({
        read() {
          this.push(fileBuffer);
          this.push(null);
        },
      });

      readStream.pipe(uploadStream);
    });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
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
