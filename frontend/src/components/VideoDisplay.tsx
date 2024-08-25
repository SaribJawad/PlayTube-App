import React from "react";
import { useAppSelector } from "../app/hooks";

const VideoDisplay: React.FC = () => {
  const video = useAppSelector((state) => state.video.video?.videoFile);

  return (
    <div
      id="video-player"
      className="rounded-lg overflow-hidden h-[250px] sm:h-[350px] md:h-[500px] lg:h-[600px]"
    >
      <video
        controls
        autoPlay
        className="w-full h-full object-contain"
        src={video?.url}
      />
    </div>
  );
};

export default VideoDisplay;
