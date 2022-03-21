import type { Table } from 'dexie'
import { BaseDatabase } from '../base-db'

/* 
 * Just for code completion and compilation
 * defines the interface of objects stored in the table.
 */
export interface IContact {
  id?: number; // Primary key. Optional (autoincremented)
  name: string;
  age: number;
  emails: IEmailAddress[];
  phones: IPhoneNumber[];
}

export interface IEmailAddress {
  id?: number;
  contactId: number; // "Foreign key" to an IContact
  type: string;
  email: string;
}

export interface IPhoneNumber {
  id?: number;
  contactId: number;
  type: string;
  phone: string;
}

export interface IBook {
  id?: number; // Primary key. Optional (autoincremented)
  name: string;
  coverUrl: string;
  author: string;
  created: Date;

  subname?: string;
  translator?: string;
  tag?: string[];
  publishing?: string;
  published?: Date;
  designed?: string;
  price?: number;
  from?: string;
  description?: string;
}

/* 
 * class mapped to the contacts table
 */
export class Contact implements IContact {
  id: number | undefined;
  name!: string;
  age!: number;
  emails!: IEmailAddress[];
  phones!: IPhoneNumber[];
  sex: string;

  constructor(name: string, age: number, sex: string, id?: number) {
    this.name = name;
    this.age = age;
    this.sex = sex;
    if (id) this.id = id;

    // Define navigation properties.
    // Making them non-enumerable will prevent them from being handled by indexedDB
    // when doing put() or add().
    Object.defineProperties(this, {
      emails: { value: [], enumerable: false, writable: true },
      phones: { value: [], enumerable: false, writable: true }
    });
  }

  async loadEmailsAndPhones() {
    [this.emails, this.phones] = await Promise.all([
      TestingDB.emails.where('contactId').equals(this.id!).toArray(),
      TestingDB.phones.where('contactId').equals(this.id!).toArray()
    ]);
  }

  save() {
    return TestingDB.transaction('rw', TestingDB.contacts, TestingDB.emails, TestingDB.phones, async () => {

      // Add or update our selves. If add, record this.id.
      this.id = await TestingDB.contacts.put(this);

      let [emailIds, phoneIds] = await Promise.all([
        Promise.all(this.emails.map(email => TestingDB.emails.put(email))),
        Promise.all(this.phones.map(phone => TestingDB.phones.put(phone)))
      ])

      // Was any email or phone number deleted from out navigation properties?
      // Delete any item in DB that reference us, but is not present
      // in our navigation properties:
      await Promise.all([
        TestingDB.emails.where('contactId').equals(this.id) // references us
          .and(email => emailIds.indexOf(email.id!) === -1) // Not anymore in our array
          .delete(),

        TestingDB.phones.where('contactId').equals(this.id)
          .and(phone => phoneIds.indexOf(phone.id!) === -1)
          .delete()
      ]);
    });
  }
}

/* 
 * Database class
 */
class TestingDatabase extends BaseDatabase {
  contacts!: Table<Contact, number>;
  emails!: Table<IEmailAddress, number>;
  phones!: Table<IPhoneNumber, number>;
  books!: Table<IBook, number>;

  constructor(name: string, schemaVersion?: number) {
    super(name, schemaVersion);
    var db = this;
    this.conditionalVersion(1, {
      contacts: '++id, firstName, lastName, sex',
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
async function populateContacts() {
  await TestingDB.contacts.bulkAdd([
    new Contact('zhao', 10, 'F'),
    new Contact('qian', 20, 'M'),
    new Contact('sun', 30, 'F'),
    new Contact('li', 40, 'F'),
    new Contact('zhou', 50, 'F'),
    new Contact('wu', 60, 'M'),
    new Contact('zheng', 70, 'F'),
    new Contact('wang', 80, 'M'),
  ])
}

TestingDB.on('populate', async function () {
  // console.log('on populate')
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