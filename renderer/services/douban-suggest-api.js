import { chromium } from 'playwright';
import restify from 'restify';
import corsMiddleware from 'restify-cors-middleware2'
import fs from 'fs';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();
const server = restify.createServer({
  // certificate: fs.readFileSync('./server.crt'),
  // key: fs.readFileSync('./server.key'),
});
const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['https://127.0.0.1:3000'],
})

// 跨域设置
server.pre(cors.preflight)
server.use(cors.actual)

// 路由
async function suggest(req, res, next) {
  const keyword = req.params.keyword
  const respObj = await page.goto('https://book.douban.com/j/subject_suggest?q=' + keyword);
  const jsonData = await respObj.json()
  res.header('Content-Type', 'application/json')
  console.log(jsonData)
  res.send(jsonData)
  next()
}
server.get('/suggest/:keyword', suggest);

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});