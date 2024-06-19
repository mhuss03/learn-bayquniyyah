import { useState, useRef, useEffect } from "react";

function App() {
  const [start, setStart] = useState("1");
  const [end, setEnd] = useState("35");
  const [isPlaying, setIsPlaying] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [recitor, setRecitor] = useState(1);

  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  const timeStamp = {
    1: [0, 0],
    2: [8, 9.06],
    3: [14.4, 15],
    4: [20.7, 21.8],
    5: [27.64, 28.54],
    6: [34.3, 35.16],
    7: [40.7, 41.89],
    8: [46.9, 48.44],
    9: [53.3, 55.43],
    10: [60, 62.475],
    11: [66.7, 69.615],
    12: [73.5, 76.36],
    13: [79.9, 82.715],
    14: [86, 89.615],
    15: [93.1, 96.314],
    16: [99.6, 103.258],
    17: [106.3, 110.1],
    18: [112.6, 116.854],
    19: [118.8, 123.675],
    20: [125.3, 130.262],
    21: [132.1, 137.05],
    22: [138.8, 143.94],
    23: [145, 150.9],
    24: [151.6, 157.8],
    25: [158.3, 164],
    26: [164.4, 170.25],
    27: [170.7, 176.82],
    28: [177.7, 183.24],
    29: [184, 189.9],
    30: [190.5, 195.86],
    31: [197, 202.66],
    32: [203.7, 209.21],
    33: [210, 215.815],
    34: [221, 222.42],
    35: [231, 229.04],
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
      <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
        <audio
          ref={audioRef}
          src={
            recitor === 1
              ? "assets/audio-files/full-audio-1.mp3"
              : "assets/audio-files/full-audio-2.mp3"
          }
        />
        <div className="flex space-x-4 mb-4">
          <div>
            <select
              className="border-2 border-gray-400 rounded-lg p-2 focus:outline-none focus:border-blue-500 shadow-sm"
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
              {Array.from({ length: 34 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <h3 className="text-center">From</h3>
          </div>
          <div>
            <select
              className="border-2 border-gray-400 rounded-lg p-2 focus:outline-none focus:border-blue-500 shadow-sm"
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
              {Array.from({ length: 35 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <h3 className="text-center">to</h3>
          </div>
          <button
            onClick={() => handlePlayPause(start)}
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
        <div className="flex w-1/3 gap-6">
          <label
            htmlFor="playbackSpeed"
            className="block mb-2 text-sm font-medium text-gray-900 my-auto"
          >
            Playback Speed:
          </label>
          <select
            id="playbackSpeed"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mr-4"
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
          <label
            htmlFor="recitor"
            className="block mb-2 text-sm font-medium text-gray-900 my-auto"
          >
            Choose Recitor
          </label>
          <select
            name=""
            id="recitor"
            value={recitor}
            onChange={(e) => setRecitor(parseInt(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="1">Badr Al-Turki</option>
            <option value="2">Sayyid Samdani</option>
          </select>
        </div>
      </div>

      <img src="assets/Part-1.jpg" alt="" />
      <img src="assets/Part-2.jpg" alt="" />
    </>
  );
}

export default App;
