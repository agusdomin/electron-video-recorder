const {app, Menu,BrowserWindow, ipcMain} = require('electron')
const path = require('path')

function createWindow() {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname,'preload.js')
        }
    })

    const menu = Menu.buildFromTemplate([
        {  
        label: app.name,
        submenu:[
            {
                click: () => mainWindow.webContents.send('update-counter',1),
                label: "increment"
            },
            {
                click: () => mainWindow.webContents.send('update-counter',-1),
                label: "decrement"
            }
        ]
        }
    ])
    Menu.setApplicationMenu(menu)
    mainWindow.loadFile('index.html')
    mainWindow.webContents.openDevTools()
}
app.whenReady().then(() => {
    ipcMain.on('counter-value', (_event, value) => {
      console.log(value) // will print value to Node console
    })
    createWindow()
  
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })
  
  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })