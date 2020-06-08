import darwinMenu from './menus/darwin'
import linuxMenu from './menus/linux'
import win32Menu from './menus/win32'

export default (() => {
  if (process.platform === 'darwin') {
    return darwinMenu
  }

  if (process.platform === 'linux') {
    return linuxMenu
  }

  if (process.platform === 'win32') {
    return win32Menu
  }

  return () => {
    console.log('unsupported platform!')
  }
})()
