const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron')
const path = require('path')

describe('Application launch', function () {
  this.timeout(20000)

  beforeEach(function () {
    this.app = new Application({
      env: {
        'NODE_ENV': 'development'
      },
      requireName: 'electronRequire', // only for accessing any Electron APIs
      path: electronPath,
      args: [path.join(__dirname, '../build/main.js')]
    })
    return this.app.start()
  })

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('shows an initial window', function () {
    return this.app.client.getWindowCount().then(function (count) {
      assert.equal(count, 1)
      // Please note that getWindowCount() will return 2 if `dev tools` are opened.
      // assert.equal(count, 2)
    })
  })
})