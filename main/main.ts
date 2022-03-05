import { app, BrowserWindow } from 'electron'

// Menu & Window & Tray
import Menu from './menu'
import MainWindow from './window/index'
import AboutWindow from './window/about'
import AppTray from './tray'

//////////////
// 安全相关
/////////////////
// const { app } = require('@electron/remote')
// require('@electron/remote/main').initialize()
// import './security/remote-module-filter'
import './security-web-contents'

// 基于白名单控制的 IPC 通道（ 对外暴露 electronAPI ）
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

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  // console.log(BrowserWindow.getAllWindows().length)
})

app.on('before-quit', () => {
  aboutWindow.window?.destroy() // 隐藏窗口需要主动销毁
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit() // Mac平台不会退出
})

app.on('activate', () => {
  mainWindow.toggle()
})
