import React from "react";
import "./style.css";

export default function Playback({ playbackSpeed, setPlaybackSpeed }) {
  return (
    <div className="div-container">
      <label htmlFor="playbackSpeed" className="section-title">
        Playback Speed
      </label>
      <select
        id="playbackSpeed"
        className="options"
        value={playbackSpeed}
        onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
      >
        <option value="0.5">0.5x</option>
        <option value="0.75">0.75x</option>
        <option value="1">1x</option>
        <option value="1.25">1.25x</option>
        <option value="1.5">1.5x</option>
        <option value="2">2x</option>
      </select>
    </div>
  );
}
