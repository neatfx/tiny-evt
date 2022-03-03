import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import path from 'path'

export default class {
  window: BrowserWindow | null
  option: BrowserWindowConstructorOptions
  pageUrl: string
  constructor() {
    this.window = null
    this.option = {
      title: '',
      center: true,
      width: 300,
      height: 300,
      resizable: false,
      backgroundColor: '#ececec',
      webPreferences: {
        nodeIntegration: true
      },
      show: false
    }
    this.pageUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://127.0.0.1:3000/#/preferences'
        // path.join(__dirname, './renderer/index.html')
        : path.join(__dirname, './renderer/about.html')
  }
  async init() {
    this.window = new BrowserWindow(this.option)
    this.window.on('ready-to-show', () => {
      this.window?.hide()
      // process.versions['chrome']
    })

    this.window.on('closed', () => {
      this.window = null
    })

    if(process.env.NODE_ENV === 'development') {
      this.window.loadFile(path.join(__dirname, '../renderer/pages/about/about.html'))
      // this.window.loadURL('http://127.0.0.1:3000/#preferences')
    } else {
      // console.log('load file')
      await this.window.loadFile(this.pageUrl)
    }
  }

  async toggle() {
    if (this.window === null) {
      await this.init()
    }
    if (this.window?.isVisible()) {
      this.window.hide()
    } else {
      this.window?.show()
      // this.window.focus()
    }
  }
}
