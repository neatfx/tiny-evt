import type { Table } from 'dexie';

import { BaseDatabase } from './base-db'
import type { IEmailAddress, IPhoneNumber } from './tables/interfaces'
import Contact from './tables/Contact'

export class TestingDatabase extends BaseDatabase {
  contacts!: Table<Contact, number>;
  emails!: Table<IEmailAddress, number>;
  phones!: Table<IPhoneNumber, number>;

  constructor(name: string, schemaVersion?: number) {
    super(name, schemaVersion);
    var db = this;
    this.conditionalVersion(1, {
      contacts: '++id, firstName, lastName',
      emails: '++id, contactId, type, email',
      phones: '++id, contactId, type, phone',
    });

    db.contacts.mapToClass(Contact);
  }
}

export const TestingDB = new TestingDatabase('AppDatabase', 1);

// import { liveQuery } from "dexie";
// import { db } from "./testing-dbsting-db";
// import Contact from "./tables/Contact";


// export async function list(): Promise<Contact[]> {
//   console.log('db api')
//   return  await db.contacts.toArray()
// }