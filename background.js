chrome.runtime.onInstalled.addListener(() => {
    console.log("YouTube Key Blocker Installed!");
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    console.log("Settings updated:", changes);
});
