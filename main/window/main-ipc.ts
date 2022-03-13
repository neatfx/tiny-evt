/////////////
// IPC API
////////////////

import { ipcMain, nativeTheme } from 'electron'

export function addIpcListener(){
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
    return 'system'
  })
}
