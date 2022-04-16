/* 
 * class mapped to the books table
 */

import type { IBook } from '../index'
import { TestingDB } from '../index'

export class Book implements IBook {
  id?: number;

  name!: string;
  author?: string;
  cover?: Blob | null;
  publishing?: string;
  published?: string;
  isbn?: string | undefined;

  categories?: string[];

  lend?: string;
  readingStatus?: string;
  position?: string;

  booklists?: Set<number>;

  douban?: string;

  nameTokens?: string[];

  deleted?: boolean;
  created?: Date;

  constructor(book: IBook) {
    const { name, author, cover, publishing, published, isbn, categories, lend, readingStatus, position, douban } = book

    this.name = name;
    this.author = author || '';
    this.cover = cover || null;
    this.publishing = publishing || '';
    this.published = published || '';
    this.isbn = isbn || '';

    this.categories = categories || [];

    this.lend = lend || '';
    this.readingStatus = readingStatus || 'read';
    this.position = position || '';

    this.booklists = new Set();

    this.douban = douban || '';

    this.nameTokens = [];

    this.deleted = false;
    this.created = new Date();

    // Define navigation properties.
    // Making them non-enumerable will prevent them from being handled by indexedDB
    // when doing put() or add().
    // Object.defineProperties(this, {
    //   booklists: { value: new Set(), enumerable: false, writable: true },
    //   created: { value: new Date(), enumerable: false, writable: false },
    // });
  }

  // async load() {
  // [this.emails, this.phones] = await Promise.all([
  //   TestingDB.emails.where('contactId').equals(this.id!).toArray(),
  //   TestingDB.phones.where('contactId').equals(this.id!).toArray()
  // ]);
  // }

  async save() {
    return await TestingDB.books.add(this);
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
  }
}