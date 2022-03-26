/*
 * Database Populating
 */

import { TestingDB } from './index';
import { Contact } from './contact';
import { Book } from './book';

async function populateBooks() {
  const book1 = new Book('Under the Dome', 'Stephen King')
  book1.categories = ['sci-fi', 'thriller']
  book1.nameWords = ['dome']

  const book2 = new Book('胶东雄狮', '彦庆杰')
  book2.categories = ['history']
  book2.publishing = '黄河出版社'
  book2.nameWords = ['胶东','雄狮']

  const book3 = new Book('三体', '刘慈欣')
  book3.categories = ['sci-fi']
  book3.publishing = '四川出版社'
  book3.nameWords = ['三体']

  await TestingDB.books.bulkAdd([
    book1, book2, book3
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