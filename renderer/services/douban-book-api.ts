import { chromium, firefox, webkit } from 'playwright';

const launchOptions = {
  // proxy: {
  //   server: '123.123.123.123:80'
  // },
  headless: false
}

export async function searchBook() {
  const browser = await webkit.launch(launchOptions);
  const page = await browser.newPage();
  await page.goto('https://books.toscrape.com/');
  await page.waitForTimeout(1000); // wait for 1 seconds
  const books = await page.$$eval('.product_pod', all_items => {
    const data = [];
    all_items.forEach(book => {
      const name = book.querySelector('h3')?.innerText;
      const price = book.querySelector('.price_color')?.
        innerText;
      const stock = book.querySelector('.availability')?.
        innerText;
      data.push({ name, price, stock });
    });
    return data;
  });
  await browser.close();
}