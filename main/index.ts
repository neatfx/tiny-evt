import { app, Tray } from 'electron'

import './app-menu'
import MainWindow from './window-main'
import appTray from './app-tray'

const mainWindow = new MainWindow()
let tray: Tray

app.on('ready', () => {
  mainWindow.init()
  tray = appTray()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  mainWindow.toggle()
})