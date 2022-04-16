/*
 * Database Populating
 */

import { TestingDB, Book, Booklist } from './index';
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

  await TestingDB.books.bulkAdd([
    book1, book2, book3, book4, book5, book6, book7
  ])
}

async function checkThenPopulateBooks() {
  await TestingDB.books.count(async (count: number) => {
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
  await TestingDB.booklists.bulkAdd([
    booklist_1, booklist_2, booklist_3
  ])
}

async function checkThenPopulateBooklists() {
  await TestingDB.booklists.count(async (count: number) => {
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
  TestingDB.on('populate', async () => {
    console.log('Database Event <populate>')
    await Promise.all([
      populateBooks(),
      populateBooklists()
    ])
  })

  TestingDB.on('ready', () => {
    return TestingDB.transaction('rw', TestingDB.books, TestingDB.booklists, async () => {
      await Promise.all([
        checkThenPopulateBooks(),
        checkThenPopulateBooklists()
      ])
    })
  })
}