// 自 Electron 12 起默认启用上下文隔离，为推荐安全设置

import { contextBridge, ipcRenderer } from 'electron'
import { readFileSync } from 'fs'

// 白名单
const validChannels = {
  send: ['async-ipc-from-renderer-to-main', 'reset-testing-db'],
  sendSync: ['async-message-to-main'],
  receive: ['ipc_from_main']
}

function invalidElectionAPI(channel: string){
  console.log('invalidElectionAPI: ', channel)
}

contextBridge.exposeInMainWorld('electronAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs'),
  send: (channel: string, data: object) => {
    if (!validChannels.send.includes(channel)) {
      invalidElectionAPI(channel)
      return
    }

    ipcRenderer.send(channel, data)
  },
  sendSync: (channel: string, data: object) => {
    if (validChannels.sendSync.includes(channel)) {
      const result = ipcRenderer.sendSync(channel, data)
      console.log('[@preload.ipcApi.sendSync -> result]', result)
      return result
    }
  },
  receive: (channel: string, callback: (args: object) => void) => {
    if (validChannels.receive.includes(channel)) {
      console.log('[@preload.ipcApi.receive -> listens to channel]', channel)
      ipcRenderer.on(channel, (event, ...args) => {
        console.log('[@preload.ipcApi.receive -> on message]', event, args)
        callback(args)
      })
    }
  },
  readConfig: () => {
    const data = readFileSync('./config.json')
    return data
  }
})

contextBridge.exposeInMainWorld('darkMode', {
  toggle: (): Promise<boolean> => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})

import { db } from "../../renderer/db/db";
// import Contact from "../../renderer/db/tables/Contactact";

// preload process 运行于与 Chrome 扩展相同的安全沙箱环境
// TODO: DB API 处理
window.addEventListener('DOMContentLoaded', () => {
  // db.contacts.toArray((data) => {
  //   console.log('main call db - ', data)
  // });
})
