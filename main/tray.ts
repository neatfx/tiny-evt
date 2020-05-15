import { app, Tray, Menu, nativeImage } from 'electron'

export default class {
  iconPath: any
  tray: Tray
  constructor(iconPath) {
    this.iconPath = iconPath
  }
  init() {
    const trayIcon = nativeImage.createFromPath(this.iconPath)
    const contextMenu = Menu.buildFromTemplate([
      {
        label: '退出应用',
        click: () => {
          app.quit()
        }
      }
    ])
    this.tray = new Tray(trayIcon)
    this.tray.setToolTip('TinyEvt')
    this.tray.setContextMenu(contextMenu)
  }
}