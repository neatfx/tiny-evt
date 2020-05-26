import { contextBridge, ipcRenderer } from 'electron'
import { readFileSync } from 'fs'

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object

// whitelist channels
const validChannels = {
  send: ["async-message-to-main"],
  sendSync: ["open-preference-window"],
  receive: ["fromMain", "async-reply"]
}

contextBridge.exposeInMainWorld(
  "ipcApi", {
      send: (channel: string, data: object) => {
          if (validChannels.send.includes(channel)) {
            ipcRenderer.send(channel, data);
          }
      },
      sendSync: (channel: string, data: object) => {
        if (validChannels.sendSync.includes(channel)) {
            const result = ipcRenderer.sendSync(channel, data)
            return result
        }
      },
      receive: (channel: string, func: () => {}) => {
          if (validChannels.receive.includes(channel)) {
              ipcRenderer.on(channel, (event, ...args) => {
                console.log(event, args)
              });
          }
      },
      // 上下文隔离 - preload 中可访问 node 提供的功能，封装之后暴露给 renderer process 使用，此处代码仅为示例
      readConfig: () => {
        const data = readFileSync('./config.json')
        return data
      }
  }
)
