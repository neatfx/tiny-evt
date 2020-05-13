import { BrowserWindow } from 'electron'

export default class {
  iconPath: string
  winURL: string
  window: BrowserWindow
  constructor(iconPath: string, winURL: string) {
    this.iconPath = iconPath
    this.winURL = winURL
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
      this.window.show()
    })

    this.window.on('closed', () => {
      this.window = null
    })

    this.window.loadURL(this.winURL)
  }
  toggle() {
    if (this.window === null) {
      this.init()
    } else {
      if (this.window.isVisible()) {
        this.window.hide()
      } else {
        this.window.show()
        this.window.focus()
      }
    }
  }
}