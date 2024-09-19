import React from "react";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useCreatePlaylist from "../customHooks/useCreatePlaylist";
import { useQueryClient } from "@tanstack/react-query";

interface CreatePlaylistFormInputs {
  name: string;
  description: string;
}

type HandleClose = () => void;

interface CreatePlaylistPopupProps {
  handleClosePopup: HandleClose;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Playlist name is required")
    .min(3, "Playlist name must be at least 3 characters long"),
  description: Yup.string()
    .required("Playlist description is required")
    .min(10, "Description must be at least 10 characters long"),
});

const CreatePlaylistPopup: React.FC<CreatePlaylistPopupProps> = ({
  handleClosePopup,
}) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreatePlaylistFormInputs>({
    resolver: yupResolver(validationSchema),
  });
  const { mutateAsync: createPlaylist, isPending } = useCreatePlaylist();

  const onSubmit = async (data: CreatePlaylistFormInputs) => {
    try {
      await createPlaylist(data, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["usersPlaylist"],
            exact: false,
          });
          reset();
          handleClosePopup();
        },
      });
      setTimeout(() => {
        toast.success("Playlist created!");
      }, 500);
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const handlePopupClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClosePopup}
    >
      <div
        className="w-[80%] sm:w-[60%] lg:w-[40%] h-auto flex flex-col items-center bg-black border border-zinc-700 relative p-5"
        onClick={handlePopupClick}
      >
        <div className="flex pb-3 w-full justify-between border-b border-b-zinc-700">
          <h1 className="text-lg font-semibold">Create Playlist</h1>
          <button
            disabled={isPending}
            className={isPending ? "cursor-wait" : "cursor-pointer"}
            onClick={handleClosePopup}
          >
            <IoClose size={30} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4 mt-4"
        >
          <div>
            <label className="block text-sm mb-2">Playlist Name</label>
            <input
              type="text"
              {...register("name")}
              className="border p-2 rounded-full w-full outline-none px-3 text-white bg-black border-zinc-800 placeholder:text-zinc-500"
              placeholder="Enter playlist name"
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
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`button-animation px-3 py-[10px] text-center bg-red-800 w-full mt-2 ${
              isPending && "cursor-wait"
            } `}
          >
            {isPending ? "Creating playlist..." : "Create Playlist"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistPopup;
