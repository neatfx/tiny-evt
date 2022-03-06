// 自 Electron 12 以来，默认启用上下文隔离，所有应用程序推荐的安全设置
// 由于 preload process 可访问全部 Node.js API，封装后暴露给 renderer process 进行有限制的调用以保证安全

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

contextBridge.exposeInMainWorld('processVersion', {
  get: () => ipcRenderer.invoke('process-version')
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
