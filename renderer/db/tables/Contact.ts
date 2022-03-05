/* This is a 'physical' class that is mapped to
 * the contacts table. We can have methods on it that
 * we could call on retrieved database objects.
 */

import { IContact, IEmailAddress, IPhoneNumber } from './interfaces'
import { db } from '../db'

export default class Contact implements IContact {
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
      emails: {value: [], enumerable: false, writable: true },
      phones: {value: [], enumerable: false, writable: true }
    });
  }

  async loadEmailsAndPhones() {
    [this.emails, this.phones] = await Promise.all([
      db.emails.where('contactId').equals(this.id!).toArray(),
      db.phones.where('contactId').equals(this.id!).toArray()
    ]);
  }

  save() {
    return db.transaction('rw', db.contacts, db.emails, db.phones, async() => {

      // Add or update our selves. If add, record this.id.
      this.id = await db.contacts.put(this);

      let [emailIds, phoneIds] = await Promise.all([
        Promise.all(this.emails.map(email => db.emails.put(email))),
        Promise.all(this.phones.map(phone => db.phones.put(phone)))
      ])

      // Was any email or phone number deleted from out navigation properties?
      // Delete any item in DB that reference us, but is not present
      // in our navigation properties:
      await Promise.all([
        db.emails.where('contactId').equals(this.id) // references us
            .and(email => emailIds.indexOf(email.id!) === -1) // Not anymore in our array
            .delete(),
    
        db.phones.where('contactId').equals(this.id)
            .and(phone => phoneIds.indexOf(phone.id!) === -1)
            .delete()
      ]);
    });
  }
}