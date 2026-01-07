// content.js
let loopStart = null;
let loopEnd = null;
let isLooping = false;

// The Game Loop
document.addEventListener("timeupdate", () => {
  const video = document.querySelector("video");
  if (!video || !isLooping || loopStart === null || loopEnd === null) return;

  if (video.currentTime >= loopEnd) {
    video.currentTime = loopStart;
  }
}, true);

// The Command Listener
chrome.runtime.onMessage.addListener((request) => {
  const video = document.querySelector("video");
  if (!video) return;

  if (request.action === "setStart") {
    loopStart = video.currentTime;
    console.log("Start set:", loopStart);
  } 
  else if (request.action === "setEnd") {
    loopEnd = video.currentTime;
    isLooping = true;
    video.currentTime = loopStart; // Jump back immediately
    console.log("End set:", loopEnd);
  } 
  else if (request.action === "clear") {
    isLooping = false;
    loopStart = null;
    loopEnd = null;
    console.log("Cleared");
  }
});