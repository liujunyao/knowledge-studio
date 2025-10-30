const { app, BrowserWindow, ipcMain, dialog, Tray, Menu, nativeImage } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

let mainWindow;
let pythonProcess;
let isShuttingDown = false;
let tray;

const ICON_SOURCE_PATH = path.join(__dirname, '../public/logo-simple.svg');

function loadAppIcon(size = 128) {
  try {
    const svgContent = fs.readFileSync(ICON_SOURCE_PATH, 'utf8');
    let image = nativeImage.createFromDataURL(
      `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`
    );
    if (size) {
      image = image.resize({ width: size, height: size, quality: 'best' });
    }
    return image;
  } catch (error) {
    console.warn('Failed to load app icon:', error);
    return null;
  }
}

// Python 后端进程管理
function startPythonBackend() {
  const backendPath = path.join(__dirname, '../../backend');
  const uvArgs = ['run', 'uvicorn', 'app.main:app', '--host', '127.0.0.1', '--port', '13560'];
  const pythonArgs = ['-m', 'uvicorn', 'app.main:app', '--host', '127.0.0.1', '--port', '13560'];

  const launch = (command, args, fallback) => {
    const proc = spawn(command, args, {
      cwd: backendPath,
      stdio: 'pipe',
    });

    proc.stdout.on('data', (data) => {
      console.log(`[Python Backend] ${data}`);
    });

    proc.stderr.on('data', (data) => {
      console.error(`[Python Backend Error] ${data}`);
    });

    proc.on('close', (code) => {
      console.log(`Python backend exited with code ${code}`);
    });

    proc.on('error', (error) => {
      console.error(`[Python Backend Error] Failed to start via ${command}:`, error);
      if (fallback) {
        pythonProcess = launch(fallback.command, fallback.args, null);
      }
    });

    return proc;
  };

  pythonProcess = launch('uv', uvArgs, {
    command: process.platform === 'win32' ? 'python' : 'python3',
    args: pythonArgs,
  });
}

function stopPythonBackend() {
  if (pythonProcess) {
    pythonProcess.kill();
    pythonProcess = null;
  }
}

function shutdownApplication() {
  if (isShuttingDown) {
    return;
  }
  isShuttingDown = true;
  stopPythonBackend();
  if (tray) {
    tray.destroy();
    tray = null;
  }
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.removeAllListeners('close');
    mainWindow.close();
  }
  app.quit();
}

function showMainWindow() {
  if (!mainWindow) {
    createWindow();
    return;
  }
  if (mainWindow.isMinimized()) {
    mainWindow.restore();
  }
  mainWindow.show();
  mainWindow.focus();
}

function createTray() {
  if (tray) {
    return;
  }

  const trayIcon = loadAppIcon(process.platform === 'win32' ? 24 : 18);
  tray = new Tray(trayIcon || nativeImage.createEmpty());
  tray.setToolTip('Knowledge Studio');

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示窗口',
      click: showMainWindow,
    },
    {
      label: '退出应用',
      click: () => shutdownApplication(),
    },
  ]);

  tray.on('click', () => {
    showMainWindow();
  });

  tray.on('right-click', () => {
    tray.popUpContextMenu(contextMenu);
  });

  tray.setContextMenu(contextMenu);
}

function createWindow() {
  const windowIcon = loadAppIcon(256);

  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    icon: windowIcon || undefined,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs'),
    },
  });

  if (process.platform === 'darwin' && windowIcon) {
    app.dock.setIcon(windowIcon);
  }

  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    mainWindow.loadURL('http://localhost:13561');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('close', async (event) => {
    if (!isShuttingDown) {
      event.preventDefault();
      const result = await dialog.showMessageBox(mainWindow, {
        type: 'question',
        buttons: ['取消', '退出'],
        defaultId: 1,
        cancelId: 0,
        title: '确认退出',
        message: '确定要退出 Knowledge Studio 吗？',
        detail: '退出后前端窗口和后端服务都会关闭，需要重新启动应用才能继续使用。',
      });

      if (result.response === 1) {
        shutdownApplication();
      }
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  console.log('Starting Knowledge Studio...');

  startPythonBackend();
  setTimeout(() => {
    createWindow();
    createTray();
  }, 1000);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  shutdownApplication();
});

app.on('before-quit', () => {
  if (!isShuttingDown) {
    shutdownApplication();
  }
});

ipcMain.handle('get-backend-url', () => {
  return 'http://127.0.0.1:13560';
});
