import { build } from 'vite'
import esbuild from 'esbuild'
const builder = require('electron-builder')

import esbuildConfig from '../configs/esbuild.config.dist'
import viteConfig from '../configs/vite.config.dist'
import builderConfig from '../configs/electron-builder.conf'

function packMain () {
  return esbuild.build(esbuildConfig).then(result => {
    console.log(result.stderr)
  })
  .catch(err => {
    console.log(`\nfailed to build main process`)
    console.error(`\n${err}\n`)
    process.exit(1)
  })
}

function packRenderer() {
  return build(viteConfig)
  .catch(err => {
    console.log(`\nfailed to build renderer process`)
    console.error(`\n${err}\n`)
    process.exit(1)
  })
}

const buildStart = Date.now()

Promise.all([packMain(), packRenderer()])
  .then(result => {
    builder.build({
        targets: builder.Platform.MAC.createTarget(),
        config: builderConfig
      })
      .then(m => {
        console.log('\nBuild completed in', Math.floor((Date.now() - buildStart) / 1000) + ' s.')
      })
      .catch(e => {
        console.error(e)
      })
  })
  .catch(e => console.log(e))