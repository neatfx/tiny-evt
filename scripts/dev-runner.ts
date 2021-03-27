import { createServer, build as viteBuild } from 'vite'
import { spawn, ChildProcessWithoutNullStreams } from 'child_process'
import { build } from 'esbuild'

import viteConfig from '../configs/vite.config'
import esbuildConfig from '../configs/esbuild.config'

let electronProcess: ChildProcessWithoutNullStreams | null

async function launchViteDevServer() {
  const server = await createServer(viteConfig.serverConfig)
  await server.listen()
}

async function buildMainProcess() {
  return build(esbuildConfig.dev)
    .then(
      () => {
        if (electronProcess && electronProcess.kill) {
          process.kill(electronProcess.pid)
          electronProcess = null
        }
      },
      (err) => {
        console.log(err)
      }
    )
    .catch((e) => {
      return e
    })
}

async function buildSpectronTests() {
  return build(esbuildConfig.spectron)
    .then(
      () => {},
      (err) => {
        console.log(err)
      }
    )
    .catch((e) => {
      return e
    })
}

async function buildVueTests() {
  return viteBuild(viteConfig.buildConfigVtu).catch((err) => {
    console.log(`\nfailed to build vue tests`)
    console.error(`\n${err}\n`)
    process.exit(1)
  })
}

function logPrinter(data: string[]) {
  let log = '\n'

  data = data.toString().split(/\r?\n/)
  data.forEach((line) => {
    log += `  ${line}\n`
  })

  if (/[0-9A-z]+/.test(log)) {
    console.log(log)
  }
}

function runElectronApp() {
  const args = ['--inspect=5858', 'build/main.js']
  const electronProcess = spawn('electron', args, {
    stdio: 'pipe',
    shell: process.platform === 'win32'
  })

  electronProcess.stderr.on('data', (data) => {
    logPrinter(data)
  })

  electronProcess.stdout.on('data', (data) => {
    logPrinter(data)
  })

  electronProcess.on('close', () => {
    process.exit()
  })
}

if (process.env.TEST === 'cypress') {
  launchViteDevServer().then(() => {
    if (process.env.CI) {
      const args = ['run', '--config-file', 'configs/cypress.json']

      spawn('cypress', args, {
        stdio: 'inherit',
        shell: process.platform === 'win32' 
      }).on('close', () => {
        process.exit()
      })
    } else {
      const args = ['open', '--config-file', 'configs/cypress.json']

      spawn('cypress', args, {
        stdio: 'inherit',
        shell: process.platform === 'win32' 
      }).on('close', () => {
        process.exit()
      })
    }
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
        stdio: 'inherit',
        shell: process.platform === 'win32'
      }).on('close', () => {
        process.exit()
      })
    })
    .catch((err) => {
      console.error(err)
    })
}

if (process.env.TEST === 'components') {
  buildVueTests()
    .then(() => {
      const args = ['--config', 'configs/jest.config.vtu.json']

      spawn('jest', args, {
        stdio: 'inherit',
        shell: process.platform === 'win32'
      }).on('close', () => {
        process.exit()
      })
    })
    .catch((err) => {
      console.error(err)
    })
}

if (!process.env.TEST) {
  Promise.all([
    launchViteDevServer(), 
    buildMainProcess()
  ])
    .then(() => {
      runElectronApp()
    })
    .catch((err) => {
      console.error(err)
    })
}
