/* 
 * class mapped to the contacts table
 */

import type { IBook } from './definition'
import { TestingDB } from './index'

export class Book implements IBook {
  id: number | undefined;
  name!: string;
  author!: string;
  categories?: string[] | undefined;
  publishing?: string | undefined;
  created!: Date;

  constructor(name: string, author:string, id?: number) {
    this.name = name;
    this.author = author;
    this.created = new Date()
    if (id) this.id = id;

    // Define navigation properties.
    // Making them non-enumerable will prevent them from being handled by indexedDB
    // when doing put() or add().
    // Object.defineProperties(this, {
    //   emails: { value: [], enumerable: false, writable: true },
    //   phones: { value: [], enumerable: false, writable: true }
    // });
  }

  // async loadEmailsAndPhones() {
    // [this.emails, this.phones] = await Promise.all([
    //   TestingDB.emails.where('contactId').equals(this.id!).toArray(),
    //   TestingDB.phones.where('contactId').equals(this.id!).toArray()
    // ]);
  // }

  // save() {
  //   return TestingDB.transaction('rw', TestingDB.books, TestingDB.emails, TestingDB.phones, async () => {
  //     this.id = await TestingDB.books.put(this);

  //     let [emailIds, phoneIds] = await Promise.all([
  //       Promise.all(this.emails.map(email => TestingDB.emails.put(email))),
  //       Promise.all(this.phones.map(phone => TestingDB.phones.put(phone)))
  //     ])

  //     await Promise.all([
  //       TestingDB.emails.where('contactId').equals(this.id) // references us
  //         .and(email => emailIds.indexOf(email.id!) === -1) // Not anymore in our array
  //         .delete(),

  //       TestingDB.phones.where('contactId').equals(this.id)
  //         .and(phone => phoneIds.indexOf(phone.id!) === -1)
  //         .delete()
  //     ]);
  //   });
  // }
}