'use strict'

import { app } from 'electron'

import appMainWindow from './window-main'
import menu from './menu'
import appTray from './tray'

const winURL =
  process.env.NODE_ENV === 'development'
    ? `http://127.0.0.1:3000`
    : `file://${__dirname}/renderer/index.html`

let mainWindow = new appMainWindow('resources/icons/icon.png', winURL)
let tray = new appTray('resources/icons/tray.png')

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