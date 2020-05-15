'use strict'

import { app } from 'electron'
import path from 'path'

import appMainWindow from './window-main'
import menu from './menu'
import appTray from './tray'

const winURL =
  process.env.NODE_ENV === 'development'
    ? `http://127.0.0.1:3000`
    : `file://${__dirname}/renderer/index.html`

let mainWindow = new appMainWindow(path.join(__dirname, '/resources/icons/icon.png'), winURL)
let tray = process.env.NODE_ENV === 'development'
  ? new appTray(path.join(__dirname, '../resources/icons/tray.png'))
  : new appTray(path.join(__dirname, '/resources/icons/tray.png'))

app.on('ready', () => {
  mainWindow.init()
  menu.init()
  tray.init()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
    mainWindow.toggle()
})