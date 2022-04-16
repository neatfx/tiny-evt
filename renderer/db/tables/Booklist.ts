/* 
 * class mapped to the booklists table
 */

import type { IBooklist } from '../index'
import { TestingDB } from '../index'

export class Booklist implements IBooklist {
  id?: number;

  name!: string;
  books?: Set<number>;

  shared?: boolean;

  deleted?: boolean;
  created?: Date;

  constructor(booklist: IBooklist) {
    const { name } = booklist

    this.name = name;
    this.books = new Set();

    this.shared = false;
    
    this.deleted = false;
    this.created = new Date();
  }

  async save() {
    return await TestingDB.booklists.add(this);
  }
}