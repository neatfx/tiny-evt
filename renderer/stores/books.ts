import { defineStore } from 'pinia'
import { TestingDB } from '@/db'
import type { IndexableTypeArray } from 'dexie';

import { usePagination } from '@comps/pagination';
import type { IBook } from '@/db/testing/type-defs';
import { useFilter } from '@/components/controller-bar/filter';

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
    // 删除书籍
    // 包含事务：
    // 1、将书籍从其所属的书单中移除
    // 2、删除书籍
    async delete(key: number) {
      const book = await TestingDB.books.get(key)

      if (book) {
        const booklistIds = Array.from(book.booklists || [])

        TestingDB.transaction('rw', TestingDB.books, TestingDB.booklists, async () => {
          await Promise.all([
            Promise.all(booklistIds.map(async id => {
              const booklist = await TestingDB.booklists.get(id)
              if (booklist && booklist.books) {
                booklist.books.delete(key)
                TestingDB.booklists.put(booklist)
              }
            })),
            TestingDB.books.delete(key)
          ])
        })
      }
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

      const filterArr = []
      const lendFilter = filter.get('lend')

      filter.forEach((filterParams, fieldName) => {
        if (fieldName !== 'lend') {
          filterArr.push(
            TestingDB.books
              .where(fieldName)
              .anyOf(Array.from(filterParams))
              .distinct()
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
        // TestingDB.books.orderBy('name').primaryKeys()
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
    },
    // 添加书籍到书单
    async addBooklistIdToBook(bookId: number, booklistId: number) {
      const book = await TestingDB.books.get(bookId)
      if (book) {
        if (book.booklists === undefined) book.booklists = new Set()

        book.booklists.add(booklistId)
        await TestingDB.books.put(book)
      }
    },
    async addBookIdToBooklist(bookId: number, booklistId: number) {
      const booklist = await TestingDB.booklists.get(booklistId)
      if (booklist) {
        if (booklist.books === undefined) booklist.books = new Set()

        booklist.books.add(bookId)
        await TestingDB.booklists.put(booklist)
      }
    },
    async addToBooklist(bookId: number, booklistId: number) {
      console.log('db.shudan.add - ', bookId, booklistId)

      TestingDB.transaction('rw', TestingDB.books, TestingDB.booklists, async () => {
        await Promise.all([
          this.addBooklistIdToBook(bookId, booklistId),
          this.addBookIdToBooklist(bookId, booklistId)
        ]);
      });
    },
    // 从书单中移除书籍
    async removeBooklistIdFromBook(bookId: number, booklistId: number) {
      const book = await TestingDB.books.get(bookId)
      if (book) {
        if (book.booklists) {
          book.booklists.delete(booklistId)
          await TestingDB.books.put(book)
        }
      }
    },
    async removeBookIdFromBooklist(bookId: number, booklistId: number) {
      const booklist = await TestingDB.booklists.get(booklistId)
      if (booklist) {
        if (booklist.books) {
          booklist.books.delete(bookId)
          await TestingDB.booklists.put(booklist)
        }
      }
    },
    async removeFromBooklist(bookId: number, booklistId: number) {
      console.log('db.shudan.remove - ', bookId, booklistId)

      TestingDB.transaction('rw', TestingDB.books, TestingDB.booklists, async () => {
        await Promise.all([
          this.removeBooklistIdFromBook(bookId, booklistId),
          this.removeBookIdFromBooklist(bookId, booklistId),
        ]);
      });
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