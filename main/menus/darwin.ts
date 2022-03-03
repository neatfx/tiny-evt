import { app, ipcMain, Menu, MenuItem } from 'electron'
import type { ComponentsRouter } from '../main'

export default function (cr: ComponentsRouter) {
  const appMenu = new MenuItem({
    label: app.name,
    submenu: [
      {
        label: '关于' + app.name,
        click: () => {
          ipcMain.emit('open-about-window', 'ping')
        }
      },
      { type: 'separator' },
      {
        label: '退出',
        click() {
          app.quit()
        }
      }
    ]
  })
  const viewMenu = new MenuItem({
    role: 'viewMenu'
  })
  const menu = Menu.buildFromTemplate([appMenu, viewMenu])

  Menu.setApplicationMenu(menu)
}
