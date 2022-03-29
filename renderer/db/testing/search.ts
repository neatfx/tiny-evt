/*
* DBCore Middleware For Search
*/

import { TestingDB } from './index';
import {
  Segment,
  URLTokenizer, WildcardTokenizer, PunctuationTokenizer, ForeignTokenizer, DictTokenizer, ChsNameTokenizer,
  DictOptimizer, ChsNameOptimizer, DatetimeOptimizer,
  pangu, wildcard
} from 'segmentit'
import { refresh, refreshFiltersMeta } from '@stores/testing/books'

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

export function searchTokenizer() {
  TestingDB.use({
    stack: "dbcore", // The only stack supported so far.
    name: "TokenizerMiddleware", // Optional name of your middleware
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

                // 同步更新 Filter 菜单
                if (myRequest.changeSpec && myRequest.changeSpec['categories']) {
                  refreshFiltersMeta()
                }
              }

              const res = await downlevelTable.mutate(myRequest);
              // Do things after mutate
              console.log('mutate operation...')
              await refresh()
              const myResponse = { ...res };
              return myResponse;
            }
          }
        }
      };
    }
  });
}