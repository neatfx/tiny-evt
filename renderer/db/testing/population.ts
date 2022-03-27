/*
 * Database Populating
 */

import { TestingDB } from './index';
import { Contact } from './contact';
import { Book } from './book';
import { Segment, useDefault } from 'segmentit'

const segmentit = useDefault(new Segment());

async function populateBooks() {
  const book1 = new Book('流浪地球', '刘慈欣')
  book1.categories = ['科幻']
  book1.publishing = '长江文艺出版社'
  book1.published = '2000'
  book1.nameWords = segmentit.doSegment(book1.name, { simple: true })
  book1.nameWords = book1.nameWords?.concat([book1.author, ...book1.categories])

  const book2 = new Book('胶东雄狮', '彦庆杰')
  book2.categories = ['历史']
  book2.publishing = '黄河出版社'
  book2.nameWords = segmentit.doSegment(book2.name, { simple: true })
  book2.nameWords = book2.nameWords?.concat([book2.author, ...book2.categories])

  const book3 = new Book('三体', '刘慈欣')
  book3.categories = ['科幻']
  book3.publishing = '重庆出版社'
  book3.published = '2006'
  book3.nameWords = segmentit.doSegment(book3.name, { simple: true })
  book3.nameWords = book3.nameWords?.concat([book3.author, ...book3.categories])

  const book4 = new Book('三体2:黑暗森林', '刘慈欣')
  book4.categories = ['科幻']
  book4.publishing = '重庆出版社'
  book4.published = '2008'
  book4.nameWords = segmentit.doSegment(book4.name, { simple: true })
  book4.nameWords = book4.nameWords?.concat([book4.author, ...book4.categories])

  const book5 = new Book('三体3:死神永生', '刘慈欣')
  book5.categories = ['科幻']
  book5.publishing = '重庆出版社'
  book5.published = '2010'
  book5.nameWords = segmentit.doSegment(book5.name, { simple: true })
  book5.nameWords = book5.nameWords?.concat([book5.author, ...book5.categories])

  const book6 = new Book('中国近代史', '徐中约')
  book6.categories = ['历史', '中国', '近代史']
  book6.publishing = '后浪出版社'
  book6.nameWords = segmentit.doSegment(book6.name, { simple: true })
  book6.nameWords = book6.nameWords?.concat([book6.author, ...book6.categories])

  const book7 = new Book('Under the Dome', 'Stephen King')
  book7.categories = ['科幻', '惊悚', '小说']
  book7.publishing = '斯克里布纳之子公司'
  book7.published = '2009年11月10日'
  book7.nameWords = segmentit.doSegment(book7.name, { simple: true })
  book7.nameWords = book7.nameWords?.concat([book7.author, ...book7.categories])

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