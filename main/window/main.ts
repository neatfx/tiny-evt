import { BrowserWindow, ipcMain, nativeTheme } from 'electron'
import path from 'path'

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
  init() {
    this.window = new BrowserWindow({
      icon: this.iconPath,
      center: true,
      show: false,
      webPreferences: {
        contextIsolation: true,
        preload: this.preloadPath,
        nodeIntegration: true,
        nodeIntegrationInWorker: true
      }
    })

    this.window.on('ready-to-show', () => {
      this.window?.show()
    })

    this.window.on('closed', () => {
      this.window = null
    })

    process.env.NODE_ENV === 'development'
      ? this.window.loadURL(this.pageUrl)
      : this.window.loadFile(this.pageUrl)

    ipcMain.handle('dark-mode:toggle', () => {
      if (nativeTheme.shouldUseDarkColors) {
        nativeTheme.themeSource = 'light'
      } else {
        nativeTheme.themeSource = 'dark'
      }
      return nativeTheme.shouldUseDarkColors
    })
  
    ipcMain.handle('dark-mode:system', () => {
      nativeTheme.themeSource = 'system'
    })
  }
  toggle() {
    if (this.window === null) {
      this.init()
    } else if (this.window.isVisible()) {
      this.window.hide()
    } else {
      this.window.show()
      this.window.focus()
    }
  }
}
