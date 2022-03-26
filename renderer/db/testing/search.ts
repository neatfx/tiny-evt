/*
* Full-text search based on multi-valued indexes and Dexie hooks.
*/

import { TestingDB } from './index';
import type { IBook } from "./type-defs";

// db.version(1).stores({ emails: "++id,subject,from,*to,*cc,*bcc,message,*messageWords" });

TestingDB.books.hook("creating", function (primKey, obj, trans) {
  if (typeof obj.name == 'string') obj.nameWords = getAllWords(obj.name);
})

// TestingDB.books.hook("updating", function (mods: IBook, primKey, obj, trans) {
//   if (mods.hasOwnProperty("name")) {
//     // "message" property is being updated
//     if (typeof mods.name == 'string')
//       // "message" property was updated to another valid value. Re-index messageWords:
//       return { nameWords: getAllWords(mods.name) };
//     else
//       // "message" property was deleted (typeof mods.message === 'undefined') or changed to an unknown type. Remove indexes:
//       return { nameWords: [] };
//   }
// })

function getAllWords(text: string) {
  /// <param name="text" type="String"></param>
  var allWordsIncludingDups = text.split(' ');
  var wordSet = allWordsIncludingDups.reduce(function (prev: { [key: string]: boolean }, current) {
    prev[current] = true;
    return prev;
  }, {});
  return Object.keys(wordSet);
}

// Open database to allow application code using it.
// TestingDB.open();