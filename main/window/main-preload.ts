////////////////////////
// 上下文隔离
// 自 Electron 12 起默认启用，为推荐安全设置
///////////////////////////////////////////

import { contextBridge, ipcRenderer } from 'electron'
import { writeFile } from 'fs'
import { suggestBook } from '../douban-book-api'

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
  toggle: (): Promise<boolean> => {
    // const channel = 'dark-mode:toggle'
    // if (!validChannels.includes(channel)) {
    //   invalidElectionAPI(channel)
    //   return
    // }
    return ipcRenderer.invoke('dark-mode:toggle')
  },
  system: (): Promise<string> => ipcRenderer.invoke('dark-mode:system'),
})

contextBridge.exposeInMainWorld('electronDatabase', {
  saveExportedDatabaseFile: async (file: Blob) => {
    const data = writeFile('./db-exported.json', await file.text(), (err) => { })
    return data
  }
})

contextBridge.exposeInMainWorld('electronDouban', {
  suggestBook: async (keyword: string) => {
    const res = await suggestBook(keyword)
    console.log(res)
    return true
  }
})

/////////////////////////////////////////////////////////
// preload process 运行于与 Chrome 扩展相同的安全沙箱环境
/////////////////////////////////////////////////////////////

window.addEventListener('DOMContentLoaded', () => {
})
