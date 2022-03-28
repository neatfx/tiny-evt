/*
* Hooks for Search
*/

import { TestingDB } from './index';
import type { IBook } from "./type-defs";
import { Segment, useDefault } from 'segmentit'

export const segmentit = useDefault(new Segment());

function hookCreating() {
  TestingDB.books.hook("creating", function (primKey, obj, trans) {
    obj.nameWords = segmentit.doSegment(obj.name, {
      simple: true,
      stripPunctuation: true
    });
    // console.log(primKey, obj, trans)
    obj.nameWords = obj.nameWords?.concat([obj.author])
    if (obj.categories) obj.nameWords = obj.nameWords?.concat([...obj.categories])
  })
}

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

export function handleHook() {
  hookCreating()
}