import { defineStore } from 'pinia'
import { TestingDB } from '@/db'

import { usePagination } from '@comps/pagination';
import { useFilter } from '@comps/controller-bar/filter';

import type { IBooklist } from '@/db';
import { Booklist } from '@/db'

const { total, offset, limit } = usePagination()
const { workingFilters } = useFilter()

export const useBooklistStore = defineStore('booklists', {
  state: () => ({
    items: [] as (IBooklist | undefined)[],
    total: 0,
    indicator: false
  }),
  actions: {
    async add(booklist: IBooklist) {
      await new Booklist(booklist).save()
      await this.list()
    },
    async count() {
      this.total = await TestingDB.booklists.count()
    },
    // 暂不提供分页器支持
    async list() {
      // this.items = await TestingDB.booklists.offset(offset.value).limit(limit.value).toArray()
      this.items = await TestingDB.booklists.toArray()
      // await toggleIndicator(false)
    },
    async search(keywords: string) {
      this.items = await TestingDB.booklists
        .where("name").startsWithIgnoreCase(keywords)
        .distinct().toArray();

      // await toggleIndicator(false)
    },
    // async update(key: number, mod: any) {
    //   console.log(key, mod)
    //   await TestingDB.booklists.update(key, mod)
    // },
    // 删除书单
    // 包含事务：
    // 1、将书单从其所包含的书籍中移除
    // 2、删除书单
    async delete(key: number) {
      const booklist = await TestingDB.booklists.get(key)

      if (booklist) {
        const bookIds = Array.from(booklist.books || [])

        TestingDB.transaction('rw', TestingDB.books, TestingDB.booklists, async () => {
          await Promise.all([
            Promise.all(bookIds.map(async id => {
              const book = await TestingDB.books.get(id)
              if (book && book.booklists) {
                book.booklists.delete(key)
                TestingDB.books.put(book)
              }
            })),
            TestingDB.booklists.delete(key)
          ])
        })

        await this.list()
      }
    },
    // async fetchPagedRows() {
    //   await this.count()
    //   await this.list()
    //   total.value = this.total

    //   // await toggleIndicator(false)
    // },
    // async toggleIndicator(show: boolean) {
    //   this.indicator = show
    // }
  },
})

// 供 search middleware mutate 后统一调用
// export async function refresh() {
//   if (workingFilters.size) {
//     await useBooklistStore().filter(workingFilters)
//   } else {
//     await useBooklistStore().fetchPagedRows()
//   }
// }

// 供 search middleware put@mutate 时调用
// export async function refreshFiltersMeta() {
//   await useBooklistStore().fetchFiltersMeta()
// }

// Indicator
// async function sleep() {
//   return new Promise(resolve => {
//     setTimeout(resolve, 500)
//   })
// }

// export async function toggleIndicator(show: boolean) {
//   if (!show) await sleep()
//   await useBooklistStore().toggleIndicator(show)
// }

// Persist