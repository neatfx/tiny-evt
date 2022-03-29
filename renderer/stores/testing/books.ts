import { defineStore } from 'pinia'
import { TestingDB } from '../../db'
import type { IndexableTypeArray } from 'dexie';
import { Book } from '../../db/testing/book';

import { usePagination } from '../../components/pagination';
import type { IBook } from '@/db/testing/type-defs';

const { total, offset, limit } = usePagination()

export const useBooksStore = defineStore('books', {
  state: () => ({
    items: [] as IBook[],
    total: 0,
    filters: {
      categories: [] as IndexableTypeArray,
      publishing: [] as IndexableTypeArray,
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
    async add(name: string, author: string, categories?: string[], publishing?: string) {
      await TestingDB.books.add(new Book(
        name,
        author,
        categories,
        publishing,
      ))
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
    },
    async filter(filter: Map<string, Set<string>>) {
      // console.log(filter)
      total.value = await TestingDB.books
        .where('categories').anyOf(Array.from(filter.get('categories') || this.filters.categories))
        .and((book) => {
          if (!filter.get('publishing')) {
            return this.filters.publishing.indexOf((book.publishing!)) === -1 ? false : true
          } else {
            const result = filter.get('publishing')?.has(book.publishing!)
            if (result) { return true } else {
              return false
            }
          }
        })
        .distinct()
        .count()

      this.items = await TestingDB.books
        .where('categories').anyOf(Array.from(filter.get('categories') || this.filters.categories))
        .and((book) => {
          if (!filter.get('publishing')) {
            return this.filters.publishing.indexOf((book.publishing!)) === -1 ? false : true
          } else {
            const result = filter.get('publishing')?.has(book.publishing!)
            if (result) { return true } else {
              return false
            }
          }
        })
        .distinct()
        .offset(offset.value).limit(limit.value).toArray()
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