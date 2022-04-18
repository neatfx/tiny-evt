/* 
 * class mapped to the covers table
 */

import type { ICover } from '../index'
import { AppDB } from '../index'

export class Cover implements ICover {
  id?: number;

  data: Blob | number | undefined;

  deleted?: boolean;
  created?: Date;

  constructor(cover: ICover) {
    const { data } = cover

    this.data = data;

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
    return await AppDB.covers.add(this);
  }
}