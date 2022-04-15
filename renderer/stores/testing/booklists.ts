import { defineStore } from 'pinia'
import { TestingDB } from '../../db'

import { usePagination } from '../../components/pagination';
import type { IBook } from '@/db/testing/type-defs';
import { useFilter } from '@/components/controller-bar/filter';

const { total, offset, limit } = usePagination()
const { workingFilters } = useFilter()

export const useBooklistStore = defineStore('booklists', {
  state: () => ({
    items: [] as (IBook | undefined)[],
    total: 0,
    indicator: false
  }),
  actions: {
    async count() {
      this.total = await TestingDB.booklists.count()
    },
    async list() {
      this.items = await TestingDB.booklists.offset(offset.value).limit(limit.value).toArray()

      await toggleIndicator(false)
    },
    async add(book: IBook) {
      console.log(book)
      await TestingDB.booklists.add(book)
    },
    async update(key: number, mod: any) {
      console.log(key, mod)
      await TestingDB.booklists.update(key, mod)
    },
    async updateTest(key: number, change: any) {
      await TestingDB.booklists.update(key, change)
    },
    async delete(key: number) {
      await TestingDB.booklists.delete(key)
    },
    async filter(filter: Map<string, Set<string>>) {
      // console.log(filter)

      const filterArr = []
      const lendFilter = filter.get('lend')

      filter.forEach((filterParams, fieldName) => {
        if (fieldName !== 'lend') {
          filterArr.push(
            TestingDB.booklists
              .where(fieldName)
              .anyOf(Array.from(filterParams))
              .primaryKeys()
          )
        }
      })

      // TODO: 移除 filter 的使用，以配合 Hook 或 DBCore
      if (lendFilter) filterArr.push(
        TestingDB.booklists
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
        // TestingDB.booklists.orderBy('name').primaryKeys()
      )

      const results = await Promise.all(filterArr);
      const intersection = results.reduce((ids1, ids2) => {
        const set = new Set(ids1);
        return ids2.filter(id => set.has(id));
      });

      total.value = intersection.length;
      this.items = await TestingDB.booklists.bulkGet(intersection.splice(offset.value, limit.value))

      await toggleIndicator(false)
    },
    async fetchPagedRows() {
      await this.count()
      await this.list()
      total.value = this.total

      await toggleIndicator(false)
    },
    async search(keywords: string) {
      this.items = await TestingDB.booklists
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
    await useBooklistStore().filter(workingFilters)
  } else {
    await useBooklistStore().fetchPagedRows()
  }
}

// 供 search middleware put@mutate 时调用
// export async function refreshFiltersMeta() {
//   await useBooklistStore().fetchFiltersMeta()
// }

// Indicator
async function sleep() {
  return new Promise(resolve => {
    setTimeout(resolve, 500)
  })
}

export async function toggleIndicator(show: boolean) {
  if (!show) await sleep()
  await useBooklistStore().toggleIndicator(show)
}

// Persist