const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  selectDirectory: () => ipcRenderer.invoke("select-directory"),
  downloadYoutube: (downloadOptions) =>
    ipcRenderer.invoke("download-youtube", downloadOptions),
});
