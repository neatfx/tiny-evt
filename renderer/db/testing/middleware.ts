/*
* DBCore Middleware ( 包含 Search、SyncStore ）
*/

import {
  Segment,
  URLTokenizer, WildcardTokenizer, PunctuationTokenizer, ForeignTokenizer, DictTokenizer, ChsNameTokenizer,
  DictOptimizer, ChsNameOptimizer, DatetimeOptimizer,
  pangu, wildcard
} from 'segmentit'
import { refresh, refreshFiltersMeta, toggleIndicator } from '@stores/testing/books'
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

async function showIndicator(show: boolean = true) {
  toggleIndicator(show)
}

const middleware: Middleware<DBCore> = {
  stack: "dbcore", // 目前仅支持 ‘dbcore’
  name: "dbCoreMiddleware", // 可选命名
  create(downlevelDatabase) {
    // 此处返回自定义 DBCore 实现
    return {
      ...downlevelDatabase, // 复制默认 database 实现
      // 覆写 table 方法
      table(tableName) {
        const downlevelTable = downlevelDatabase.table(tableName); // 调用默认 table 方法
        // 由默认 table 派生出自定义 table
        return {
          ...downlevelTable, // 复制默认 table 实现
          openCursor: async req => {
            showIndicator()
            const myRequest = { ...req };
            const res = await downlevelTable.openCursor(myRequest);
            console.log('openCursor operation...')
            return res;
          },
          count: async req => {
            showIndicator()
            const myRequest = { ...req };
            const res = await downlevelTable.count(myRequest);
            console.log('count operation...')

            return res;
          },
          get: async req => {
            showIndicator()
            const myRequest = { ...req };
            const res = await downlevelTable.get(myRequest);
            console.log('get operation...')
            return res;
          },
          query: async req => {
            showIndicator()
            const myRequest = { ...req };
            const res = await downlevelTable.query(myRequest);
            console.log('query operation...')
            return res;
          },
          getMany: async req => {
            showIndicator()
            const myRequest = { ...req };
            const res = await downlevelTable.getMany(myRequest);
            console.log('getMany operation...')
            return res;
          },
          mutate: async req => {
            showIndicator()
            const myRequest = { ...req };
            // Before mutate
            // For Add
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

            // After mutate
            await syncAll(myRequest);

            console.log('mutate - ' + myRequest.type + ' operation...')

            const myResponse = { ...res };
            return myResponse;
          }
        }
      }
    };
  }
}

export { middleware }