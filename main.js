// importing two Electron modules with CommonJS module syntax:
const { app, BrowserWindow , ipcMain} = require('electron')
const path = require('path');

const zmq = require('zeromq');
const ndarray = require('ndarray'); // Assuming you installed ndarray


function handleSetTitle (event, title) {
  // Para tomar la instancia de BrowserWindow que esta attached al mensaje del 
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
}

const createWindow = () => {
  const win = new BrowserWindow({
    minWidth: 800,
    width: 1000,
    minHeight: 600,
    height:900,
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
  win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  // const contents = win.webContents
  // console.log(contents)
  win.webContents.openDevTools()

}

async function medirImpedancia (event) {
  try {
  
  const socket = new zmq.Request();
  socket.connect('tcp://localhost:5555');

  const message = 'Medir impedancia';
  await socket.send(message);

  console.log('Esperando medicion...');
  const buffer = await socket.receive()
  console.log('buffer',buffer.toString("hex"))
  
  // await socket.on('message', (reply) => {
  //   console.log('Medicion recibida:', reply.toString());
  // });
  } catch (error) {
    console.error('Error:', error);
  } 
}

app.whenReady().then(() => {
  
  createWindow()

  ipcMain.on('trigger',medirImpedancia)
  ipcMain.on('set-title',handleSetTitle)

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

})

app.on("windows-all-closed", () => {
    if (process.platform !== 'darwin') app.quit()
})

