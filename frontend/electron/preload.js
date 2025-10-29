const { contextBridge, ipcRenderer } = require('electron');

// 暴露安全的 API 给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 获取后端 URL
  getBackendUrl: () => ipcRenderer.invoke('get-backend-url'),

  // 可以在这里添加更多 Electron 特有的功能
  platform: process.platform,
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron
  }
});
