import { defineStore } from 'pinia'
import { TestingDB } from '../../db'
import type { IndexableTypeArray } from 'dexie';
import { Book } from '../../db/testing/book';

import { usePagination } from '../../components/pagination';
import type { IBook } from '@/db/testing/type-defs';

const { total, offset, limit } = usePagination()

export const useBooksStore = defineStore('books', {
  state: () => ({
    items: [] as (IBook | undefined)[],
    total: 0,
    filters: {
      categories: [] as IndexableTypeArray,
      author: [] as IndexableTypeArray,
      publishing: [] as IndexableTypeArray,
      lend: ['已借出', '未借出']
    },
    view: {
      control: {
        delete: true,
        edit: true,
      },
      fields: {
        id: true,
        status: true,
        name: true,
        author: true,
        categories: true,
        publishing: true
      }
    }
  }),
  getters: {},
  actions: {
    async count() {
      this.total = await TestingDB.books.count()
    },
    async list() {
      this.items = await TestingDB.books.offset(offset.value).limit(limit.value).toArray()
    },
    async add(book: IBook) {
      console.log(book)
      await TestingDB.books.add(book)
    },
    async update(key: number) {
      await TestingDB.books.update(key, {
        name: 'updated-name',
        author: 'updated-author',
        categories: ['updated-categories-1', 'updated-categories-2'],
        publishing: 'updated-publishing'
      })
    },
    async updateTest(key: number, change: any) {
      await TestingDB.books.update(key, change)
    },
    async delete(key: number) {
      await TestingDB.books.delete(key)
    },
    async fetchFiltersMeta() {
      await TestingDB.books.orderBy('categories').uniqueKeys((keysArray) => {
        this.filters.categories = keysArray
        // console.log(keysArray)
      });
      await TestingDB.books.orderBy('publishing').uniqueKeys((keysArray) => {
        this.filters.publishing = keysArray
        // console.log(keysArray)
      });
      await TestingDB.books.orderBy('author').uniqueKeys((keysArray) => {
        this.filters.author = keysArray
        // console.log(keysArray)
      });
    },
    async filter(filter: Map<string, Set<string>>) {
      // console.log(filter)
      const results = await Promise.all([
        TestingDB.books
          .where('categories')
          .anyOf(Array.from(filter.get('categories') || this.filters.categories))
          .primaryKeys(),

        TestingDB.books
          .where('publishing')
          .anyOf(Array.from(filter.get('publishing') || this.filters.publishing))
          .primaryKeys(),

        TestingDB.books
          .where('author')
          .anyOf(Array.from(filter.get('author') || this.filters.author))
          .primaryKeys(),

        TestingDB.books
          .filter((book) => {
            if (filter.get('lend')) {
              if (filter.get('lend')?.has('true')) {
                if (book.lend !== undefined) return true
                return false
              } else {
                if (book.lend === undefined) return true
                return false
              }
            } else {
              return true
            }
          })
          .primaryKeys()
      ]);

      const intersection = results.reduce((ids1, ids2) => {
        const set = new Set(ids1);
        return ids2.filter(id => set.has(id));
      });

      total.value = intersection.length;
      const segIndexes = intersection.splice(offset.value, limit.value)
      this.items = await TestingDB.books.bulkGet(segIndexes)
    },
    async fetchPagedRows() {
      await this.count()
      await this.list()
      total.value = this.total
    },
    async search(keywords: string) {
      this.items = await TestingDB.books
        .where("nameTokens").startsWithIgnoreCase(keywords)
        .or('author').startsWithIgnoreCase(keywords)
        .or('categories').anyOfIgnoreCase([keywords])
        .distinct().toArray();
    }
  },
})

// 供 search middleware mutate 后统一调用
export async function refresh() {
  await useBooksStore().fetchPagedRows()
}

// 供 search middleware put@mutate 时调用
export async function refreshFiltersMeta() {
  await useBooksStore().fetchFiltersMeta()
}