/*
 * Database Populating
 */

import { TestingDB, Book } from './index';
import { segmentit } from './middleware'

async function populateBooks() {
  const book1 = new Book('流浪地球', '刘慈欣')
  book1.categories = ['科幻']
  book1.publishing = '长江文艺出版社'
  book1.published = '2000'
  book1.nameTokens = segmentit.doSegment(book1.name, { simple: true })

  const book2 = new Book('胶东雄狮', '彦庆杰')
  book2.categories = ['历史']
  book2.publishing = '黄河出版社'
  book2.published = '2008'
  book2.nameTokens = segmentit.doSegment(book2.name, { simple: true })
  book2.lend = '2022.1.20 借给 Amy'

  const book3 = new Book('三体', '刘慈欣')
  book3.categories = ['科幻']
  book3.publishing = '重庆出版社'
  book3.published = '2006'
  book3.nameTokens = segmentit.doSegment(book3.name, { simple: true })

  const book4 = new Book('三体2:黑暗森林', '刘慈欣')
  book4.categories = ['科幻']
  book4.publishing = '重庆出版社'
  book4.published = '2008'
  book4.nameTokens = segmentit.doSegment(book4.name, { simple: true })

  const book5 = new Book('三体3:死神永生', '刘慈欣')
  book5.categories = ['科幻']
  book5.publishing = '重庆出版社'
  book5.published = '2010'
  book5.nameTokens = segmentit.doSegment(book5.name, { simple: true })

  const book6 = new Book('中国近代史', '徐中约')
  book6.categories = ['历史', '中国', '近代史']
  book6.publishing = '后浪出版社'
  book6.published = '2012'
  book6.nameTokens = segmentit.doSegment(book6.name, { simple: true })

  const book7 = new Book('Under the Dome', 'Stephen King')
  book7.categories = ['科幻', '惊悚', '小说']
  book7.publishing = '斯克里布纳之子公司'
  book7.published = '2009年11月10日'
  book7.nameTokens = segmentit.doSegment(book7.name, { simple: true })

  await TestingDB.books.bulkAdd([
    book1, book2, book3, book4, book5, book6, book7
  ])
}

async function checkThenPopulateBooks() {
  await TestingDB.books.count(async (count: number) => {
    if (count > 0) {
      console.log("Table books already populated")
    } else {
      console.log("Table-books is empty. Populating...")

      await populateBooks()
      console.log("Done populating.")
    }
  })
}

// async function populateContacts() {
//   await TestingDB.contacts.bulkAdd([
//   ])
// }

// async function checkThenPopulateContacts() {
//   await TestingDB.contacts.count(async (count: number) => {
//     if (count > 0) {
//       console.log("Table contacts already populated")
//     } else {
//       console.log("Table contacts is empty. Populating...")

//       await populateContacts()
//       console.log("Done populating.")
//     }
//   })
// }

export function handlePopulate() {
  TestingDB.on('populate', async function () {
    console.log('event("populate")')
    await Promise.all([
      // populateContacts(),
      populateBooks() 
    ])
  })

  TestingDB.on('ready', () => {
    return TestingDB.transaction('rw', TestingDB.books, async () => {
      await Promise.all([
        checkThenPopulateBooks(),
        // checkThenPopulateContacts()
      ]);
    });
  })
}