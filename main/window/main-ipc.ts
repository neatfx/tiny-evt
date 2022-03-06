import { ipcMain, nativeTheme } from 'electron'
import {list} from '../../renderer/db/api'

export function setIpc(){
  ipcMain.on('async-message-to-main', (event, arg) => {
    // console.log('[channel] - "async-message-to-main"')
    // console.log('[IpcMainEvent] - ', event)
    // console.log('[arg] - ', arg)

    // event.reply('async-reply', 'pong')
    event.returnValue = process.versions['chrome']
  })

  ipcMain.on('get-sys-info', (event, arg) => {
    // console.log('[channel] - "open-preference-window"')
    // console.log('[IpcMainEvent] - ', event)
    // console.log('[arg] - ', arg)
    event.returnValue = process.versions['chrome']
  })

  //////////////////////////////
  // 访问数据库（ 调用 db/api ）
  ///////////////////////////////////

  ipcMain.on('reset-testing-db', async(event, arg) => {
    // console.log('[channel] - "open-preference-window"')
    // console.log('[IpcMainEvent] - ', event)
    // console.log('[arg] - ', arg)
    console.log('reset-testing-db')
    let l = await list()
    console.log('ipc - ', l)
    event.reply(l)
  })

  //////////////////////////////
  // Dark Mode
  //////////////////////////////
  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  })

  //////////////////////////////
  // Process.version
  //////////////////////////////
  ipcMain.handle('process-version', () => {
    let version = []

    for (const type of ['chrome', 'node', 'electron']) {
      version.push(process.versions[type])
    }
    return version
  })
}
