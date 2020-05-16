import { BrowserWindow } from 'electron'
import path from 'path'

export default class {
  window: BrowserWindow | null
  iconPath: string
  pageUrl: string
  constructor() {
    this.window = null
    this.iconPath = path.join(__dirname, '/resources/icons/icon.png') 
    this.pageUrl = process.env.NODE_ENV === 'development'
      ? `http://127.0.0.1:3000`
      : `file://${__dirname}/renderer/index.html`
  }
  init() {
    this.window = new BrowserWindow({
      icon: this.iconPath,
      center: true,
      show: false,
      webPreferences: {
        nodeIntegration: true
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