self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("audio-cache").then((cache) => {
      return cache.addAll([
        "/learn-bayquniyyah/assets/audio-files/Arbaeen1.mp3", // Correct path based on base URL
        "/learn-bayquniyyah/assets/audio-files/Arbaeen2.mp3", // Correct path based on base URL
      ]);
    })
  );
  console.log("Service worker installed and audio files cached.");
});
