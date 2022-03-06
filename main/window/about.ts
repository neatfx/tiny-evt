import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import path from 'path'

export default class {
  window: BrowserWindow | null
  option: BrowserWindowConstructorOptions
  pageUrl: string
  preloadPath: string
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
        ? path.join(__dirname, '../main/window/about.html')
        : path.join(__dirname, './renderer/index.html')
    this.preloadPath =
      process.env.NODE_ENV === 'development'
        ? path.join(__dirname, './window/about-preload.js')
        : path.join(__dirname, './window/about-preload.js')
  }
  async init() {
    this.window = new BrowserWindow(this.option)
    this.window.on('ready-to-show', () => {
      this.window?.hide()
      // process.versions['chrome']
    })

    this.window.on('close', (e) => {
      e.preventDefault()
      this.window?.hide()
    })

    await this.window.loadFile(this.pageUrl)
  }
}

//   // async toggle() {
//   //   // if (this.window === null) {
//   //   //   await this.init()
//   //   // }else{
//   //   if (this.window?.isVisible()) {
//   //     this.window.hide()
//   //   } else {
//   //     this.window?.show()
//   //     // this.window.focus()
//   //   }
//   //   // }
//   // }
// }
