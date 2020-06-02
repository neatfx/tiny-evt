import { Application } from 'spectron'
import assert from 'assert'
import path from 'path'

describe('Application launch', function () {
  let app: Application

  beforeEach( () => {
    app = new Application({
      env: {
        'NODE_ENV': 'development'
      },
      requireName: 'electronRequire', // only for accessing any Electron APIs
      path: 'node_modules/.bin/electron',
      args: [path.join(__dirname, '../../build/main.js')]
    })
    return app.start()
  })

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('shows an initial window', done => {
    return app.client.getWindowCount().then(function (count) {
      assert.equal(count, 1)
      // Please note that getWindowCount() will return 2 if `dev tools` are opened.
      // assert.equal(count, 2)
      done()
    })
  })
})