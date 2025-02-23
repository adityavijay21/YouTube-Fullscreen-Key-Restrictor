let allowedKeys = [
  "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",
  "KeyJ", "KeyK", "KeyL", "Escape", 
  "ShiftLeft", "ShiftRight", "Comma", "Period"
];

function updateKeyRestrictions() {
  chrome.storage.local.get("allowedKeys", (data) => {
    if (data.allowedKeys) {
      allowedKeys = data.allowedKeys;
      console.log("Updated allowed keys:", allowedKeys);
    }
  });
}

function blockKeys(event) {
  if (!document.fullscreenElement) return; // Only block when in fullscreen
  if (!allowedKeys.includes(event.code)) {
    event.preventDefault();
    event.stopPropagation();
    console.log(`Blocked key: ${event.code}`);
  }
}

// Listen for keydown events in fullscreen only
document.addEventListener("keydown", blockKeys, true);

// Update key restrictions when settings change
chrome.storage.onChanged.addListener(updateKeyRestrictions);

// Load stored settings
updateKeyRestrictions();
