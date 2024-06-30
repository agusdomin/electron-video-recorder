const { contextBridge,ipcRenderer } = require('electron')

// A preload script contains code that runs before your web page is loaded into the browser window.

// It has access to both DOM APIs and Node.js environment

// used to expose privileged APIs to the renderer via the contextBridge API
contextBridge.exposeInMainWorld('versions', {
    // we can also expose variables, not just functions
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,

    // Electron use the preload script to set up inter-process communication (IPC)
    // interfaces to pass arbitrary messages between the two kinds of processes.
    ping: () => ipcRenderer.invoke('ping') // expose a function that calls ipcRenderer.invoke to trigger the handler in your preload script
    //  ipcRenderer se comunica con el proceso main, mediante ipcMain
})

contextBridge.exposeInMainWorld('electronAPI',{
    setTitle: (title) => ipcRenderer.send('set-title', title)
})