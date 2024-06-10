import { useState } from "react";

function App() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [currentAudio, setCurrentAudio] = useState(null);

  const handlePlay = async () => {
    const startInt = parseInt(start, 10);
    const endInt = parseInt(end, 10);

    if (
      isNaN(startInt) ||
      isNaN(endInt) ||
      startInt < 1 ||
      endInt > 34 ||
      startInt > endInt
    ) {
      alert("Please enter valid start and end values between 1 and 34.");
      return;
    }

    for (let i = startInt; i <= endInt; i++) {
      try {
        await playAudio(i);
      } catch (error) {
        console.error(`Error playing part-${i}.mp3: `, error);
        alert(
          `Failed to play part-${i}.mp3. Check the console for more details.`
        );
        break;
      }
    }
  };

  const playAudio = (partNumber) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio(`assets/audio-files/part-${partNumber}.mp3`);
      setCurrentAudio(audio);
      audio
        .play()
        .then(() => {
          audio.onended = () => resolve();
        })
        .catch((err) => {
          reject(err);
        });
      audio.onerror = (err) => {
        reject(err);
      };
    });
  };

  const handlePause = () => {
    if (currentAudio) {
      currentAudio.pause();
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="flex space-x-4 mb-4">
          <input
            type="number"
            className="border-2 border-gray-400 rounded-lg p-2 focus:outline-none focus:border-blue-500 shadow-sm"
            id="part-start"
            min="1"
            max="34"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          <input
            type="number"
            className="border-2 border-gray-400 rounded-lg p-2 focus:outline-none focus:border-blue-500 shadow-sm"
            id="part-end"
            min="1"
            max="34"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
          <button
            onClick={handlePlay}
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Play
          </button>
          <button
            onClick={handlePause}
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Pause
          </button>
        </div>
      </div>
      <img src="assets/Part-1.jpg" alt="" />
      <img src="assets/Part-2.jpg" alt="" />
    </>
  );
}

export default App;
