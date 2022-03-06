import { BrowserWindow } from 'electron'
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
      this.window?.show()
    })

    process.env.NODE_ENV === 'development'
      ? this.window.loadURL(this.pageUrl)
      : this.window.loadFile(this.pageUrl)
  }
  // async toggle() {
  //   if (this.window === null) {
  //    await this.init()
  //   }
  //   if (this.window!.isVisible()) {
  //     this.window!.hide()
  //   } else {
  //     this.window!.show()
  //     this.window!.focus()
  //   }
  // }
}
