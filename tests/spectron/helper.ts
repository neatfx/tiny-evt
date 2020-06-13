import { Application } from 'spectron'
import assert from 'assert'

var path = require('path')

function getElectronPath () {
  var electronPath = path.join('node_modules', '.bin', 'electron')
  if (process.platform === 'win32') electronPath += '.cmd'
  return electronPath
}

export async function startApplication (): Promise<Application> {
  const options = {
    env: {
      NODE_ENV: 'development'
    },
    requireName: 'electronRequire',
    path: getElectronPath(),
    args: [path.join(__dirname, '../../build/main.js')],
    startTimeout: 10000
  }

  if (process.env.CI) options.startTimeout = 30000

  var app = new Application(options)

  return app.start().then((app) => {
    assert.strictEqual(app.isRunning(), true)
    return app
  })
}

export async function stopApplication (app: Application) {
  if (!app || !app.isRunning()) return

  await app.stop()
  assert.strictEqual(app.isRunning(), false)
}