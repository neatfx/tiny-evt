import { build as viteBuild } from 'vite'
import { build as esbuild } from 'esbuild'
import { build as electronBuild, Platform } from 'electron-builder'

import esbuildConfig from '../configs/esbuild.config.dist'
import viteBuildConfig from '../configs/vite.config.dist'
import electronBuilderConfig from '../configs/electron-builder'

function packMain () {
  return esbuild(esbuildConfig).then(result => {
    console.log(result.stderr)
  })
  .catch(err => {
    console.log(`\nfailed to build main process`)
    console.error(`\n${err}\n`)
    process.exit(1)
  })
}

function packRenderer() {
  return viteBuild(viteBuildConfig)
  .catch(err => {
    console.log(`\nfailed to build renderer process`)
    console.error(`\n${err}\n`)
    process.exit(1)
  })
}

const buildStart = Date.now()

Promise.all([packMain(), packRenderer()])
  .then(result => {
    electronBuild({
        targets: Platform.MAC.createTarget(),
        config: electronBuilderConfig
      })
      .then(() => {
        console.log('\nBuild completed in', Math.floor((Date.now() - buildStart) / 1000) + ' s.')
      })
      .catch(e => {
        console.error(e)
      })
  })
  .catch(e => console.log(e))