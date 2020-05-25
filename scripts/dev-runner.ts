import { createServer } from 'vite'
import { spawn, ChildProcessWithoutNullStreams } from 'child_process'
import { build } from 'esbuild'

import viteServerConfig from '../configs/vite.config.dev'
import esbuildConfig from '../configs/esbuild.config.dev'

let electronProcess: ChildProcessWithoutNullStreams | null

function runRenderer() {
  return new Promise((resolve, reject) => {
    createServer(viteServerConfig)
    .on("listening", () => {
      console.log("Vite-Dev-Server running on localhost:3000")
      if(process.env.TEST === 'cypress') {
        const args = [
          'open',
          '--config-file',
          'configs/cypress.json'
        ]
        spawn('cypress', args)
      }
      resolve()
    })
    .on("error", (e) => {
      console.log('Vite-Dev-Server Error: ', e)
      reject()
    })
    .listen(viteServerConfig.port)
  })
}

async function runMain() {
    return build(esbuildConfig).then(() => {
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
  const electronProcess = spawn('electron', args)

  electronProcess.stdout.on('data', data => {
    electronEcho(data)
  })

  electronProcess.stderr.on('data', data => {
    electronEcho(data)
  })

  electronProcess.on('close', () => {
    process.exit()
  })
}

if(process.env.TEST === 'cypress') {
  runRenderer()
} else {
Promise.all([runRenderer(), runMain()])
  .then(() => {
    runElectron()
  })
  .catch(err => {
    console.error(err)
  })
}

function electronEcho(data: string[]) {
  let log = '\n'

  data = data.toString().split(/\r?\n/)
  data.forEach(line => {
    log += `  ${line}\n`
  })

  if (/[0-9A-z]+/.test(log)) {
      console.log(log)
  }
}