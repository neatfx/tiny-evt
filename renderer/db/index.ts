/* 
 * Database class
 */

import type { Table } from 'dexie'

import { BaseDatabase } from './base-db'
import { handlePopulate } from './population'
import { middleware } from './middleware'

import type { IBook, IBooklist, ICover } from './type-defs'
import { Book, Booklist, Cover } from './tables'

class AppDatabase extends BaseDatabase {
  books!: Table<IBook, number>;
  booklists!: Table<IBooklist, number>;
  covers!: Table<ICover, number>;

  constructor(name: string, schemaVersion?: number) {
    super(name, schemaVersion);
    var db = this;
    this.conditionalVersion(1, {
      books: '++id, name, author, *categories, publishing, *nameTokens, lend, readingStatus, deleted, created',
      booklists: '++id, name, shared, deleted, created',
      covers: '++id, data, deleted, created',
    });

    db.books.mapToClass(Book);
    db.booklists.mapToClass(Booklist)
    db.covers.mapToClass(Cover)
  }
}

const AppDB = new AppDatabase('AppDatabase', 1)

handlePopulate() // 初始化测试数据
AppDB.use(middleware) // DBCore Middleware For Search & SyncStore

export { AppDB, Book, Booklist, IBook, IBooklist, ICover }