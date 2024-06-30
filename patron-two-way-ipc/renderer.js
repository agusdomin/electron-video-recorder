const opener = document.getElementById('btn')
const dialog = document.getElementById('filePath')

opener.addEventListener('click', async () => {
const filePath = await window.electronAPI.openFile()
    dialog.innerText = filePath
})
