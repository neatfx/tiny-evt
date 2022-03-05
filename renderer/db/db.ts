import Dexie, { Table } from 'dexie';
import { IContact, IEmailAddress, IPhoneNumber, IBook } from './tables/interfaces'
import Contact from './tables/Contact'

export class AppDatabase extends Dexie {
  // books!: Table<IBook, number>;
  contacts!: Table<Contact, number>;
  emails!: Table<IEmailAddress, number>;
  phones!: Table<IPhoneNumber, number>;
  
  constructor() {
    super('AppDatabase');
    var db = this;
    this.version(1).stores({
      // books: '++id, name, age',
      contacts: '++id, firstName, lastName',
      emails: '++id, contactId, type, email',
      phones: '++id, contactId, type, phone',
    });

    db.contacts.mapToClass(Contact);
  }
}

export const db = new AppDatabase();
