import { app, Tray, Menu } from 'electron'

export default class {
  iconPath: any
  tray: Tray
  constructor(iconPath) {
    this.iconPath = iconPath
  }
  init() {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: '退出应用',
        click: () => {
          app.quit()
        }
      }
    ])
    this.tray = new Tray(this.iconPath)
    this.tray.setToolTip('TinyEvt')
    this.tray.setContextMenu(contextMenu)
  }
}