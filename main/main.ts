import { app, ipcMain } from 'electron'

import Menu from './app-menu'

import MainWindow from './window-main'
import PreferenceWindow from './window-preference'
import AppTray from './app-tray'

const mainWindow = new MainWindow()
const tray = new AppTray()

export interface ComponentsRouter {
  preferenceWindow: PreferenceWindow 
}
const cr: ComponentsRouter = {
  preferenceWindow: new PreferenceWindow()
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
  console.log('[channel] - "async-message-to-main"')
  console.log('[IpcMainEvent] - ', event)
  console.log('[arg] - ', arg)

  event.reply('async-reply', 'pong')
})

ipcMain.on('open-preference-window', (event, arg) => {
  console.log('[channel] - "open-preference-window"')
  console.log('[IpcMainEvent] - ', event)
  console.log('[arg] - ', arg)

  cr.preferenceWindow.toggle()
  event.returnValue = 'pong'
})