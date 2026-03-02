import React from "react";
import "./style.css";
import { RxLoop } from "react-icons/rx";

export default function Loops({
  playCount,
  maxCount,
  setMaxCount,
  isDarkMode,
}) {
  return (
    <div className="div-container">
      <label htmlFor="" className="section-title">
        Number of Loops
      </label>
      <div className="flex items-center gap-4">
        <input
          onChange={(e) => setMaxCount(e.target.value)}
          value={maxCount}
          type="number"
          className="options w-1/3"
        />
        <RxLoop
          onClick={() => setMaxCount((prev) => prev + 1)}
          size={30}
          color={isDarkMode ? "white" : "black"}
        />
        <span className="text-sm text-gray-600 dark:text-zinc-200">
          Current: {playCount}/{maxCount}
        </span>
      </div>
    </div>
  );
}
