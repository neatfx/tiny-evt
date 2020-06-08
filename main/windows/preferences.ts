import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import path from 'path'

export default class {
  window: BrowserWindow | null
  option: BrowserWindowConstructorOptions
  pageUrl: string
  constructor() {
    this.window = null
    this.option = {
      title: 'Preferences',
      center: true,
      width: 400,
      height: 300,
      backgroundColor: '#ececec',
      webPreferences: {
        nodeIntegration: true
      }
    }
    // TODO: 页面加载完成后，ipc 转向 /preferences
    this.pageUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://127.0.0.1:3000/#/preferences'
        : path.join(__dirname, './renderer/index.html')
  }
  init() {
    this.window = new BrowserWindow(this.option)
    // this.window.on('ready-to-show', () => {
    //   this.window?.show()
    // })

    this.window.on('closed', () => {
      this.window = null
    })

    // process.env.NODE_ENV === 'development'
    // ? this.window.loadURL(this.pageUrl)
    // : this.window.loadFile(this.pageUrl)
  }
  toggle() {
    if (this.window === null) {
      this.init()
    } else {
      this.window.show()
    }
  }
}
