import { app } from 'electron'

// const { app } = require('@electron/remote')
// require('@electron/remote/main').initialize()

// import './security/remote-module-filter'
import './security-web-contents'

import Menu from './menu'

import MainWindow from './window-index'
import AboutWindow from './window-about'

import AppTray from './tray'

import './ipc'

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

app.whenReady().then(async () => {
  Menu(cr)
  mainWindow.init()
  await aboutWindow.init()
  tray.init()
})

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  mainWindow.toggle()
})
