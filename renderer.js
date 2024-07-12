// const information = document.getElementById('info')
// information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

// const func = async () => {
//     const response = await window.versions.ping()
//     console.log('Respuesta',response)
// }

// const botonIPC = document.getElementById('send')
// botonIPC.addEventListener('click', () => {
//     func()
// })

//const titleInput = document.getElementById('title')
const triggerButton = document.getElementById('btn')

triggerButton.addEventListener('click', () => {
//  const title = titleInput.value
  console.log('Apreto el boton')
  window.electronAPI.trigger()
})