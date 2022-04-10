import { defineStore } from 'pinia'
import { TestingDB } from '../../db'
import type { IndexableTypeArray } from 'dexie';

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
      layout: {
        cards: false,
        rows: true
      },
      fields: {
        id: true,
        status: true,
        read: true,
        name: true,
        author: true,
        categories: true,
        publishing: true
      },
      control: {
        cover: true,
        categories: true,
        delete: true,
      }
    },
    indicator: false
  }),
  getters: {},
  actions: {
    async count() {
      this.total = await TestingDB.books.count()
    },
    async list() {
      this.items = await TestingDB.books.offset(offset.value).limit(limit.value).toArray()

      this.indicator = false
    },
    async add(book: IBook) {
      console.log(book)
      await TestingDB.books.add(book)
    },
    async update(key: number, mod: any) {
      console.log(key, mod)
      await TestingDB.books.update(key, mod)
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
      });
      await TestingDB.books.orderBy('publishing').uniqueKeys((keysArray) => {
        this.filters.publishing = keysArray
      });
      await TestingDB.books.orderBy('author').uniqueKeys((keysArray) => {
        this.filters.author = keysArray
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
        // TODO: 移除 filter 的使用，以配合 Hook 或 DBCore
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

      this.indicator = false
    },
    async fetchPagedRows() {
      await this.count()
      await this.list()
      total.value = this.total

      this.indicator = false
    },
    async search(keywords: string) {
      this.items = await TestingDB.books
        .where("nameTokens").startsWithIgnoreCase(keywords)
        .or('author').startsWithIgnoreCase(keywords)
        .or('categories').anyOfIgnoreCase([keywords])
        .distinct().toArray();
    
        this.indicator = false
    },
    async toggleIndicator(show: boolean) {
      this.indicator = show
    },
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

// 
export async function toggleIndicator(show: boolean) {
  if (show) await useBooksStore().toggleIndicator(show)
}

// Persist