import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { Flip, ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-toastify/dist/ReactToastify.css";
import useEditPlaylist from "../customHooks/useEditPlaylist";
import { useQueryClient } from "@tanstack/react-query";

interface EditPlaylistPopupProps {
  handleClosePopup: (event: React.MouseEvent<HTMLButtonElement>) => void;
  currentPlaylist: { name: string; description: string };
  playlistId: string;
}

interface EditPlaylistFormData {
  name: string;
  description: string;
}

const schema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(10, "Name cannot be greater then 15 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long"),
});

const EditPlaylistPopup: React.FC<EditPlaylistPopupProps> = ({
  handleClosePopup,
  currentPlaylist,
  playlistId,
}) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditPlaylistFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: currentPlaylist.name,
      description: currentPlaylist.description,
    },
  });

  const { mutateAsync: editPlaylist, isPending } = useEditPlaylist();

  useEffect(() => {
    reset(currentPlaylist);
  }, [currentPlaylist, reset]);

  const onSubmit = async (data: EditPlaylistFormData) => {
    if (
      data.name !== currentPlaylist.name &&
      data.description !== currentPlaylist.description
    ) {
      await editPlaylist(
        { data, playlistId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["usersPlaylist"],
              exact: false,
            });

            setTimeout(() => {
              toast.success("Playlist updated successfully!");
            }, 500);
          },
        }
      );

      handleClosePopup(null as any);
    } else {
      handleClosePopup(null as any);
      return;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[80%] sm:w-[60%] lg:w-[40%] h-auto flex flex-col items-center bg-black border border-zinc-700 relative p-5">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          transition={Flip}
        />

        <div className="flex pb-3 w-full justify-between border-b border-b-zinc-700">
          <h1 className="text-lg font-semibold">Edit Playlist</h1>
          <button className="cursor-pointer" onClick={handleClosePopup}>
            <IoClose size={30} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4 mt-4"
        >
          <div>
            <label className="block text-sm mb-1">Playlist Title</label>
            <input
              type="text"
              {...register("name")}
              className="border p-2 rounded-full w-full outline-none px-3 text-white bg-black border-zinc-800 placeholder:text-zinc-500"
              placeholder="Enter playlist title"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-2">Playlist Description</label>
            <textarea
              {...register("description")}
              className="border p-2 rounded-2xl w-full outline-none px-3 text-white bg-black border-zinc-800 placeholder:text-zinc-500"
              placeholder="Enter playlist description"
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-2">
                {errors.description.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={` button-animation px-3 py-2  rounded-md text-center  bg-red-700 hover:bg-red-600 transition duration-300 w-auto mt-2 ${
              isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPlaylistPopup;
