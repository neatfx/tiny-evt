/////////////
// IPC API
////////////////

import { ipcMain, nativeTheme } from 'electron'
import {list} from '../../renderer/db/api'

export function addIpcListener(){
  ///////////////
  // 访问数据库
  ////////////////
  ipcMain.on('db:reset-testing', async(event, arg) => {
    let l = await list()
    console.log('db:reset-testing', l)
    event.reply(l)
  })
}

export function addIpcHandler(){
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
}
