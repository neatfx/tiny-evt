import { app, Tray } from 'electron'

import './menu'
import MainWindow from './window-main'
import appTray from './tray'

const mainWindow = new MainWindow()
let tray: Tray

app.on('ready', () => {
  mainWindow.init()
  tray = appTray()
})

app.on('window-all-closed', () => {
  tray.destroy()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  mainWindow.toggle()
})