import { app, Menu, dialog, BrowserWindow } from 'electron'

export default class {
  static init() {
    const template = [
      ...(process.platform === 'darwin'
        ? [
            {
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
                    let preferenceWindow = new BrowserWindow({
                      titleBarStyle: 'hiddenInset',
                      minimizable: false,
                      maximizable: false,
                      width: 400,
                      height: 500
                    })
                    preferenceWindow.on('closed', () => {
                      preferenceWindow = null
                    })
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
            }
          ]
        : []),
      {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { role: 'forcereload' },
          { role: 'toggledevtools' },
          { type: 'separator' },
          { role: 'togglefullscreen' }
        ]
      }
    ]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  }
}