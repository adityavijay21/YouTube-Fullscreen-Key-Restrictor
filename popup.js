const keys = {
  "ArrowLeft": "← Left Arrow",
  "ArrowRight": "→ Right Arrow",
  "ArrowUp": "↑ Up Arrow",
  "ArrowDown": "↓ Down Arrow",
  "KeyJ": "J (Rewind)",
  "KeyK": "K (Pause)",
  "KeyL": "L (Forward)",
  "Escape": "Esc (Exit Fullscreen)",
  "ShiftLeft": "Shift ⬅",
  "ShiftRight": "Shift ➡",
  "Comma": "< (Slow Down)",
  "Period": "> (Speed Up)"
};

const keyList = document.getElementById("key-list");

// Load settings from storage
chrome.storage.local.get("allowedKeys", (data) => {
  const allowedKeys = data.allowedKeys || Object.keys(keys);

  Object.entries(keys).forEach(([code, label]) => {
    const wrapper = document.createElement("div");
    wrapper.className = "key-toggle";

    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.checked = allowedKeys.includes(code);
    toggle.dataset.key = code;

    const labelEl = document.createElement("label");
    labelEl.textContent = label;
    labelEl.htmlFor = code;

    toggle.addEventListener("change", () => {
      chrome.storage.local.get("allowedKeys", (data) => {
        let newAllowedKeys = data.allowedKeys || Object.keys(keys);

        if (toggle.checked) {
          newAllowedKeys.push(code);
        } else {
          newAllowedKeys = newAllowedKeys.filter((k) => k !== code);
        }

        chrome.storage.local.set({ allowedKeys: newAllowedKeys });
      });
    });

    wrapper.appendChild(labelEl);
    wrapper.appendChild(toggle);
    keyList.appendChild(wrapper);
  });
});
