import { Application } from 'spectron'
import assert from 'assert'
import path from 'path'

describe('Application launch', function () {
  let app: Application | null = null

  beforeEach(async () => {
    app = new Application({
      env: {
        NODE_ENV: 'development'
      },
      requireName: 'electronRequire',
      path: 'node_modules/.bin/electron',
      args: [path.join(__dirname, '../../build/main.js')]
    })
    
    return app.start().then((app) => {
      assert.strictEqual(app.isRunning(), true)
    })
  })

  afterEach(async () => {
    if (app && app.isRunning()) {
      await app.stop()
      assert.strictEqual(app.isRunning(), false)
    }
  })

  it('shows an initial window', async (done) => {
    const count = await app.client.getWindowCount()
    assert.equal(count, 1)
    // Please note that getWindowCount() will return 2 if `dev tools` are opened.
    // assert.equal(count, 2)
    done()
  })
})
