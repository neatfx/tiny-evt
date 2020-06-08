import { app, Tray, Menu } from 'electron'
import path from 'path'

import resources from './resources'

export default class {
  tray: Tray | null
  trayIconPath: string
  contextMenu: Menu
  constructor() {
    this.tray = null
    this.trayIconPath =
      process.env.NODE_ENV === 'development'
        ? path.join(
            __dirname,
            '../main/resources/' + resources['icon-tray-png-16']
          )
        : path.join(__dirname, '../resources/icons/tray.png')
    this.contextMenu = Menu.buildFromTemplate([
      { label: '选项', type: 'radio' },
      {
        label: '退出',
        click: () => {
          app.quit()
        }
      }
    ])
  }
  init() {
    this.tray = new Tray(this.trayIconPath)
    this.tray.setToolTip('TinyEvt')
    this.tray.setContextMenu(this.contextMenu)
  }
}
