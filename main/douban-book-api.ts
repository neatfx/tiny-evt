import { chromium } from 'playwright';

export async function suggestBook<T>(keyword: string): Promise<any> {
  const browser = await chromium.launch({ headless: true });
  // const context = await browser.newContext();
  const page = await browser.newPage();

  page.on('response', async (resp) => {
    const books =  await resp.json();
    console.log(resp.url(), books);
    browser.close();
    return new Promise(books);
  })
  
  // await page.goto('https://search.douban.com/book/subject_search?search_text=三体');
  await page.goto('https://book.douban.com/j/subject_suggest?q=' + '中国近代史');
}