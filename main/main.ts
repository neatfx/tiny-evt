import { app, ipcMain } from 'electron'

import './security/remote-module-filter'
import './security/web-contents'

import Menu from './menu'

import MainWindow from './windows/main'
import AboutWindow from './windows/about'
import AppTray from './tray'

const mainWindow = new MainWindow()
const aboutWindow = new AboutWindow()
const tray = new AppTray()

export interface ComponentsRouter {
  aboutWindow: AboutWindow
  mainWindow: MainWindow
}
const cr: ComponentsRouter = {
  aboutWindow: aboutWindow, 
  mainWindow: mainWindow
}

app.on('ready', async () => {
  Menu(cr)
  mainWindow.init()
  await aboutWindow.init()
  tray.init()
})

app.on('window-all-closed', () => {
  // FIXME: 与 Spectron 的 app.stop() 冲突，导致测试完毕后应用无法关闭
  // if (process.platform !== 'darwin') {
  app.quit()
  // }
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

ipcMain.on('open-about-window', async (event, arg) => {
  // console.log('[channel] - "open-preference-window"')
  // console.log('[IpcMainEvent] - ', event)
  // console.log('[arg] - ', arg)

  await cr.aboutWindow.toggle()
  event.returnValue = 'pong'
})

ipcMain.on('get-sys-info', (event, arg) => {
  // console.log('[channel] - "open-preference-window"')
  // console.log('[IpcMainEvent] - ', event)
  // console.log('[arg] - ', arg)
  event.returnValue = process.versions['chrome']
})