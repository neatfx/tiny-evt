/* 
 * class mapped to the booklists table
 */

import type { IBooklist } from '../index'
// import { TestingDB } from '../index'

export class Booklist implements IBooklist {
  id?: number;
  name!: string;
  books?: Set<number> = new Set();
  shared?: boolean = false;
  deleted?: boolean = false;
  created?: Date = new Date();

  constructor(booklist: IBooklist) {
    const { name } = booklist

    this.name = name;
  }
}