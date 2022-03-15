import type { Table } from 'dexie'
import { BaseDatabase } from './base-db'

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

/* 
 * class mapped to the contacts table
 */
export class Contact implements IContact {
  id: number | undefined;
  name!: string;
  age!: number;
  emails!: IEmailAddress[];
  phones!: IPhoneNumber[];

  constructor(name: string, age: number, id?: number) {
    this.name = name;
    this.age = age;
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

const TestingDB = new TestingDatabase('AppDatabase', 1)

/*
 * Populating
 */
TestingDB.on('populate', function () {
  // console.log('on populate')
  // db.contacts.add({name: "someone", ang: 20 });
})

TestingDB.on('ready', () => {
  return TestingDB.contacts.count(async (count: number) => {
    if (count > 0) {
      console.log("Database already populated")
    } else {
      console.log("Database is empty. Populating...")
      await TestingDB.contacts.bulkAdd([
        new Contact('zhao', 19),
        new Contact('qian', 20),
        new Contact('sun', 21),
        new Contact('li', 22),
        new Contact('zhou', 23),
      ])
      console.log("Done populating.")
    }
  })
})

export { TestingDB }