const { build } = require('vite')
const esbuild = require('esbuild')
const builder = require('electron-builder')
const builderConfig = require('../configs/electron-builder')

function packMain () {
  return esbuild.build({
    entryPoints: ['main/main.ts', 'main/preload.ts'],
    outdir: 'build/',
    minify: true,
    bundle: true,
    external: ['electron', 'path']
  }).then(result => {
    console.log(result.stderr)
  })
  .catch(err => {
    console.log(`\n failed to build main process`)
    console.error(`\n${err}\n`)
    process.exit(1)
  })
}

function packRenderer() {
  return build({
    bundle: true,
    root: 'renderer',
    base: '.',
    outDir: 'build/renderer',
    assetsDir: '.',
  }).then(result => {
  })
  .catch(err => {
    console.log(`\n failed to build renderer process`)
    console.error(`\n${err}\n`)
    process.exit(1)
  })
}

console.log(`Building Main & Renderer...\n--------------------`)
const buildStart = Date.now()
Promise.all([packMain(), packRenderer()])
  .then(result => {
    builder.build({
        targets: builder.Platform.MAC.createTarget(),
        config: builderConfig
      })
      .then(m => {
        console.log('\nBUILD TIME: ', Math.floor((Date.now() - buildStart) / 1000) + ' s')
      })
      .catch(e => {
        console.error(e)
      })
  })
  .catch(e => console.log(e))