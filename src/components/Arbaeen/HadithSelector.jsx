import React from "react";
import "./style.css";

export default function HadithSelector({
  start,
  setStart,
  setIsPlaying,
  setPlayCount,
  end,
  setEnd,
  intervalRef,
}) {
  const handleStartChange = (val) => {
    setStart(val);
    setIsPlaying(false);
    setPlayCount(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    checkEndVal(val);
  };

  const handleEndChange = (val) => {
    setEnd(val);
    setIsPlaying(false);
    setPlayCount(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    checkStartVal(val);
  };

  const checkStartVal = (val) => {
    if (Number(val) <= Number(start)) {
      handleStartChange(Number(val) - 1);
    }
  };

  const checkEndVal = (val) => {
    if (Number(val) >= Number(end)) {
      handleEndChange(Number(val) + 1);
    }
  };

  return (
    <>
      <div className="div-container">
        <h3 className="section-title">From Hadith</h3>
        <select
          className="options"
          id="part-start"
          value={start}
          onChange={(e) => handleStartChange(e.target.value)}
        >
          {Array.from({ length: 49 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="div-container">
        <h3 className="section-title">To Hadith</h3>
        <select
          className="options"
          id="part-end"
          value={end}
          onChange={(e) => handleEndChange(e.target.value)}
        >
          {Array.from({ length: 50 }, (_, i) => (
            <option key={i + 1} value={i + 2}>
              {i + 2}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
