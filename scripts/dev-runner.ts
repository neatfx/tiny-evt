import { createServer } from 'vite'
import { spawn, ChildProcessWithoutNullStreams } from 'child_process'
import { build } from 'esbuild'

import viteConfig from '../configs/vite.config'
import esbuildConfig from '../configs/esbuild.config'

let electronProcess: ChildProcessWithoutNullStreams | null

async function launchViteDevServer(openInBrowser = false) {
  const server = await createServer(
    openInBrowser ? viteConfig.serveConfig : viteConfig.serverConfig
  )
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

if (process.env.TEST === 'browser') {
  launchViteDevServer(true)
}

if (process.env.TEST === 'e2e') {
  launchViteDevServer().then(() => {
    if (process.env.CI) {
      // 服务器 CI 环境
      const args = ['playwright', 'test', '--project=chromium']
      spawn('npx', args, {
        stdio: 'inherit',
        shell: process.platform === 'win32'
      }).on('close', () => {
        process.exit()
      })
    } else {
      // 本地开发环境
      const args = ['playwright', 'test', '--headed', '--project=chromium']
      spawn('npx', args, {
        stdio: 'inherit',
        shell: process.platform === 'win32'
      }).on('close', () => {
        process.exit()
      })
    }
  })
}

if (process.env.TEST === 'electron') {
  Promise.all([launchViteDevServer(), buildMainProcess()])
    .then(() => {
      runElectronApp()
    })
    .catch((err) => {
      console.error(err)
    })
}
