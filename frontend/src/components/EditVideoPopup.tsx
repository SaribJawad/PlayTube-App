import React, { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import useUpdateVideo from "../customHooks/useUpdateVideo";

interface EditVidepPopupProps {
  video: {
    _id: string;
    thumbnail: {
      url: string;
    };
    likes: number;
    title: string;
    isPublished: boolean;
    description: string;
    createdAt: string;
  } | null;
  onClose: () => void;
}

interface FormValues {
  title?: string;
  description?: string;
  thumbnail?: File;
}

const EditVideoPopup: React.FC<EditVidepPopupProps> = ({ video, onClose }) => {
  const { mutateAsync: updateVideo } = useUpdateVideo();
  const [title, setTitle] = useState<string>(video?.title || "");
  const [description, setDescription] = useState<string>(
    video?.description || ""
  );
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedThumbnail(file);
    }
  };

  const handleThumbnailClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (
      title === video?.title &&
      description === video.description &&
      !selectedThumbnail
    ) {
      toast.error(
        "At least one of title, description, or thumbnail must be provided"
      );
      return;
    }

    const updatedData: FormValues = {};

    if (title && title !== video?.title) {
      updatedData.title = title;
    }

    if (description && description !== video?.description) {
      updatedData.description = description;
    }

    if (selectedThumbnail) {
      updatedData.thumbnail = selectedThumbnail;
    }

    await updateVideo({ updatedData, videoId: video?._id });

    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={onClose}
      ></div>

      <div className="fixed top-[10%] right-[10%] w-[80%] h-auto bg-black border border-zinc-700 p-5 z-50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg">Edit Video</h1>
            <p className="text-zinc-500 text-sm">
              Share where you've worked on your profile.
            </p>
          </div>
          <span className="cursor-pointer" onClick={onClose}>
            <IoClose size={30} />
          </span>
        </div>

        <div className="pt-5 flex flex-col items-start gap-4">
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="thumbnail">Thumbnail</label>
            <div
              className="cursor-pointer flex items-center"
              onClick={handleThumbnailClick}
            >
              <img
                src={
                  selectedThumbnail
                    ? URL.createObjectURL(selectedThumbnail)
                    : video?.thumbnail.url
                }
                alt="Thumbnail"
                className="w-[100px] object-cover border border-zinc-700"
              />
            </div>
            <input
              type="file"
              id="thumbnail"
              ref={fileInputRef}
              className="hidden"
              onChange={handleThumbnailChange}
            />
            {selectedThumbnail && (
              <p className="text-sm text-zinc-500">{selectedThumbnail.name}</p>
            )}
          </div>

          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            className="bg-zinc-800 p-2 rounded-md w-full"
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            className="bg-zinc-800 p-2 rounded-md w-full"
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            type="button"
            className="button-animation px-3 py-[10px] flex items-center justify-center gap-2 mx-auto bg-red-800 w-60 mt-5 text-sm"
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default EditVideoPopup;
