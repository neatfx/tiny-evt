import darwinMenu from './darwin'
import linuxMenu from './linux'
import win32Menu from './win32'

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
