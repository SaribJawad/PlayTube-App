import React, { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import usePublishVideo from "../customHooks/usePublishVideo";
import { Flip, toast, ToastContainer } from "react-toastify";

interface FormValues {
  videoFile: File;
  thumbnail: File;
  title: string;
  description: string;
}

type HandleClose = () => void;

interface VideoPublishFormProps {
  handleClosePopup: HandleClose;
}

const schema = Yup.object().shape({
  videoFile: Yup.mixed<File>()
    .required("A video file is required")
    .test("fileType", "Unsupported file format", (value) => {
      return (
        value &&
        [
          "video/mp4",
          "video/webm",
          "video/mp4",
          "video/mkv",
          "video/x-matroska",
          "video/webm",
          "video/ogg",
          "video/avi",
          "video/mov",
          "video/wmv",
          "video/flv",
        ].includes(value.type)
      );
    }),
  thumbnail: Yup.mixed<File>()
    .required("A thumbnail image is required")
    .test("fileSize", "The file is too large", (value) => {
      return value && value.size <= 2000000;
    })
    .test("fileType", "Unsupported file format", (value) => {
      return value && ["image/jpeg", "image/png"].includes(value.type);
    }),
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description must be at most 200 characters"),
});

const VideoPublishForm: React.FC<VideoPublishFormProps> = ({
  handleClosePopup,
}) => {
  const {
    mutateAsync: publishVideo,
    isPending,
    error,
    status,
  } = usePublishVideo();
  const [isDragging, setIsDragging] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    await publishVideo(data);

    if (error) {
      toast.error(error.message);
    } else {
      setTimeout(() => {
        toast.success("Video uploaded successfully");
      }, 500);
    }

    if (status === "idle") {
      handleClosePopup();
    }
  };

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);

      const file = event.dataTransfer.files[0];
      if (file) {
        setValue("videoFile", file, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        transition={Flip}
      />
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-md p-4 text-center w-[100%] flex flex-col  items-center gap-5  ${
          isDragging ? " bg-zinc-700" : "border-zinc-700"
        }`}
      >
        {isDragging ? (
          <p className="text-white">Release to upload the file</p>
        ) : (
          <p>Drag and drop a video file here or click to upload</p>
        )}

        <Controller
          control={control}
          name="videoFile"
          render={({ field }) => (
            <input
              type="file"
              onChange={(event) => {
                if (event.target.files?.[0]) {
                  field.onChange(event.target.files[0]);
                }
              }}
              className="hidden"
              id="fileUpload"
            />
          )}
        />
        <label
          htmlFor="fileUpload"
          className=" flex items-center justify-center gap-2   button-animation px-3 py-2  rounded-md text-center  bg-red-700 hover:bg-red-600 transition duration-300 w-auto sm:m-0  "
        >
          Choose Video File
        </label>
      </div>

      {errors.videoFile && (
        <p className="text-red-500 text-sm mt-1">{errors.videoFile.message}</p>
      )}

      <div className="mt-4">
        <Controller
          control={control}
          name="thumbnail"
          render={({ field: { onChange } }) => (
            <>
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={(event) => {
                  if (event.target.files?.[0]) {
                    onChange(event.target.files[0]);
                  }
                }}
                id="thumbnailUpload"
                className="hidden"
              />
              <label
                htmlFor="thumbnailUpload"
                className="flex items-center justify-center gap-2   button-animation px-3 py-2  rounded-md text-center  bg-red-700 hover:bg-red-600 transition duration-300  w-60"
              >
                Choose Thumbnail
              </label>
            </>
          )}
        />
      </div>

      {errors.thumbnail && (
        <p className="text-red-500 text-sm mt-1">{errors.thumbnail.message}</p>
      )}

      <div className="mt-4">
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <input
              type="text"
              placeholder="Enter Title"
              {...field}
              className="border p-2 rounded-full w-full outline-none px-3 text-white bg-black border-zinc-800 placeholder:text-zinc-600"
            />
          )}
        />
      </div>

      {errors.title && (
        <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
      )}

      <div className="mt-4">
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <textarea
              placeholder="Enter Description"
              {...field}
              className="border p-2 rounded-xl w-full outline-none px-3 text-white bg-black border-zinc-800 placeholder:text-zinc-600 h-[200px]"
              rows={4}
            />
          )}
        />
      </div>

      {errors.description && (
        <p className="text-red-500 text-sm mt-1">
          {errors.description.message}
        </p>
      )}

      <button
        disabled={isPending}
        type="submit"
        className={` flex items-center justify-center gap-2  mx-auto button-animation px-3 py-2  rounded-md text-center  bg-red-700 hover:bg-red-600 transition duration-300   mt-4 ${
          isPending && "cursor-wait"
        }`}
      >
        {isPending ? "Uploading..." : "Submit"}
      </button>
    </form>
  );
};

export default VideoPublishForm;
