import { app, Tray, Menu } from 'electron'

export default class {
  iconPath: any
  tray: Tray
  constructor(iconPath) {
    this.iconPath = iconPath
  }
  init() {
    this.tray = new Tray(this.iconPath)
    this.tray.setToolTip('TinyEvt')
    this.tray.setIgnoreDoubleClickEvents(true) // 忽略双击事件

    this.tray.on('click', () => {
      const contextMenu = Menu.buildFromTemplate([
        {
          label: '退出应用',
          click: () => {
            app.quit()
          }
        }
      ])
      this.tray.setContextMenu(contextMenu)
      this.tray.popUpContextMenu()
    })
  }
}