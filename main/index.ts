import { app } from 'electron'

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