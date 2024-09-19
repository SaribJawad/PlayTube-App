import React, { useCallback } from "react";
import useToggleVideoPublish from "../customHooks/useToggleVideoPublish";
import { toast } from "react-toastify";

interface ToggleButton {
  isPublished: boolean;
  videoId: string;
}

const ToggleButton: React.FC<ToggleButton> = ({ isPublished, videoId }) => {
  const { mutateAsync: TogglePublish } = useToggleVideoPublish();

  const handleChange = useCallback(async () => {
    try {
      await TogglePublish(videoId);

      setTimeout(() => {
        toast.success("Video publish status updated!");
      }, 500);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the video status.");
    }
  }, [TogglePublish, videoId]);

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={isPublished}
        onChange={handleChange}
      />
      <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-5    00 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-black after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600 hover:peer-checked:bg-red-700 peer-checked:after:bg-white"></div>
    </label>
  );
};

export default ToggleButton;
