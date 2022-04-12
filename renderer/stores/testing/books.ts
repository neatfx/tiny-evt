import { defineStore } from 'pinia'
import { TestingDB } from '../../db'
import type { IndexableTypeArray } from 'dexie';

import { usePagination } from '../../components/pagination';
import type { IBook } from '@/db/testing/type-defs';
import { useFilter } from '@/components/data-row/filter';

const { total, offset, limit } = usePagination()
const { workingFilters } = useFilter()

export const useBooksStore = defineStore('books', {
  state: () => ({
    items: [] as (IBook | undefined)[],
    total: 0,
    filters: {
      categories: [] as IndexableTypeArray,
      author: [] as IndexableTypeArray,
      publishing: [] as IndexableTypeArray,
      lend: ['true', 'false'],
      readingStatus: ['wanted', 'not-yet', 'reading', 'read']
    },
    view: {
      layout: {
        cards: false,
        rows: true
      },
      fields: {
        id: true,
        lend: true,
        readingStatus: true,
        name: true,
        author: true,
        categories: true,
        publishing: true,
        published: true
      },
      control: {
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

      await toggleIndicator(false)
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
      console.log(filter)

      const filterArr = []
      const lendFilter = filter.get('lend')

      filter.forEach((filterParams, fieldName) => {
        if (fieldName !== 'lend') {
          filterArr.push(
            TestingDB.books
              .where(fieldName)
              .anyOf(Array.from(filterParams))
              .primaryKeys()
          )
        }
      })

      // TODO: 移除 filter 的使用，以配合 Hook 或 DBCore
      if (lendFilter) filterArr.push(
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
      )

      if (filterArr.length === 0) filterArr.push(
        TestingDB.books.orderBy('name').primaryKeys()
      )

      const results = await Promise.all(filterArr);
      const intersection = results.reduce((ids1, ids2) => {
        const set = new Set(ids1);
        return ids2.filter(id => set.has(id));
      });

      total.value = intersection.length;
      this.items = await TestingDB.books.bulkGet(intersection.splice(offset.value, limit.value))

      await toggleIndicator(false)
    },
    async fetchPagedRows() {
      await this.count()
      await this.list()
      total.value = this.total

      await toggleIndicator(false)
    },
    async search(keywords: string) {
      this.items = await TestingDB.books
        .where("nameTokens").startsWithIgnoreCase(keywords)
        .or('author').startsWithIgnoreCase(keywords)
        .or('categories').anyOfIgnoreCase([keywords])
        .distinct().toArray();

      await toggleIndicator(false)
    },
    async toggleIndicator(show: boolean) {
      this.indicator = show
    }
  },
})

// 供 search middleware mutate 后统一调用
export async function refresh() {
  if (workingFilters.size) {
    await useBooksStore().filter(workingFilters)
  } else {
    await useBooksStore().fetchPagedRows()
  }
}

// 供 search middleware put@mutate 时调用
export async function refreshFiltersMeta() {
  await useBooksStore().fetchFiltersMeta()
}

// Indicator
async function sleep() {
  return new Promise(resolve => {
    setTimeout(resolve, 500)
  })
}

export async function toggleIndicator(show: boolean) {
  if (!show) await sleep()
  await useBooksStore().toggleIndicator(show)
}

// Persist