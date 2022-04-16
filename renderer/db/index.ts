/* 
 * Database class
 */

import type { Table } from 'dexie'

import { BaseDatabase } from './base-db'
import { handlePopulate } from './population'
import { middleware } from './middleware'

import type { IBook, IBooklist } from './type-defs'
import { Book, Booklist } from './tables'

class TestingDatabase extends BaseDatabase {
  books!: Table<IBook, number>;
  booklists!: Table<IBooklist, number>;

  constructor(name: string, schemaVersion?: number) {
    super(name, schemaVersion);
    var db = this;
    this.conditionalVersion(1, {
      books: '++id, name, author, *categories, publishing, *nameTokens, lend, readingStatus, deleted, created',
      booklists: '++id, name, shared, deleted, created',
    });

    db.books.mapToClass(Book);
    db.booklists.mapToClass(Booklist)
  }
}

const TestingDB = new TestingDatabase('AppDatabase', 1)

handlePopulate() // 初始化测试数据
TestingDB.use(middleware) // DBCore Middleware For Search & SyncStore

export { TestingDB, Book, Booklist, IBook, IBooklist }