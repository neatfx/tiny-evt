import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'

export default class PreferenceWindow {
  window: BrowserWindow | null
  option: BrowserWindowConstructorOptions
  constructor() {
    this.option = {
      center: true,
      width: 400,
      height: 300,
      webPreferences: {
        nodeIntegration: true
      }
    }
    this.window = null
  }
  init(){
    this.window = new BrowserWindow(this.option)
    // this.window.on('ready-to-show', () => {
    //   this.window?.show()
    // })

    this.window.on('closed', () => {
      this.window = null
    })
  }
  toggle() {
    if (this.window === null) {
      this.init()
    } else {
      this.window.show()
    }
  }
}