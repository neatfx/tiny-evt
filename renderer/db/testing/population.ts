import { TestingDB } from './index'
import { Contact } from './contacts';

export async function populateContacts() {
  await TestingDB.contacts.bulkAdd([
    new Contact('zhao', 10, 'F', 'admin'),
    new Contact('qian', 20, 'M', 'user'),
    new Contact('sun', 30, 'F', 'admin'),
    new Contact('li', 40, 'F', 'user'),
    new Contact('zhou', 50, 'F', 'user'),
    new Contact('wu', 60, 'M', 'user'),
    new Contact('zheng', 70, 'F', 'user'),
    new Contact('wang', 80, 'M', 'user'),
  ])
}