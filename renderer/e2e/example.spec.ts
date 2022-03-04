import { test, expect } from '@playwright/test'

test('basic test', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000')

  await expect(page).toHaveTitle(/TinyEvt/)

  await page.locator('data-test-id=/b').click()
  await expect(page.locator('id=content')).toContainText('ViewB')
  await expect(page).toHaveTitle(/TinyEvt/)

  await page.locator('data-test-id=/c').click()
  await expect(page.locator('id=content')).toContainText('ViewC')
  await expect(page).toHaveTitle(/TinyEvt/)
})
