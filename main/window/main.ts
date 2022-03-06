import { BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { addIpcHandler } from './main-ipc'

export default class {
  window: BrowserWindow | null
  iconPath: string
  pageUrl: string
  preloadPath: string
  constructor() {
    this.window = null
    this.iconPath =
      process.env.NODE_ENV === 'development'
        ? path.join(__dirname, '../main/resources/icons/icon.png')
        : path.join(__dirname, '../resources/icons/icon.png')
    this.pageUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://127.0.0.1:3000'
        : path.join(__dirname, './renderer/index.html')
    this.preloadPath =
      process.env.NODE_ENV === 'development'
        ? path.join(__dirname, './window/main-preload.js')
        : path.join(__dirname, './window/main-preload.js')
  }
  async init() {
    this.window = new BrowserWindow({
      icon: this.iconPath,
      center: true,
      show: false,
      webPreferences: {
        preload: this.preloadPath,
        // nodeIntegration: true,
        // nodeIntegrationInWorker: true
      }
    })

    this.window.on('ready-to-show', () => {
      addIpcHandler()
      this.window?.show()
    })

    this.window.on('close', () =>{
      ipcMain.removeHandler('dark-mode:toggle')
      ipcMain.removeHandler('dark-mode:system')
      // ipcMain.removeAllListeners()
    })

    process.env.NODE_ENV === 'development'
      ? this.window.loadURL(this.pageUrl)
      : this.window.loadFile(this.pageUrl)
  }
}