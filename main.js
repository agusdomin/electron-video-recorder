// importing two Electron modules with CommonJS module syntax:
const { app, BrowserWindow , ipcMain} = require('electron')
const path = require('path');

function handleSetTitle (event, title) {
  // Para tomar la instancia de BrowserWindow que esta attached al mensaje del 
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  // ipcMain.on('set-title', (event, title) => {
  //   // Para tomar la instancia de BrowserWindow que esta attached al mensaje del 
  //   //const webContents = event.sender
  //   //const win = BrowserWindow.fromWebContents(webContents)
  //   win.setTitle(title)
  // })

  //win.loadURL para cargar una pagina
  win.loadFile('index.html')
  // const contents = win.webContents
  // console.log(contents)
  win.webContents.openDevTools()

}

app.whenReady().then(() => {
  
  createWindow()
  ipcMain.on('set-title',handleSetTitle)

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

})

app.on("windows-all-closed", () => {
    if (process.platform !== 'darwin') app.quit()
})

