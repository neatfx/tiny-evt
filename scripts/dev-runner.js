const { createServer } = require('vite')
const electron = require('electron')
const { spawn } = require('child_process')
const esbuild = require('esbuild')

let electronProcess = null

function runRenderer() {
  return new Promise((resolve, reject) => {
    createServer({
      root: 'renderer',
      minify: false,
      optimizeDeps: {
        auto: false // FIXME: 默认值 true 会引发 package.json 未找到错误
      }
    })
    .on("listening", () => {
      console.log("Vite-Dev-Server running on localhost:3000")
      resolve()
    })
    .on("error", (e) => {
      console.log('Vite-Dev-Server Error: ', e)
      reject()
    })
    .listen(3000)
    .catch((e) => {
      console.log('Failed creating Vite server: ', e)
      reject()
    })
  })
}

async function runMain() {
    return esbuild.build({
      entryPoints: ['main/main.ts', 'main/preload.ts'],
      outdir: 'build/',
      minify: false,
      bundle: true,
      external: ['electron', 'path'],
    }).then(() => {
      if (electronProcess && electronProcess.kill) {
        process.kill(electronProcess.pid)
        electronProcess = null
      }
    }, (err) => {
      console.log(err)
    }).catch((e) => {
      return e
    })
}

function runElectron() {
  let args = [
    '--inspect=5858',
    'build/main.js'
  ]
  let electronProcess = spawn(electron, args)

  electronProcess.stdout.on('data', data => {
    electronEcho(data, 'blue')
  })

  electronProcess.stderr.on('data', data => {
    electronEcho(data, 'red')
  })

  electronProcess.on('close', () => {
    process.exit()
  })
}

Promise.all([runRenderer(), runMain()])
  .then(() => {
    runElectron()
  })
  .catch(err => {
    console.error(err)
  })

function electronEcho(data, color) {
  let log = '\n'

  data = data.toString().split(/\r?\n/)
  data.forEach(line => {
    log += `  ${line}\n`
  })

  if (/[0-9A-z]+/.test(log)) {
      console.log(log)
  }
}