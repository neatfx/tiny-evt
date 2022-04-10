/*
* DBCore Middleware ( 包含 Search、SyncStore ）
*/

import {
  Segment,
  URLTokenizer, WildcardTokenizer, PunctuationTokenizer, ForeignTokenizer, DictTokenizer, ChsNameTokenizer,
  DictOptimizer, ChsNameOptimizer, DatetimeOptimizer,
  pangu, wildcard
} from 'segmentit'
import { refresh, refreshFiltersMeta } from '@stores/testing/books'
import type { DBCore, Middleware } from 'dexie';

export const segmentit = new Segment();
// 强制分割类单词识别
segmentit.use(URLTokenizer); // URL识别
segmentit.use(WildcardTokenizer); // 通配符，必须在标点符号识别之前
segmentit.use(PunctuationTokenizer); // 标点符号识别
segmentit.use(ForeignTokenizer); // 外文字符、数字识别，必须在标点符号识别之后
// 中文单词识别
segmentit.use(DictTokenizer); // 词典识别
segmentit.use(ChsNameTokenizer); // 人名识别，建议在词典识别之后
// 优化模块
segmentit.use(DictOptimizer) // 词典识别优化
segmentit.use(ChsNameOptimizer); // 人名识别优化
segmentit.use(DatetimeOptimizer); // 日期时间识别优化
// 字典文件
segmentit.loadDict(pangu); // 盘古词典
// segmentit.loadDict(panguExtend1, panguExtend2); // 扩展词典（用于调整原盘古词典）
segmentit.loadDict(wildcard, 'WILDCARD', true); // 通配符
// segmentit.loadSynonymDict(synonym); // 同义词
// segmentit.loadStopwordDict('stopword.txt'); // 停止符

// 更改操作完成同步更新数据
async function syncAll(myRequest: any) {
  // 同步更新 Filter 菜单
  if (myRequest.type === 'put' && myRequest.changeSpec && myRequest.changeSpec['categories']) {
    refreshFiltersMeta()
  }

  // 同步更新 Filter 菜单
  if (myRequest.type === 'delete') {
    refreshFiltersMeta()
  }

  // 同步更新 Pagination & DataRows
  await refresh()
}

const middleware: Middleware<DBCore> = {
  stack: "dbcore", // The only stack supported so far.
  name: "dbCoreMiddleware", // Optional name of your middleware
  create(downlevelDatabase) {
    // Return your own implementation of DBCore:
    return {
      // Copy default implementation.
      ...downlevelDatabase,
      // Override table method
      table(tableName) {
        // Call default table method
        const downlevelTable = downlevelDatabase.table(tableName);
        // Derive your own table from it:
        return {
          // Copy default table implementation:
          ...downlevelTable,
          // get: async req => {
          //   const myRequest = { ...req };
          //   console.log('db query')

          //   const res = await downlevelTable.get(myRequest);
          //   // Do things after mutate
          //   // await syncAll(myRequest)

          //   console.log('get operation...')

          //   const myResponse = { ...res };
          //   return myResponse;
          // },
          // Override the mutate method:
          mutate: async req => {
            // Copy the request object
            const myRequest = { ...req };
            // Do things before mutate, then call downlevel mutate:
            if (myRequest.type === 'add') {
              console.log(myRequest)
              for (let index = 0; index < myRequest.values.length; index++) {
                const element = myRequest.values[index];
                const nameTokens = segmentit.doSegment(element['name'], {
                  simple: true,
                  stripPunctuation: true
                })

                element.nameTokens = nameTokens
              }
            }
            // For Update
            if (myRequest.type === 'put') {
              console.log(myRequest)
              if (myRequest.changeSpec && myRequest.changeSpec['name']) {
                const nameTokens = segmentit.doSegment(myRequest.changeSpec['name'], {
                  simple: true,
                  stripPunctuation: true
                })
                for (let index = 0; index < myRequest.values.length; index++) {
                  const element = myRequest.values[index];
                  element.nameTokens = nameTokens
                }
              }
            }

            const res = await downlevelTable.mutate(myRequest);
            // Do things after mutate
            await syncAll(myRequest)

            console.log('mutate operation...')

            const myResponse = { ...res };
            return myResponse;
          }
        }
      }
    };
  }
}

export { middleware }