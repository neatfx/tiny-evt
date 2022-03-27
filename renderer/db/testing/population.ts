/*
 * Database Populating
 */

import { TestingDB } from './index';
import { Contact } from './contact';
import { Book } from './book';
// import nodejieba from '@node-rs/jieba';
// const modulesFiles = import.meta.globEager("/node_modules/@node-rs/jieba")

async function populateBooks() {
  const book1 = new Book('流浪地球', '刘慈欣')
  book1.categories = ['sci-fi']
  book1.publishing = '长江文艺出版社'
  book1.published = '2000'
  // book1.nameWords = nodejieba.cut(book1.name)
  book1.nameWords = ['流浪', '地球']

  const book2 = new Book('胶东雄狮', '彦庆杰')
  book2.categories = ['历史']
  book2.publishing = '黄河出版社'
  // book2.nameWords = nodejieba.cut(book2.name)
  book2.nameWords = ['胶东', '雄狮']

  const book3 = new Book('三体', '刘慈欣')
  book3.categories = ['sci-fi']
  book3.publishing = '重庆出版社'
  book3.published = '2006'
  // book3.nameWords = nodejieba.cut(book3.name)
  book3.nameWords = ['三体']

  const book4 = new Book('三体2:黑暗森林', '刘慈欣')
  book4.categories = ['sci-fi']
  book4.publishing = '重庆出版社'
  book4.published = '2008'
  // book4.nameWords = nodejieba.cut(book4.name)
  book4.nameWords = ['三体', '黑暗', '森林']

  const book5 = new Book('三体3:死神永生', '刘慈欣')
  book5.categories = ['sci-fi']
  book5.publishing = '重庆出版社'
  book5.published = '2010'
  // book5.nameWords = nodejieba.cut(book5.name)
  book5.nameWords = ['三体', '死神', '永生']

  const book6 = new Book('中国近代史', '徐中约')
  book6.categories = ['历史', '中国', '近代史']
  book6.publishing = '后浪出版社'
  // book6.nameWords = nodejieba.cut(book6.name)
  book6.nameWords = ['中国', '近代史']

  const book7 = new Book('Under the Dome', 'Stephen King')
  book7.categories = ['sci-fi', 'thriller']
  book7.publishing = '斯克里布纳之子公司'
  book7.published = '2009年11月10日'
  // book7.nameWords = nodejieba.cut(book7.name)
  book7.nameWords = ['dome']

  await TestingDB.books.bulkAdd([
    book1, book2, book3, book4, book5, book6, book7
  ])
}

async function checkThenPopulateBooks() {
  TestingDB.books.count(async (count: number) => {
    if (count > 0) {
      console.log("Table books already populated")
    } else {
      console.log("Table-books is empty. Populating...")

      await populateBooks()
      console.log("Done populating.")
    }
  })
}

async function populateContacts() {
  await TestingDB.contacts.bulkAdd([
    new Contact('zhao', 10, 'F', 'admin'),
    new Contact('qian', 20, 'M', 'user'),
    new Contact('sun', 30, 'F', 'admin'),
    new Contact('li', 40, 'F', 'user'),
    new Contact('zhou', 50, 'F', 'user'),
    new Contact('wu', 60, 'M', 'user'),
    new Contact('zheng', 70, 'F', 'user'),
    new Contact('wang', 80, 'M', 'user'),
  ])
}

async function checkThenPopulateContacts() {
  TestingDB.contacts.count(async (count: number) => {
    if (count > 0) {
      console.log("Table contacts already populated")
    } else {
      console.log("Table contacts is empty. Populating...")

      await populateContacts()
      console.log("Done populating.")
    }
  })
}

export function handlePopulate() {
  TestingDB.on('populate', async function () {
    console.log('event("populate")')
    await populateContacts()
    await populateBooks()
  })

  TestingDB.on('ready', () => {
    return TestingDB.transaction('rw', TestingDB.contacts, TestingDB.books, async () => {
      await Promise.all([
        checkThenPopulateBooks(),
        checkThenPopulateContacts()
      ]);
    });
  })
}