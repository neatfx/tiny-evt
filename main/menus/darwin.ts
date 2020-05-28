import { app, Menu, MenuItem } from 'electron'
import { ComponentsRouter } from '../main'

export default function(cr: ComponentsRouter) {
  const appMenu = new MenuItem({
    label: app.name,
    submenu: [
      {
        label: '关于',
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        label: '发送消息至 RendererProcess',
        click: (a,b,c) => {
          cr.mainWindow.window?.webContents.send('ipc_from_main', '/c')
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
    role: 'viewMenu',
  })
  const menu = Menu.buildFromTemplate([appMenu, viewMenu])

  Menu.setApplicationMenu(menu)
}