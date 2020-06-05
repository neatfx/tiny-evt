import { app, BrowserWindow, dialog, ipcMain as ipc, MessageBoxReturnValue } from 'electron'
import path from 'path'

let status = 0
// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let win: BrowserWindow | null
const iconPath =  process.env.NODE_ENV === 'development'
  ? path.join(__dirname, '../main/resources/icons/icon.png')
  : path.join(__dirname, '../resources/icons/icon.png')
const pageUrl = process.env.NODE_ENV === 'development'
  ? 'http://127.0.0.1:3000'
  : path.join(__dirname, './renderer/index.html')
const preloadPath = process.env.NODE_ENV === 'development'
  ? path.join(__dirname, './preload.js')
  : path.join(__dirname, './preload.js')

export function createWindow() {
  // 创建浏览器窗口
  win = new BrowserWindow({
    icon: iconPath,
    center: true,
    show: false,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      preload: preloadPath
    }
  })

  // 打开开发者工具
  // win.webContents.openDevTools()

  // 加载index.html文件
  win.loadFile(pageUrl)

  win.on('close', function (e) {
    if (status == 0) {
      if (win) {
        win.webContents.send('app-close')
      }
    }
  })

  // 当 window 被关闭，这个事件会被触发。
  win.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    status = 1
    win = null
  })

  win.webContents.on('crashed', () => {
    const options = {
      type: 'error',
      title: '进程崩溃了',
      message: '这个进程已经崩溃.',
      buttons: ['重载', '退出'],
    }

    recordCrash().then(() => {
      if(win) {
        dialog.showMessageBox(win, options).then((value: MessageBoxReturnValue) => {
          if (value.response === 0) reloadWindow(win)
          else app.quit()
        }).catch((e) => {
          console.log('err', e)
        });
      }
    })
  })

  function recordCrash() {
    return new Promise(resolve => {
      // 崩溃日志请求成功.... 
      resolve();
    })
  }

  function reloadWindow(mainWin: BrowserWindow | null) {
    if (!mainWin) {
      app.relaunch()
      app.exit(0)
    } else {
      BrowserWindow.getAllWindows().forEach((w) => {
        if (w.id !== mainWin.id) w.destroy()
      })
      mainWin.reload()
    }
  }
}

// ipc.on('closed', () => {
//   status = 1
//   win = null
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

// // Electron 会在初始化后并准备
// // 创建浏览器窗口时，调用这个函数。
// // 部分 API 在 ready 事件触发后才能使用。
// app.on('ready', createWindow)

// // 当全部窗口关闭时退出。
// app.on('window-all-closed', () => {
//   // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
//   // 否则绝大部分应用及其菜单栏会保持激活。
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

// app.on('activate', () => {
//   // 在macOS上，当单击dock图标并且没有其他窗口打开时，
//   // 通常在应用程序中重新创建一个窗口。
//   if (win === null) {
//     createWindow()
//   }
// })

// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。