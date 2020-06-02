import { createServer, build as viteBuild } from 'vite'
import { spawn, ChildProcessWithoutNullStreams } from 'child_process'
import { build } from 'esbuild'

import viteConfig from '../configs/vite.config'
import esbuildConfig from '../configs/esbuild.config.dev'
import esbuildConfigSpectron from '../configs/esbuild.config.dev.spectron'
import esbuildConfigVtu from '../configs/esbuild.config.dev.vtu'

let electronProcess: ChildProcessWithoutNullStreams | null

function launchViteDevServer() {
  return new Promise((resolve, reject) => {
    createServer(viteConfig.serverConfig)
    .on("listening", () => {
      console.log("Vite-Dev-Server running on localhost:3000")
      resolve()
    })
    .on("error", (e) => {
      console.log('Vite-Dev-Server Error: ', e)
      reject()
    })
    .listen(viteConfig.serverConfig.port)
  })
}

async function buildMainProcess() {
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

async function buildSpectronTests() {
  return build(esbuildConfigSpectron).then(() => {
  }, (err) => {
    console.log(err)
  }).catch((e) => {
    return e
  })
}

async function buildVueTests() {
  return viteBuild(esbuildConfigVtu)
  .catch(err => {
    console.log(`\nfailed to build vue tests`)
    console.error(`\n${err}\n`)
    process.exit(1)
  })
}

function logPrinter(data: string[]) {
  let log = '\n'

  data = data.toString().split(/\r?\n/)
  data.forEach(line => {
    log += `  ${line}\n`
  })

  if (/[0-9A-z]+/.test(log)) {
      console.log(log)
  }
}

function runElectronApp() {
  const args = [
    '--inspect=5858',
    'build/main.js'
  ]
  const electronProcess = spawn('electron', args)

  electronProcess.stdout.on('data', data => {
    logPrinter(data)
  })

  electronProcess.stderr.on('data', data => {
    logPrinter(data)
  })

  electronProcess.on('close', () => {
    process.exit()
  })
}

if (process.env.TEST === 'cypress') {
  launchViteDevServer().then(() => {
    const args = [
      'open',
      '--config-file',
      'configs/cypress.json'
    ]
    spawn('cypress', args).on('close', () => {
      process.exit()
    })
  })
}

if (process.env.TEST === 'spectron') {
  Promise.all([launchViteDevServer(), buildMainProcess(), buildSpectronTests()])
    .then(() => {
      const args = [
        '--detectOpenHandles',
        '--config',
        'configs/jest.config.spectron.json'
      ]
      spawn('jest', args, {
        stdio: 'inherit'
      }).on('close', () => {
        process.exit()
      })
    })
    .catch(err => {
      console.error(err)
    })
}

if (process.env.TEST === 'components') {
  buildVueTests()
    .then(() => {
      const args = [
        "--config",
        "configs/jest.config.vtu.json",
      ]
      spawn('jest', args, {
        stdio: 'inherit'
      }).on('close', () => {
        process.exit()
      })
    })
    .catch(err => {
      console.error(err)
    })
}

if (!process.env.TEST) {
  Promise.all([launchViteDevServer(), buildMainProcess()])
    .then(() => {
      runElectronApp()
    })
    .catch(err => {
      console.error(err)
    })
}