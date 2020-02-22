// Modules to control application life and create native browser window
const url = require('url');
const path = require('path');
const {app, screen, BrowserWindow} = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function workAreaSize() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  return { width, height }
}

function createWindow () {
  // Create the browser window.
  const {width, height} = workAreaSize()

  mainWindow = new BrowserWindow({
    width: width - 200,
    height: height - 100,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
      // nodeIntegration: true
    }
  });

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/dashboard/build/index.html'),
    protocol: 'file:',
    slashes: true
  });

  // and load the index.html of the app.
  // mainWindow.webContents.openDevTools()
  // mainWindow.loadFile('index.html')
  mainWindow.loadURL(startUrl);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
  app.quit()
  // }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.