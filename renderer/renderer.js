document.addEventListener("DOMContentLoaded", () => {
  const urlInput = document.getElementById("youtube-url");
  const savePathInput = document.getElementById("save-path");
  const browseButton = document.getElementById("browse-button");
  const downloadButton = document.getElementById("download-button");
  const progressBar = document.getElementById("download-progress");
  const statusMessage = document.getElementById("status-message");
  const downloadLog = document.getElementById("download-log");

  browseButton.addEventListener("click", async () => {
    try {
      const selectedPath = await window.electronAPI.selectDirectory();
      if (selectedPath) {
        savePathInput.value = selectedPath;
      }
    } catch (error) {
      console.error("Directory selection error:", error);
      statusMessage.textContent = "Error selecting directory";
    }
  });

  downloadButton.addEventListener("click", async () => {
    const url = urlInput.value.trim();
    const savePath = savePathInput.value.trim();
    const downloadType = document.querySelector(
      'input[name="download-type"]:checked'
    )?.value;

    if (!url) {
      statusMessage.textContent = "Please enter a YouTube URL";
      return;
    }

    if (!savePath) {
      statusMessage.textContent = "Please select a save location";
      return;
    }

    if (!downloadType) {
      statusMessage.textContent = "Please select download type";
      return;
    }

    progressBar.value = 0;
    statusMessage.textContent = "Downloading...";
    downloadLog.value = "";

    try {
      const result = await window.electronAPI.downloadYouTube({
        url,
        savePath,
        downloadType,
      });

      if (result && result.length > 0) {
        result.forEach((log) => {
          downloadLog.value += `${log}\n`;
        });

        progressBar.value = 100;
        statusMessage.textContent = "Download completed successfully!";
      } else {
        statusMessage.textContent = "No download results received";
      }
    } catch (error) {
      console.error("Download error:", error);
      statusMessage.textContent = `Error downloading: ${error.message}`;
      downloadLog.value += `Error: ${error.message}\n`;
    }
  });
});
