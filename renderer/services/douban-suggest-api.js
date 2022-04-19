import { chromium } from 'playwright';
import restify from 'restify';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();
const server = restify.createServer();

// 路由
server.get('/suggest/:keyword', async (req, res, next) => {
  const keyword = req.params.keyword
  const respObj = await page.goto('https://book.douban.com/j/subject_suggest?q=' + keyword);
  const jsonData = await respObj.json()

  res.header('Content-Type', 'application/json')
  res.header('Access-Control-Allow-Origin', 'https://127.0.0.1:3000') // 跨域设置
  
  console.log(jsonData)
  res.send(jsonData)

  next()
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});