/*
 * Database Populating
 */

import { AppDB, Book, Booklist } from './index';
import { segmentit } from './middleware'

async function populateBooks() {
  const book1 = new Book({
    readingStatus: 'wanted',
    name: '流浪地球',
    author: '刘慈欣',
    publishing: '长江文艺出版社',
    published: '2000',
    categories: ['科幻'],
    nameTokens: segmentit.doSegment('流浪地球', { simple: true })
  })
  const book2 = new Book({
    readingStatus: 'not-yet',
    lend: '2022.1.20 借出给张三',
    name: '胶东雄狮',
    author: '彦庆杰',
    publishing: '黄河出版社',
    published: '2008',
    categories: ['历史'],
    nameTokens: segmentit.doSegment('胶东雄狮', { simple: true }),
  })
  const book3 = new Book({
    readingStatus: 'reading',
    name: '三体:地球往事三部曲之一',
    author: '刘慈欣',
    publishing: '重庆出版社',
    published: '2006',
    categories: ['科幻'],
    nameTokens: segmentit.doSegment('三体:地球往事三部曲之一', { simple: true })
  })
  const book4 = new Book({
    readingStatus: 'read',
    name: '三体2:黑暗森林',
    author: '刘慈欣',
    publishing: '重庆出版社',
    published: '2008',
    categories: ['科幻'],
    nameTokens: segmentit.doSegment('三体2:黑暗森林', { simple: true })
  })
  const book5 = new Book({
    name: '三体3:死神永生',
    author: '刘慈欣',
    publishing: '重庆出版社',
    published: '2010',
    categories: ['科幻'],
    nameTokens: segmentit.doSegment('三体3:死神永生', { simple: true })
  })
  const book6 = new Book({
    name: '中国近代史',
    author: '徐中约',
    publishing: '后浪出版社',
    published: '2012',
    categories: ['历史', '中国', '近代史'],
    nameTokens: segmentit.doSegment('中国近代史', { simple: true })
  })
  const book7 = new Book({
    name: 'Under the Dome',
    author: 'Stephen King',
    publishing: '斯克里布纳之子公司',
    published: '2009年11月10日',
    categories: ['科幻', '惊悚', '小说'],
    nameTokens: segmentit.doSegment('Under the Dome', { simple: true })
  })

  const book8 = new Book({
    name: '官场现形记（上）',
    author: '李宝嘉',
    publishing: '人民文学出版社',
    published: '1979',
    categories: ['小说'],
    nameTokens: segmentit.doSegment('官场现形记（上）', { simple: true })
  })

  const book9 = new Book({
    name: '官场现形记（下）',
    author: '李宝嘉',
    publishing: '人民文学出版社',
    published: '1979',
    categories: ['小说'],
    nameTokens: segmentit.doSegment('官场现形记（下）', { simple: true })
  })

  const book10 = new Book({
    name: '史记（点校本二十四史修订本）',
    author: '马迁 著 / 裴骃 集解 / 司马贞 索隐 / 张守节 正义',
    isbn: '9787101095012',
    translator: '点校本《史记》修订组',
    publishing: '中华书局',
    published: '2013-8',
    categories: ['历史'],
    nameTokens: segmentit.doSegment('史记（点校本二十四史修订本）', { simple: true })
  })

  const book11 = new Book({
    name: '西行漫记',
    subname: '红星照耀中国',
    author: '[美] 埃德加·斯诺埃',
    translator: '董乐山',
    publishing: '生活.读书.新知三联书店',
    published: '1979',
    categories: ['报告文学', '历史'],
    nameTokens: segmentit.doSegment('西行漫记,红星照耀中国', { simple: true })
  })

  const book12 = new Book({
    name: '创造自然',
    subname: '亚历山大·冯·洪堡的科学发现之旅',
    author: '[德] 安德烈娅·武尔夫',
    translator: '边和',
    publishing: '浙江人民出版社',
    published: ' 2017-10',
    isbn: '9787213083426',
    categories: ['传记'],
    nameTokens: segmentit.doSegment('创造自然,亚历山大·冯·洪堡的科学发现之旅', { simple: true })
  })

  const book13 = new Book({
    name: '最寒冷的冬天',
    subname: '美国人眼中的朝鲜战争',
    author: '[美] 大卫·哈伯斯塔姆',
    translator: '祖宁 / 刘寅龙',
    publishing: '台海出版社',
    published: ' 2017-5',
    isbn: '9787516814345',
    categories: ['历史', '朝鲜战争', '冷战'],
    nameTokens: segmentit.doSegment('最寒冷的冬天,美国人眼中的朝鲜战争', { simple: true })
  })

  const book14 = new Book({
    name: '地理与世界霸权',
    author: '[英] 詹姆斯·费尔格里夫',
    translator: '胡坚',
    publishing: '浙江人民出版社',
    published: '2016-12-1',
    isbn: '9787213076763',
    categories: ['地缘政治学'],
    nameTokens: segmentit.doSegment('地理与世界霸权', { simple: true })
  })

  const book15 = new Book({
    name: '阿拉伯的劳伦斯',
    subname: '战争、谎言、帝国愚行与现代中东的形成',
    author: '[美]斯科特•安德森 Scott Anderson',
    translator: '陆大鹏',
    publishing: '社会科学文献出版社',
    published: '2014-9-1',
    isbn: '9787509759233',
    categories: ['历史', '中东'],
    nameTokens: segmentit.doSegment('阿拉伯的劳伦斯,战争、谎言、帝国愚行与现代中东的形成', { simple: true })
  })

  const book16 = new Book({
    name: '这里是中国2',
    subname: '百年重塑山河',
    author: '星球研究所',
    publishing: '中信出版集团',
    published: ' 2021-7',
    isbn: '9787521731224',
    categories: ['科普', '中国'],
    nameTokens: segmentit.doSegment('这里是中国2,百年重塑山河', { simple: true })
  })

  await AppDB.books.bulkAdd([
    book1, book2, book3, book4, book5, book6, book7, book8, book9, book10, book11, book12, book13, book14, book15, book16
  ])
}

async function checkThenPopulateBooks() {
  await AppDB.books.count(async (count: number) => {
    if (count > 0) {
      console.log("Table <books> already populated.")
    } else {
      console.log("Table <books> is empty. Populating...")

      await populateBooks()
      console.log("Done populating.")
    }
  })
}

async function populateBooklists() {
  const booklist_1 = new Booklist({
    name: '科幻经典',
  })
  const booklist_2 = new Booklist({
    name: '人文历史',
  })
  const booklist_3 = new Booklist({
    name: '科学技术',
  })
  await AppDB.booklists.bulkAdd([
    booklist_1, booklist_2, booklist_3
  ])
}

async function checkThenPopulateBooklists() {
  await AppDB.booklists.count(async (count: number) => {
    if (count > 0) {
      console.log("Table <booklists> already populated.")
    } else {
      console.log("Table <booklists> is empty. Populating...")

      await populateBooklists()
      console.log("Done populating.")
    }
  })
}

export function handlePopulate() {
  AppDB.on('populate', async () => {
    console.log('Database Event <populate>')
    await Promise.all([
      populateBooks(),
      populateBooklists()
    ])
  })

  AppDB.on('ready', () => {
    return AppDB.transaction('rw', AppDB.books, AppDB.booklists, async () => {
      await Promise.all([
        checkThenPopulateBooks(),
        checkThenPopulateBooklists()
      ])
    })
  })
}