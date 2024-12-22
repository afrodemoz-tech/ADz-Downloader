const { BrowserWindow, ipcMain, dialog, app } = require("electron");
const path = require("path");
const { PythonShell } = require("python-shell");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile(path.join(__dirname, "..", "renderer", "index.html"));
}

ipcMain.handle("download-youtube", (event, { url, savePath, downloadType }) => {
  return new Promise((resolve, reject) => {
    const options = {
      mode: "json",
      pythonPath: "python3",
      pythonOptions: ["-u"],
      scriptPath: path.join(__dirname, "..", "backend"),
      args: [url, savePath, downloadType],
    };

    PythonShell.run("adz_downloader.py", options, (err, results) => {
      if (err) {
        console.error("Download error:", err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
});

ipcMain.handle("select-directory", async (event) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openDirectory"],
  });
  return result.filePaths[0];
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
