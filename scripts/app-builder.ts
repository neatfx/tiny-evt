import { build as viteBuild } from 'vite'
// import { build as esbuild } from 'esbuild'
import { build as electronBuild, Platform } from 'electron-builder'
import { spawn } from 'child_process'

// import esbuildConfig from '../configs/esbuild.config'
import viteConfig from '../configs/vite.config'
import electronBuilderConfig from '../configs/electron-builder'

function packMain () {
  return new Promise((resolve, reject) => {
    const args = [
      '--platform=node',
      '--bundle',
      '--minify',
      '--external:electron',
      '--external:path',
      '--external:fs',
      'main/main.ts',
      'main/preload.ts',
      '--outdir=build'
    ]

    spawn('esbuild', args, {
      stdio: 'inherit'
    }).on('close', () => {
      resolve()
    })
  })

  // return esbuild(esbuildConfig.dist).then(result => {
  //   console.log(result.stderr)
  // })
  // .catch(err => {
  //   console.log(`\nfailed to build main process`)
  //   console.error(`\n${err}\n`)
  //   process.exit(1)
  // })
}

function packRenderer() {
  return viteBuild(viteConfig.buildConfig)
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
        targets: Platform.current().createTarget(),
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