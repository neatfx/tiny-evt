/*
 * Populating
 */

import { TestingDB } from './index';
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

export function handlePopulate() {
  TestingDB.on('populate', async function () {
    console.log('event("populate")')
    await populateContacts()
  })

  TestingDB.on('ready', () => {
    return TestingDB.contacts.count(async (count: number) => {
      if (count > 0) {
        console.log("Database already populated")
      } else {
        console.log("Database is empty. Populating...")

        await populateContacts()
        console.log("Done populating.")
      }
    })
  })
}