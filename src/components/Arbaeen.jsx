import React, { useState, useRef, useEffect } from "react";

export default function Arbaeen() {
  const [start, setStart] = useState("1");
  const [end, setEnd] = useState("40");
  const [isPlaying, setIsPlaying] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [recitor, setRecitor] = useState(1);

  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  const timeStamp = {
    1: [0, 34],
    2: [50, 93],
    3: [162, 226],
    4: [190, 260],
    5: [256, 344],
    6: [280, 372],
    7: [331, 432],
    8: [353, 458],
    9: [381, 496],
    10: [408, 528],
    11: [408, 588],
    12: [408, 620],
    13: [408, 640],
    14: [408, 664],
    15: [408, 690],
    16: [408, 720],
    17: [408, 740],
    18: [408, 768],
    19: [408, 802],
    20: [408, 886],
    21: [408, 910],
    22: [408, 934],
    23: [408, 978],
    24: [408, 1024],
    25: [408, 1164],
    26: [408, 1242],
    27: [408, 1286],
    28: [408, 1346],
    29: [408, 1410],
    30: [408, 1518],
    31: [408, 1556],
    32: [408, 1596],
    33: [408, 1636],
    34: [408, 1668],
    35: [408, 1696],
    36: [408, 1746],
    37: [408, 1821],
    38: [408, 1881],
    39: [408, 1961],
    40: [1668, 1995],
    41: [1668, 2023],
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      handlePlayPause();
    }
  }, [start, end]);

  const handlePlayPause = () => {
    const startInt = parseInt(start, 10);
    const endInt = parseInt(end, 10);

    if (startInt >= endInt) {
      return alert("Enter a valid line number");
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setPlayCount(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    } else {
      audioRef.current.currentTime = timeStamp[startInt][recitor - 1];
      audioRef.current.playbackRate = playbackSpeed;
      audioRef.current.play();
      setIsPlaying(true);
      setPlayCount(1);

      intervalRef.current = setInterval(() => {
        if (audioRef.current.currentTime >= timeStamp[endInt][recitor - 1]) {
          if (playCount >= 5) {
            clearInterval(intervalRef.current);
            audioRef.current.pause();
            setIsPlaying(false);
            setPlayCount(0);
          } else {
            audioRef.current.pause();
            audioRef.current.currentTime = timeStamp[startInt][recitor - 1];
            audioRef.current.play();
            setPlayCount((prevCount) => prevCount + 1);
          }
        }
      }, 100); // Check every 100ms
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 gap-6">
        <audio
          ref={audioRef}
          src={
            recitor === 1
              ? "assets/audio-files/Arbaeen1.mp3"
              : "assets/audio-files/Arbaeen2.mp3"
          }
        />
        <div className="flex justify-center gap-4 w-full">
          <div>
            <select
              className="border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
              id="part-start"
              value={start}
              onChange={(e) => {
                setStart(e.target.value);
                setIsPlaying(false);
                setPlayCount(0);
                if (intervalRef.current) {
                  clearInterval(intervalRef.current);
                }
              }}
            >
              {Array.from({ length: 41 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <h3 className="text-center">From</h3>
          </div>
          <div>
            <select
              className="border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
              id="part-end"
              value={end}
              onChange={(e) => {
                setEnd(e.target.value);
                setIsPlaying(false);
                setPlayCount(0);
                if (intervalRef.current) {
                  clearInterval(intervalRef.current);
                }
              }}
            >
              {Array.from({ length: 41 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <h3 className="text-center">to</h3>
          </div>
          <div>
            <button
              onClick={() => handlePlayPause(start)}
              className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center w-16 h-8"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>
        </div>
        <div className="flex w-full gap-4 flex-wrap flex-col">
          <div className="flex gap-4">
            <label
              htmlFor="playbackSpeed"
              className="block text-sm font-medium text-gray-900"
            >
              Playback Speed:
            </label>
            <select
              id="playbackSpeed"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
            >
              <option value="0.5">0.5x</option>
              <option value="0.75">0.75x</option>
              <option value="0.8">0.8x</option>
              <option value="0.9">0.9x</option>
              <option value="1">1x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>
          </div>
          <div className="flex gap-4">
            <label
              htmlFor="recitor"
              className="text-sm font-medium text-gray-900"
            >
              Choose Recitor
            </label>
            <select
              name=""
              id="recitor"
              value={recitor}
              onChange={(e) => setRecitor(parseInt(e.target.value))}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1">Recitor 1</option>
              <option value="2">Recitor 2</option>
            </select>
          </div>
        </div>
        <div className="text-right font-kitab leading-10 border-2 p-2">
          عَنْ أَمِيرِ المُؤْمِنِينَ أَبِي حَفْصٍ عُمَرَ بْنِ الخَطّابِ (رضي
          الله عنه) قالَ: سَمِعْت رَسُولَ اللَّهِ ﷺ يَقُولُ: «إنَّما الأَعْمالُ
          بِالنِّيّاتِ، وَإِنَّما لِكُلِّ امْرِئٍ ما نَوَى، فَمَنْ كانَتْ
          هِجْرَتُهُ إلَى اللَّهِ وَرَسُولِهِ فَهِجْرَتُهُ إلَى اللَّهِ
          وَرَسُولِهِ، وَمَنْ كانَتْ هِجْرَتُهُ لِدُنْيا يُصِيبُها أَوْ
          امْرَأَةٍ يَنْكِحُها فَهِجْرَتُهُ إلَى ما هاجَرَ إلَيْهِ».
        </div>
      </div>
    </>
  );
}
