////////////////////////
// 上下文隔离
// 自 Electron 12 起默认启用，为推荐安全设置
///////////////////////////////////////////

import { contextBridge, ipcRenderer } from 'electron'
import { readFileSync } from 'fs'

// 白名单
const validChannels = [
  'dark-mode:toggle',
  'dark-mode:system',
  'db:reset-testing',
]

function invalidElectionAPI(channel: string) {
  console.log('invalidElectionAPI: ', channel)
}

contextBridge.exposeInMainWorld('electronDarkMode', {
  toggle: (): Promise<boolean> | void => {
    const channel = 'dark-mode:toggle'
    if (!validChannels.includes(channel)) {
      invalidElectionAPI(channel)
      return
    }
    ipcRenderer.invoke('dark-mode:toggle')
  },
  system: () => ipcRenderer.invoke('dark-mode:system'),
  loadPreferences: () => ipcRenderer.invoke('load-prefs'),
  readConfig: () => {
    const data = readFileSync('./config.json')
    return data
  }
})

contextBridge.exposeInMainWorld('electronDatabase', {
  resetTesting: () => ipcRenderer.invoke('db:reset-testing'),
})

contextBridge.exposeInMainWorld('electronPersisConf', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs'),
  readConfig: () => {
    const data = readFileSync('./config.json')
    return data
  }
})

///////////////////////////
// preload process 运行于与 Chrome 扩展相同的安全沙箱环境
///////////////////////////////

// import { db } from "../../renderer/db/db";
// import Contact from "../../renderer/db/tables/Contactact";

window.addEventListener('DOMContentLoaded', () => {
  // db.contacts.toArray((data) => {
  //   console.log('main call db - ', data)
  // });
})
