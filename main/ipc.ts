import { ipcMain } from 'electron'
import {list} from '../renderer/db/api'

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
  // event.reply(l)
})
