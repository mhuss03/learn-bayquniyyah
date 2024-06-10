import { useState, useRef } from "react";

function App() {
  const [start, setStart] = useState("1");
  const [end, setEnd] = useState("34");
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

  const timeStamp = {
    1: 0,
    2: 8,
    3: 14.4,
    4: 20.7,
    5: 27.64,
    6: 34.3,
    7: 40.7,
    8: 46.9,
    9: 53.3,
    10: 60,
    11: 66.7,
    12: 73.5,
    13: 79.9,
    14: 86,
    15: 93.1,
    16: 99.6,
    17: 106.3,
    18: 112.6,
    19: 118.8,
    20: 125.3,
    21: 132.1,
    22: 138.8,
    23: 145,
    24: 151.6,
    25: 158.3,
    26: 164.4,
    27: 170.7,
    28: 177.7,
    29: 184,
    30: 190.5,
    31: 197,
    32: 203.7,
    33: 210,
    34: 221,
  };

  const handlePlayFrom = (seconds) => {
    if (start > end) {
      return alert("Enter a Valid line number");
    }

    setIsPlaying(!isPlaying);

    if (isPlaying === true) {
      audioRef.current.pause();
    } else if (audioRef.current) {
      audioRef.current.currentTime = timeStamp[seconds];
      audioRef.current.play();

      setTimeout(() => {
        audioRef.current.pause();
        audioRef.current.currentTime = timeStamp[seconds];
        audioRef.current.play();
      }, (timeStamp[end] - timeStamp[start]) * 1000);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
        <audio ref={audioRef} src="assets/audio-files/full-audio.mp3" />
        <div className="flex space-x-4 mb-4">
          <div>
            <input
              type="number"
              className="border-2 border-gray-400 rounded-lg p-2 focus:outline-none focus:border-blue-500 shadow-sm"
              id="part-start"
              min="1"
              max="34"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
            <h3 className="text-center">Upto</h3>
          </div>
          <div>
            <input
              type="number"
              className="border-2 border-gray-400 rounded-lg p-2 focus:outline-none focus:border-blue-500 shadow-sm"
              id="part-end"
              min="1"
              max="34"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
            <h3 className="text-center">From</h3>
          </div>
          <button
            onClick={() => handlePlayFrom(start)}
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Play
          </button>
        </div>
      </div>
      <img src="assets/Part-1.jpg" alt="" />
      <img src="assets/Part-2.jpg" alt="" />
    </>
  );
}

export default App;
