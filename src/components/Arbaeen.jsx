import React, { useState, useRef, useEffect } from "react";
import {
  PlayButton,
  Playback,
  Recitor,
  Matn,
  HadithSelector,
  Loops,
  Volume,
} from "./Arbaeen/index";
import { CiDark, CiLight } from "react-icons/ci";

export default function Arbaeen() {
  const [start, setStart] = useState(() => {
    return localStorage.getItem("start") || "1";
  });

  const [end, setEnd] = useState(() => {
    return localStorage.getItem("end") || "40";
  });
  const [currentHadith, setCurrentHadith] = useState(start - 1);

  useEffect(() => {
    localStorage.setItem("start", start);
  }, [start]);

  useEffect(() => {
    localStorage.setItem("end", end);
  }, [end]);

  const [isPlaying, setIsPlaying] = useState(false);

  const [playCount, setPlayCount] = useState(0);
  const [maxCount, setMaxCount] = useState(1);

  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(50);

  const [recitor, setRecitor] = useState(1);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  const timeStamp = {
    1: [34, 17],
    2: [93, 50],
    3: [226, 162],
    4: [260, 190],
    5: [344, 256],
    6: [372, 280],
    7: [432, 331],
    8: [458, 353],
    9: [496, 381],
    10: [528, 408],
    11: [588, 408],
    12: [620, 408],
    13: [640, 408],
    14: [664, 408],
    15: [690, 408],
    16: [720, 408],
    17: [740, 408],
    18: [768, 408],
    19: [802, 408],
    20: [886, 408],
    21: [910, 408],
    22: [934, 408],
    23: [978, 408],
    24: [1024, 408],
    25: [1164, 408],
    26: [1242, 408],
    27: [1286, 408],
    28: [1346, 408],
    29: [1410, 408],
    30: [1518, 408],
    31: [1556, 408],
    32: [1596, 408],
    33: [1636, 408],
    34: [1668, 408],
    35: [1696, 408],
    36: [1746, 408],
    37: [1821, 408],
    38: [1881, 408],
    39: [1961, 408],
    40: [1995, 1668],
    41: [2023, 1668],
  };

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/learn-bayquniyyah/service-worker.js") // Adjust path to reflect the base URL
        .then(() => {
          console.log("Service Worker Registered.");
        })
        .catch((error) => {
          console.error("Service Worker Registration Failed:", error);
        });
    }

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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100; // Set initial volume when component mounts
    }
  }, [audioRef, volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [audioRef, playbackSpeed]);

  const playCountRef = useRef(0);

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
      playCountRef.current = 0; // Reset the ref
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    } else {
      audioRef.current.currentTime = timeStamp[startInt][recitor - 1];
      audioRef.current.play();
      setIsPlaying(true);
      setPlayCount(1);
      playCountRef.current = 1; // Initialize the ref

      intervalRef.current = setInterval(() => {
        const currentTime = audioRef.current.currentTime;

        // Check if current time is within a Hadith range
        for (let i = startInt; i <= endInt; i++) {
          // Check if the current time is within the range for Hadith `i`
          const startTimestamp = timeStamp[i][recitor - 1];
          const nextHadithTimestamp = timeStamp[i + 1]
            ? timeStamp[i + 1][recitor - 1]
            : Infinity;

          if (
            currentTime >= startTimestamp - 0.1 &&
            currentTime < nextHadithTimestamp - 0.1
          ) {
            setCurrentHadith(i - 1); // -1 because the hadith index starts from 0
            break;
          }
        }

        // Handle playback stopping after end time
        if (currentTime >= timeStamp[Number(endInt)][recitor - 1] - 0.1) {
          if (playCountRef.current >= maxCount) {
            console.log("Clearing interval and stopping playback.");
            clearInterval(intervalRef.current);
            audioRef.current.pause();
            setIsPlaying(false);
            setPlayCount(0);
            playCountRef.current = 0;
          } else {
            console.log("Looping playback.");
            audioRef.current.pause();
            audioRef.current.currentTime = timeStamp[startInt][recitor - 1];
            audioRef.current.play();
            playCountRef.current += 1;
            setPlayCount(playCountRef.current);
          }
        }
      }, 250);
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.theme = newMode ? "dark" : "light";
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  return (
    <div className="w-96 border-2 shadow-sm rounded-md mx-auto p-4 mt-4 bg-white md:w-[40rem] lg:w-[64rem] dark:bg-[#1e1e1e] dark:border-[#878787]">
      <audio
        ref={audioRef}
        src={
          recitor === 1
            ? "assets/audio-files/Arbaeen2.mp3"
            : "assets/audio-files/Arbaeen1.mp3"
        }
      />
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-xl dark:text-white">
          Hadith Memorisation
        </h1>
        <button onClick={handleDarkMode}>
          {isDarkMode ? (
            <CiDark size={25} color={isDarkMode ? "white" : "black"} />
          ) : (
            <CiLight size={25} color={isDarkMode ? "white" : "black"} />
          )}
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Recitor recitor={recitor} setRecitor={setRecitor} />
        <Loops
          playCount={playCount}
          maxCount={maxCount}
          setMaxCount={setMaxCount}
          isDarkMode={isDarkMode}
        />
        <Playback
          playbackSpeed={playbackSpeed}
          setPlaybackSpeed={setPlaybackSpeed}
        />
        <Volume volume={volume} setVolume={setVolume} isDarkMode={isDarkMode} />
        <HadithSelector
          start={start}
          setStart={setStart}
          end={end}
          setEnd={setEnd}
          setIsPlaying={setIsPlaying}
          setPlayCount={setPlayCount}
          intervalRef={intervalRef}
        />
        <PlayButton
          isPlaying={isPlaying}
          handlePlayPause={handlePlayPause}
          start={start}
        />
        <Matn currentHadith={currentHadith} />
      </div>
    </div>
  );
}
