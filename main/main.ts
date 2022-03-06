import { app, BrowserWindow } from 'electron'
import { setIpc } from './window/main-ipc'

// Menu & Window & Tray
import Menu from './menu'
import MainWindow from './window/main'
import AboutWindow from './window/about'
import AppTray from './tray'

//////////////
// 安全相关
/////////////////
// const { app } = require('@electron/remote')
// require('@electron/remote/main').initialize()
// import './security/remote-module-filter'
import './security-web-contents'

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
  mainWindow.init()
  aboutWindow.init()
  Menu(cr)
  tray.init()
  setIpc()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 1) mainWindow.init()
  })
})

app.on('before-quit', () => {
  aboutWindow.window?.destroy() // 主动销毁隐藏窗口
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
