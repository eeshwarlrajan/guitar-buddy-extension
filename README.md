# 🎸 Guitar Buddy Chrome Extension

**Guitar Buddy** is a browser extension designed to help musicians practice more effectively on YouTube. It features a custom video looper for practicing difficult sections and a built-in chromatic tuner—all hosted by a reactive Capybara mascot.

<img src="icon128.png" width="100" alt="Guitar Buddy Logo">

## 🔗 Download
[**Available now on the Chrome Web Store**](https://chromewebstore.google.com/detail/okicbbfckeaeibfbcdklgbngpnibelml?utm_source=item-share-cb)

## ✨ Features
* **YouTube Looper:** Set "Start" (A) and "End" (B) points to automatically loop specific sections of a video.
* **Chromatic Tuner:** Visual and audio reference tuner for standard and drop tunings (Drop D, Drop C, etc.).
* **Reactive UI:** The little mascot BOB reacts to user actions (tuning, looping, clearing).
* **Retro Design:** Custom CSS styling with a CRT monitor status display.

## 🛠️ Tech Stack
* **Manifest V3:** Compliant with modern Chrome extension security standards.
* **JavaScript (ES6):** Logic for DOM manipulation and audio context.
* **Chrome Scripting API:** Injects content scripts to control the HTML5 video player.
* **CSS3:** Custom animations and retro CRT effects.

## 📦 Installation (Developer Mode)
If you want to run this locally without the store:
1.  Clone this repo.
2.  Open Chrome and go to `chrome://extensions`.
3.  Enable "Developer Mode" (top right).
4.  Click "Load Unpacked" and select this folder.

## 📄 Privacy
This extension runs entirely in the browser. No user data is collected or transmitted.
