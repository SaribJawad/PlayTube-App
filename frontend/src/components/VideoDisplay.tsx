import React from "react";

const VideoDisplay: React.FC = () => {
  return (
    <div
      id="video-player"
      className="rounded-lg overflow-hidden h-[250px] sm:h-[350px] md:h-[500px] lg:h-[600px]"
    >
      <img
        className="w-full h-full object-cover"
        src="https://plus.unsplash.com/premium_photo-1724411829653-965d18691383?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Descriptive Alt Text"
      />
    </div>
  );
};

export default VideoDisplay;
