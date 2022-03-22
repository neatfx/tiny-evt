/* 
 * Database class
 */

import type { Table } from 'dexie'
import { BaseDatabase } from '../base-db'
import { Contact } from './contacts';
import type { IEmailAddress, IPhoneNumber, IBook } from './definition'
import { populateContacts } from './population'

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
    });

    db.contacts.mapToClass(Contact);
  }
}

const TestingDB = new TestingDatabase('AppDatabase', 1)

/*
 * Populating
 */
TestingDB.on('populate', async function () {
  console.log('event("populate")')
  await populateContacts()
})

TestingDB.on('ready', () => {
  return TestingDB.contacts.count(async (count: number) => {
    if (count > 0) {
      console.log("Database already populated")
    } else {
      console.log("Database is empty. Populating...")

      await populateContacts()
      console.log("Done populating.")
    }
  })
})

export { TestingDB }