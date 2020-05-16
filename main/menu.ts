import { app, Menu, MenuItem } from 'electron'

import PreferenceWindow from './window-preference'

const preferenceWindow = new PreferenceWindow()
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
      label: '偏好设置',
      click: () => {
        preferenceWindow.toggle()
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