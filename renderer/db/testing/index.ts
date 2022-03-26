/* 
 * Database class
 */

import { BaseDatabase } from '../base-db'
import type { Table } from 'dexie'
import type { IEmailAddress, IPhoneNumber, IBook } from './type-defs'
import { Contact } from './contact';
import { handlePopulate } from './population'
import { Book } from './book';

class TestingDatabase extends BaseDatabase {
  contacts!: Table<Contact, number>;
  emails!: Table<IEmailAddress, number>;
  phones!: Table<IPhoneNumber, number>;
  books!: Table<IBook, number>;

  constructor(name: string, schemaVersion?: number) {
    super(name, schemaVersion);
    var db = this;
    this.conditionalVersion(1, {
      contacts: '++id, firstName, lastName, sex, role',
      emails: '++id, contactId, type, email',
      phones: '++id, contactId, type, phone',
      books: '++id, name, author, *categories, *publishing, *nameWords'
    });

    db.contacts.mapToClass(Contact);
    db.books.mapToClass(Book);
  }
}

const TestingDB = new TestingDatabase('AppDatabase', 1)

handlePopulate() // 数据初始化

export { TestingDB }