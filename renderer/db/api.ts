import { liveQuery } from "dexie";
import { db } from "./db";
import Contact from "./tables/Contact";


export async function list(): Promise<Contact[]> {
  console.log('db api')
  return  await db.contacts.toArray()
}