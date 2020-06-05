import { build as viteBuild } from 'vite'
// import { build as esbuild } from 'esbuild'
import { build as electronBuild, Platform } from 'electron-builder'
import { execSync, exec, spawn, ExecException } from 'child_process'

// import esbuildConfig from '../configs/esbuild.config'
import viteConfig from '../configs/vite.config'
import electronBuilderConfig from '../configs/electron-builder'

// const run = (cmd: string, callback: (error: ExecException | null, stdout: string, stderr: string) => void) => exec(cmd, (error, stdout, stderr) => callback(error, stdout, stderr))
const run = (cmd: string, cwd: string) => execSync(cmd, { encoding: "utf8", stdio: "inherit", cwd })

async function packMain () {
  // return new Promise((resolve, reject) => {
  //   const args = [
  //     '--platform=node',
  //     '--bundle',
  //     '--minify',
  //     '--external:electron',
  //     '--external:path',
  //     '--external:fs',
  //     'main/main.ts',
  //     'main/preload.ts',
  //     '--outdir=build'
  //   ]

  //   spawn('esbuild', args, {
  //     stdio: 'inherit'
  //   }).on('close', () => {
  //     resolve()
  //   })
  // })

  return new Promise((resolve, reject) => {
    // run('esbuild --platform=node --bundle --minify --external:electron --external:path --external:fs main/main.ts main/preload.ts --outdir=build', (error, stdout, stderr) => {
    //   if(error) return reject(error)
    //   resolve(stdout)
    // })

    run('esbuild --platform=node --bundle --minify --external:electron --external:path --external:fs main/main.ts main/preload.ts --outdir=build', '.')
    resolve()
  })

  // try {
  //   const result = await esbuild(esbuildConfig.dist)
  //   console.log(result.stderr)
  // }
  // catch (err) {
  //   console.log(`\nfailed to build main process`)
  //   console.error(`\n${err}\n`)
  //   process.exit(1)
  // }
}

async function packRenderer() {
  // try {
  //   return viteBuild(viteConfig.buildConfig)
  // }
  // catch (err) {
  //   console.log(`\nfailed to build renderer process`)
  //   console.error(`\n${err}\n`)
  //   process.exit(1)
  // }

  return new Promise((resolve, reject) => {
    // run('vite build --root renderer --outDir=build/renderer', (error, stdout, stderr) => {
    //   if(error) return reject(error)
    //   resolve(stdout)
    // })

    run('vite build --root renderer --base . --outDir build/renderer', '.')
    resolve()
  })
}

const buildStart = Date.now()

Promise.all([packMain(), packRenderer()])
  .then(result => {
    electronBuild({
        targets: Platform.current().createTarget(),
        config: electronBuilderConfig,
        publish: process.env.PUBLISH_BUILD ? 'always' : 'never'
      })
      .then(() => {
        console.log('\nBuild completed in', Math.floor((Date.now() - buildStart) / 1000) + ' s.')
      })
      .catch(e => {
        console.error(e)
      })
  })
  .catch(e => console.log(e))