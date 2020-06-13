import { Application } from 'spectron'
import assert from 'assert'

import { startApplication, stopApplication } from './helper'

describe('Application launch', function () {
  let app: Application | null = null

  beforeEach(async () => {
    app = await startApplication()
  })

  afterEach(async () => {
    await stopApplication(app)
  })

  it('shows an initial window', async (done) => {
    const count = await app.client.getWindowCount()
    assert.equal(count, 1)
    // Please note that getWindowCount() will return 2 if `dev tools` are opened.
    // assert.equal(count, 2)
    done()
  })
})
