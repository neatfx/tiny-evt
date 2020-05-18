import darwinMenu from './menus/darwin'
// import ('./menus/linux')
// import ('./menus/win32')
import { ComponentsRouter } from './index'

export default function(cr: ComponentsRouter) {
  if (process.platform === 'darwin'){
    darwinMenu(cr)
  }

  if (process.platform === 'linux'){

  }

  if (process.platform === 'win32'){

  }
}