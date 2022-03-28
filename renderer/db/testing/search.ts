/*
* Hooks for Search
*/

import { TestingDB } from './index';
import type { IBook } from "./type-defs";
import { Segment, URLTokenizer, WildcardTokenizer, PunctuationTokenizer, ForeignTokenizer, DictTokenizer, DictOptimizer } from 'segmentit'

export const segmentit = new Segment();
// 强制分割类单词识别
// segmentit.use(URLTokenizer); // URL识别
segmentit.use(WildcardTokenizer); // 通配符，必须在标点符号识别之前
segmentit.use(PunctuationTokenizer); // 标点符号识别
segmentit.use(ForeignTokenizer); // 外文字符、数字识别，必须在标点符号识别之后
// 中文单词识别
segmentit.use(DictTokenizer); // 词典识别
// segmentit.use(ChsNameTokenizer); // 人名识别，建议在词典识别之后
// 优化模块
segmentit.use(DictOptimizer) // 词典识别优化
// segmentit.use(ChsNameOptimizer); // 人名识别优化
// segmentit.use(DictOptimizer); // 词典识别优化
// segmentit.use(DatetimeOptimizer); // 日期时间识别优化
// 字典文件
// segmentit.loadDict('dict.txt'); // 盘古词典
// segmentit.loadDict('dict2.txt'); // 扩展词典（用于调整原盘古词典）
// segmentit.loadDict('names.txt'); // 常见名词、人名
// segmentit.loadDict('wildcard.txt', 'WILDCARD', true); // 通配符
// segmentit.loadSynonymDict('synonym.txt'); // 同义词
// segmentit.loadStopwordDict('stopword.txt'); // 停止符

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