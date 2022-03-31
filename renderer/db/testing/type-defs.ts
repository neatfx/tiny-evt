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
  author: string;

  cover?: Blob | null;

  created?: Date;
  subname?: string;
  translator?: string;
  categories?: string[];
  publishing?: string;
  published?: string;
  designed?: string;
  price?: number;
  from?: string;
  description?: string;

  nameTokens?: string[];
  lend?: string;
}