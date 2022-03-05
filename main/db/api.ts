import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";
import { db, Friend } from "./db";


export async function list(): Promise<Friend[]> {
  console.log('db api')
  return  await db.friends.toArray()
}