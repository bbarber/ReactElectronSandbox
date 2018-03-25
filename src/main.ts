import { app, BrowserWindow } from 'electron'
declare var __dirname: string
let mainWindow: Electron.BrowserWindow

function onReady() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800
    })

    const fileName = `file://${__dirname}/index.html`
    mainWindow.loadURL(fileName)
    mainWindow.on('close', () => app.quit())

    // Install React Dev Tools
    const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')

    installExtension(REACT_DEVELOPER_TOOLS).then((name) => {
        console.log(`Added Extension:  ${name}`)
    })
    .catch((err) => {
        console.log('An error occurred: ', err)
    })
}

app.on('ready', () => onReady())
app.on('window-all-closed', () => app.quit())
console.log(`Electron Version ${app.getVersion()}`)
