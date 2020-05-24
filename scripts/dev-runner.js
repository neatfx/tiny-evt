const { createServer } = require('vite')
const electron = require('electron')
const { spawn } = require('child_process')
const esbuild = require('esbuild')

const viteConfig = require('../configs/vite.config.dev')
const esbuildConfig = require('../configs/esbuild.config.dev')

let electronProcess = null

function runRenderer() {
  return new Promise((resolve, reject) => {
    createServer(viteConfig)
    .on("listening", () => {
      console.log("Vite-Dev-Server running on localhost:3000")
      resolve()
    })
    .on("error", (e) => {
      console.log('Vite-Dev-Server Error: ', e)
      reject()
    })
    .listen(viteConfig.port)
    .catch((e) => {
      console.log('Failed creating Vite server: ', e)
      reject()
    })
  })
}

async function runMain() {
    return esbuild.build(esbuildConfig).then(() => {
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
  const args = [
    '--inspect=5858',
    'build/main.js'
  ]
  const electronProcess = spawn(electron, args)

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