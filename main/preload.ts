import { contextBridge, ipcRenderer } from 'electron'

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
      send: (channel, data) => {
          if (validChannels.send.includes(channel)) {
            ipcRenderer.send(channel, data);
          }
      },
      sendSync: (channel, data) => {
        if (validChannels.sendSync.includes(channel)) {
            const result = ipcRenderer.sendSync(channel, data)
            return result
        }
      },
      receive: (channel, func) => {
          if (validChannels.receive.includes(channel)) {
              ipcRenderer.on(channel, (event, ...args) => {
                console.log(event, args)
              });
          }
      }
  }
);