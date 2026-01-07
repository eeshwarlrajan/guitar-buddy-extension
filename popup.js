// popup.js

// --- CONFIGURATION ---
const tunings = {
  standard: { names: ["E", "A", "D", "G", "B", "e"], freqs: [164.81, 220.00, 293.66, 392.00, 493.88, 659.25] },
  dropD:    { names: ["D", "A", "D", "G", "B", "e"], freqs: [146.83, 220.00, 293.66, 392.00, 493.88, 659.25] },
  ebStd:    { names: ["Eb", "Ab", "Db", "Gb", "Bb", "eb"], freqs: [155.56, 207.65, 277.18, 369.99, 466.16, 622.25] },
  dStd:     { names: ["D", "G", "C", "F", "A", "d"], freqs: [146.83, 196.00, 261.63, 349.23, 440.00, 587.33] },
  dropC:    { names: ["C", "G", "C", "F", "A", "d"], freqs: [130.81, 196.00, 261.63, 349.23, 440.00, 587.33] },
  dropB:    { names: ["B", "F#", "B", "E", "G#", "c#"], freqs: [123.47, 185.00, 246.94, 329.63, 415.30, 554.37] },
  dropA:    { names: ["A", "E", "A", "D", "F#", "B"], freqs: [110.00, 164.81, 220.00, 293.66, 369.99, 493.88] }
};

let currentTuning = "standard";
const statusDiv = document.getElementById("status-msg");
const mascotImg = document.getElementById("mascot-img");

// --- MASCOT LOGIC ---

const actionFaces = [
  "capy_happy.png", 
  "capy_rock.png",
  "capy_cool.png",
  "capy_neutral.png" // I added neutral back to the pool so it stays varied!
];

// CHANGED: We tell the code we are STARTING on happy.
// This forces the next random pick to be anything EXCEPT happy.
let lastFace = "capy_happy.png"; 

function triggerRandomReaction() {
  const availableFaces = actionFaces.filter(face => face !== lastFace);
  
  const randomIndex = Math.floor(Math.random() * availableFaces.length);
  const selectedFace = availableFaces[randomIndex];

  lastFace = selectedFace;
  mascotImg.src = selectedFace;
  
  const randomTilt = Math.random() > 0.5 ? "15deg" : "-15deg";
  mascotImg.style.transform = `scale(1.2) rotate(${randomTilt})`;
  
  setTimeout(() => { mascotImg.style.transform = "scale(1) rotate(0deg)"; }, 200);
}

// --- TUNER LOGIC ---

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTone(freq) {
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "triangle"; 
  osc.frequency.value = freq;

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  
  const duration = 5.0;
  gain.gain.setValueAtTime(0.5, audioCtx.currentTime); 
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
  osc.stop(audioCtx.currentTime + duration);
}

function updateButtons() {
  const tuning = tunings[currentTuning];
  const buttons = document.querySelectorAll(".note-btn");
  
  buttons.forEach((btn, index) => {
    btn.innerText = tuning.names[index];
    
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    newBtn.addEventListener("click", () => {
      playTone(tuning.freqs[index]);
      showStatus(`Playing ${tuning.names[index]}`);
      triggerRandomReaction();
    });
  });
}

document.getElementById("tuning-select").addEventListener("change", (e) => {
  currentTuning = e.target.value;
  updateButtons();
  showStatus("Tuning Updated");
  triggerRandomReaction();
});


// --- LOOPER LOGIC ---

function showStatus(msg) {
  statusDiv.innerText = msg;
  setTimeout(() => { 
    if (statusDiv.innerText === msg) statusDiv.innerText = "Ready to Jam!"; 
  }, 3000);
}

function sendCommand(action) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]) return;
    chrome.tabs.sendMessage(tabs[0].id, { action: action });
  });
}

document.getElementById("btn-a").addEventListener("click", () => {
  sendCommand("setStart");
  showStatus("Loop Start (A) Set");
  triggerRandomReaction();
});

document.getElementById("btn-b").addEventListener("click", () => {
  sendCommand("setEnd");
  showStatus("Loop Active! (A -> B)");
  triggerRandomReaction();
});

document.getElementById("btn-clear").addEventListener("click", () => {
  sendCommand("clear");
  showStatus("Loop Cleared");
  triggerRandomReaction();
});

// Initialize
updateButtons();