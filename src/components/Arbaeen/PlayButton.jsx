import React from "react";
import { CiPlay1, CiPause1 } from "react-icons/ci";

export default function PlayButton({ isPlaying, handlePlayPause, start }) {
  return (
    <button
      onClick={() => handlePlayPause(start)}
      className="bg-black text-white font-medium rounded-md px-8 py-2 inline-flex items-center justify-center gap-2 md:col-span-2 w-1/2 mx-auto dark:bg-white dark:text-black"
    >
      {isPlaying ? (
        <>
          <CiPause1 size={20} /> <span>Pause</span>
        </>
      ) : (
        <>
          <CiPlay1 size={20} /> <span>Play</span>
        </>
      )}
    </button>
  );
}
