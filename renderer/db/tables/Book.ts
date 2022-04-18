/* 
 * class mapped to the books table
 */

import type { IBook } from '../index'
import { AppDB } from '../index'
import { Cover } from './Cover';

export class Book implements IBook {
  id?: number;

  name!: string;
  author?: string;
  cover?: Blob | number;
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
    this.cover = cover;
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
  async save() {
    // let coverId: number | undefined
    // // 存储封面图片
    // if (this.cover) {
    //   coverId = await new Cover({ data: this.cover as Blob }).save()
    // }

    // this.cover = coverId
    return await AppDB.books.add(this);
  }
  async load() {
    // [this.emails, this.phones] = await Promise.all([
    //   AppDB.emails.where('contactId').equals(this.id!).toArray(),
    //   AppDB.phones.where('contactId').equals(this.id!).toArray()
    // ]);
  }
  async other() {
    //   return AppDB.transaction('rw', AppDB.books, AppDB.emails, AppDB.phones, async () => {
    //     this.id = await AppDB.books.put(this);

    //     let [emailIds, phoneIds] = await Promise.all([
    //       Promise.all(this.emails.map(email => AppDB.emails.put(email))),
    //       Promise.all(this.phones.map(phone => AppDB.phones.put(phone)))
    //     ])

    //     await Promise.all([
    //       AppDB.emails.where('contactId').equals(this.id) // references us
    //         .and(email => emailIds.indexOf(email.id!) === -1) // Not anymore in our array
    //         .delete(),

    //       AppDB.phones.where('contactId').equals(this.id)
    //         .and(phone => phoneIds.indexOf(phone.id!) === -1)
    //         .delete()
    //     ]);
    //   });
  }
}