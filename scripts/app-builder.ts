import { build as viteBuild, InlineConfig } from 'vite'
import { build as esbuild } from 'esbuild'
import { build as electronBuild, Platform, CliOptions } from 'electron-builder'

import esbuildConfig from '../configs/esbuild.config'
import viteConfig from '../configs/vite.config'
import electronBuilderConfig from '../configs/electron-builder'

async function packMain() {
  try {
    await esbuild(esbuildConfig.dist)
  } catch (err) {
    console.log(`\nfailed to build main process`)
    console.error(`\n${err}\n`)
    process.exit(1)
  }
}

async function packRenderer() {
  try {
    return await viteBuild(viteConfig as InlineConfig)
  } catch (err) {
    console.log(`\nfailed to build renderer process`)
    console.error(`\n${err}\n`)
    process.exit(1)
  }
}

const buildStart = Date.now()

Promise.all([
  packMain(), 
  packRenderer()
])
  .then((result) => {
    const options: CliOptions = {
      targets: Platform.current().createTarget(),
      config: electronBuilderConfig
    }

    if (process.env.PUBLISH_BUILD === 'true') options.publish = 'always'

    electronBuild(options)
      .then(() => {
        console.log(
          '\nBuild completed in',
          Math.floor((Date.now() - buildStart) / 1000) + ' s.'
        )
      })
      .catch((e) => {
        console.error(e)
      })
  })
  .catch((e) => console.log(e))
