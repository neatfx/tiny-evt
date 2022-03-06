import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import path from 'path'

export default class {
  window: BrowserWindow | null
  option: BrowserWindowConstructorOptions
  pageUrl: string
  preloadPath: string
  constructor() {
    this.window = null
    this.pageUrl =
    process.env.NODE_ENV === 'development'
      ? path.join(__dirname, '../main/window/about.html')
      : path.join(__dirname, './renderer/index.html')
  this.preloadPath =
    process.env.NODE_ENV === 'development'
      ? path.join(__dirname, './window/about-preload.js')
      : path.join(__dirname, './window/about-preload.js')
    this.option = {
      title: '',
      center: true,
      width: 300,
      height: 280,
      resizable: false,
      maximizable: false,
      minimizable: false,
      backgroundColor: '#ececec',
      webPreferences: {
        preload: this.preloadPath
      },
      show: false
    }
  }
  async init() {
    this.window = new BrowserWindow(this.option)
    this.window.on('ready-to-show', () => {
      this.window?.hide()
    })

    this.window.on('close', (e) => {
      e.preventDefault()
      this.window?.hide()
    })

    await this.window.loadFile(this.pageUrl)
  }
}