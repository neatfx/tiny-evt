import { BrowserWindow, app } from 'electron'
import path from 'path'

export default class {
  window: BrowserWindow | null
  iconPath: string
  pageUrl: string
  preloadPath: string
  constructor() {
    this.window = null
    this.iconPath =  process.env.NODE_ENV === 'development'
      ? path.join(__dirname, '../main/resources/icons/icon.png')
      : path.join(__dirname, '/resources/icons/icon.png')
    this.pageUrl = process.env.NODE_ENV === 'development'
      ? `http://127.0.0.1:3000`
      : `file://${__dirname}/renderer/index.html`
    this.preloadPath = process.env.NODE_ENV === 'development'
    ? path.join(app.getAppPath(), 'preload.js')
    : path.join(app.getAppPath(), 'preload.js')
  }
  init() {
    this.window = new BrowserWindow({
      icon: this.iconPath,
      center: true,
      show: false,
      webPreferences: {
        nodeIntegration: false, // default === false 
        contextIsolation: true,
        enableRemoteModule: false, // default === true
        preload: this.preloadPath
      }
    })

    this.window.on('ready-to-show', () => {
      this.window?.show()
    })

    this.window.on('closed', () => {
      this.window = null
    })

   this.window.loadURL(this.pageUrl)
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