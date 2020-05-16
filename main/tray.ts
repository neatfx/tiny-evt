import { app, Tray, Menu } from 'electron'
import path from 'path'

const trayIconPath = process.env.NODE_ENV === 'development'
  ? path.join(__dirname, '../resources/icons/tray.png')
  : path.join(__dirname, '/resources/icons/tray.png')
const contextMenu = Menu.buildFromTemplate([
  { label: '选项', type: 'radio' },
  {
    label: '退出',
    click: () => {
      app.quit()
    }
  }
])

export default function() {
    const tray = new Tray(trayIconPath)
    tray.setToolTip('TinyEvt')
    tray.setContextMenu(contextMenu)

    return tray
}