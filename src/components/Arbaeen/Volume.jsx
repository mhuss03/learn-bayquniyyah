import React from "react";
import { IoIosVolumeLow, IoIosVolumeHigh } from "react-icons/io";

import "./style.css";

export default function Volume({ volume, setVolume, isDarkMode }) {
  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  return (
    <div className="div-container">
      <label htmlFor="playbackSpeed" className="section-title">
        Volume
      </label>
      <div className="flex items-center">
        <IoIosVolumeLow size={30} color={isDarkMode ? "white" : "black"} />
        <input
          id="volume-slider"
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>
    </div>
  );
}
