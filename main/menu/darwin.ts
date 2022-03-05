import { app, Menu, MenuItem } from 'electron'
import type { ComponentsRouter } from '../main'

export default function (cr: ComponentsRouter) {
  const appMenu = new MenuItem({
    label: app.name,
    submenu: [
      {
        label: '关于 ' + app.name,
        click: () => {
          cr.aboutWindow.window?.show()
        }
      },
      {
        label: '设置选项',
        click: () => {
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
