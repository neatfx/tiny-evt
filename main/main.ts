import { app, ipcMain } from 'electron'

import './security/remote-module-filter'
import './security/web-contents'

import Menu from './menu'

import MainWindow from './windows/main'
import PreferenceWindow from './windows/preferences'
import AppTray from './tray'

const mainWindow = new MainWindow()
const tray = new AppTray()

export interface ComponentsRouter {
  preferenceWindow: PreferenceWindow
  mainWindow: MainWindow 
}
const cr: ComponentsRouter = {
  preferenceWindow: new PreferenceWindow(),
  mainWindow: mainWindow
}

app.on('ready', () => {
  Menu(cr)
  mainWindow.init()
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

ipcMain.on('async-message-to-main', (event, arg) => {
  // console.log('[channel] - "async-message-to-main"')
  // console.log('[IpcMainEvent] - ', event)
  // console.log('[arg] - ', arg)

  event.reply('async-reply', 'pong')
})

ipcMain.on('open-preference-window', (event, arg) => {
  // console.log('[channel] - "open-preference-window"')
  // console.log('[IpcMainEvent] - ', event)
  // console.log('[arg] - ', arg)

  cr.preferenceWindow.toggle()
  event.returnValue = 'pong'
})
