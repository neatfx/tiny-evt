import { defineStore } from 'pinia'
import { Book, AppDB } from '@/db'
import type { IndexableTypeArray } from 'dexie';

import { usePagination } from '@comps/pagination';
import type { IBook } from '@/db';
import { useFilter } from '@/components/controller-bar/filter';
import { refreshStore } from './booklists'
import { Cover } from '@/db/tables';

const { total, offset, limit } = usePagination()
const { workingFilters } = useFilter()

export const useBooksStore = defineStore('books', {
  state: () => ({
    items: [] as (IBook | undefined)[],
    totalFixed: 0,
    total: 0,
    booklistSelected: false,
    currBooklist: [] as number[],
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
        varyCardReadingStatus: true,
        varyCardBooklist: true,
        varyCardName: true,
        douban: true,
        author: true,
        publishing: true,
        published: true,
        categories: true
      },
      control: {
        varyCardMenu: true,
      }
    },
    indicator: false,
    showFilterTagsZone: false,
    showBooklistAdder: false,
  }),
  getters: {},
  actions: {
    async dbTotal() {
      this.totalFixed = await AppDB.books.count()
    },
    async count() {
      if (this.booklistSelected) {
        if (this.currBooklist.length) {
          this.total = await AppDB.books.where('id').anyOf(this.currBooklist).count()
        } else {
          this.total = 0
        }
      } else {
        this.total = await AppDB.books.count()
      }
    },
    async list() {
      if (this.booklistSelected) {
        this.items = await AppDB.books.where('id').anyOf(this.currBooklist).offset(offset.value).limit(limit.value).toArray()
      } else {
        this.items = await AppDB.books.offset(offset.value).limit(limit.value).toArray()
      }

      await toggleIndicator(false)
    },
    async add(book: IBook) {
      book.cover = await new Cover({ data: book.cover }).save()
      await new Book(book).save()
    },
    async update(key: number, change: any) {
      await AppDB.books.update(key, change)
    },
    // 包含事务处理
    async updateCover(key: number, cover: Blob | undefined) {
      if (cover === undefined) {
        // 事务处理 - 删除封面
        const book = await AppDB.books.get(key)
        if (book) {
          AppDB.transaction('rw', AppDB.books, AppDB.covers, async () => {
            await Promise.all([
              AppDB.covers.delete(book.cover as number),
              AppDB.books.update(key, { cover: cover })
            ])
          })
        }
      } else {
        // 事务处理 - 添加封面
        AppDB.transaction('rw', AppDB.books, AppDB.covers, async () => {
          const coverId = await new Cover({ data: cover }).save()
          await AppDB.books.update(key, { cover: coverId })
        })
      }
    },
    async getCover(id: number) {
      console.log(id)
      return await AppDB.covers.get(id)
    },
    // 删除书籍
    // 包含事务：
    // 1、将书籍从其所属的书单中移除
    // 2、删除书籍封面图片
    // 3、删除书籍
    async delete(key: number) {
      const book = await AppDB.books.get(key)

      if (book) {
        const booklistIds = Array.from(book.booklists || [])

        AppDB.transaction('rw', AppDB.books, AppDB.booklists, AppDB.covers, async () => {
          await Promise.all([
            Promise.all(booklistIds.map(async id => {
              const booklist = await AppDB.booklists.get(id)
              if (booklist && booklist.books) {
                booklist.books.delete(key)
                AppDB.booklists.put(booklist)
              }
            }))
          ]);

          await AppDB.covers.delete(book.cover as number)
          await AppDB.books.delete(key)
        })
      }
    },
    async fetchFiltersMeta() {
      await AppDB.books.orderBy('categories').uniqueKeys((keysArray) => {
        this.filters.categories = keysArray
      });
      await AppDB.books.orderBy('publishing').uniqueKeys((keysArray) => {
        this.filters.publishing = keysArray
      });
      await AppDB.books.orderBy('author').uniqueKeys((keysArray) => {
        this.filters.author = keysArray
      });
    },
    async filter(filter: Map<string, Set<string>>, withSelectedBooklist: boolean = false) {
      // console.log(filter)

      const filterArr = []
      const lendFilter = filter.get('lend')

      filter.forEach((filterParams, fieldName) => {
        if (fieldName !== 'lend') {
          filterArr.push(
            AppDB.books
              .where(fieldName)
              .anyOf(Array.from(filterParams))
              .distinct()
              .primaryKeys()
          )
        }
      })

      if (lendFilter) filterArr.push(
        AppDB.books
          .filter((book) => {
            const lendParam = filter.get('lend')
            if (lendParam) {
              if (lendParam.has('true')) {
                if (book.lend !== '') return true
                return false
              } else {
                if (book.lend === '') return true
                return false
              }
            } else {
              return true
            }
          })
          .primaryKeys()
      )

      // if (filterArr.length === 0) {
      //   filterArr.push(AppDB.books.orderBy('id').primaryKeys())
      // }

      const results = await Promise.all(filterArr);

      // 如存在书籍 IDs 数据（ booklist@state , 来自选中书单 ）则 :
      // 1、重置分页器（ 是否保存分页器状态供书单关闭后返回之前书籍分页状态 ？）
      // 2、将 IDs 加入 Reduce 实现基于原有过滤器的书单列表
      if (this.booklistSelected) {
        results.push(this.currBooklist)
      }

      const intersection = results.reduce((ids1, ids2) => {
        const set = new Set(ids1);
        return ids2.filter(id => set.has(id));
      });

      total.value = intersection.length;
      this.items = await AppDB.books.bulkGet(intersection.splice(offset.value, limit.value))

      await toggleIndicator(false)
    },
    async fetchPagedRows() {
      await this.dbTotal()
      await this.count()
      await this.list()
      total.value = this.total

      await toggleIndicator(false)
    },
    async search(keywords: string) {
      this.items = await AppDB.books
        .where("nameTokens").startsWithIgnoreCase(keywords)
        .or('author').startsWithIgnoreCase(keywords)
        .or('categories').anyOfIgnoreCase([keywords])
        .or('publishing').anyOfIgnoreCase([keywords])
        .distinct().toArray();

      await toggleIndicator(false)
    },
    async toggleIndicator(show: boolean) {
      this.indicator = show
    },
    // 添加书籍到书单
    async addBooklistIdToBook(bookId: number, booklistId: number) {
      const book = await AppDB.books.get(bookId)
      if (book) {
        if (book.booklists === undefined) book.booklists = new Set()

        book.booklists.add(booklistId)
        await AppDB.books.put(book)
      }
    },
    async addBookIdToBooklist(bookId: number, booklistId: number) {
      const booklist = await AppDB.booklists.get(booklistId)
      if (booklist) {
        if (booklist.books === undefined) booklist.books = new Set()

        booklist.books.add(bookId)
        await AppDB.booklists.put(booklist)
      }
    },
    async addToBooklist(bookId: number, booklistId: number) {
      console.log('db.shudan.add - ', bookId, booklistId)

      AppDB.transaction('rw', AppDB.books, AppDB.booklists, async () => {
        await Promise.all([
          this.addBooklistIdToBook(bookId, booklistId),
          this.addBookIdToBooklist(bookId, booklistId)
        ]);
      });
      // 同步更新 booklistsStore
      await refreshStore()
    },
    // 从书单中移除书籍
    async removeBooklistIdFromBook(bookId: number, booklistId: number) {
      const book = await AppDB.books.get(bookId)
      if (book) {
        if (book.booklists) {
          book.booklists.delete(booklistId)
          await AppDB.books.put(book)
        }
      }
    },
    async removeBookIdFromBooklist(bookId: number, booklistId: number) {
      const booklist = await AppDB.booklists.get(booklistId)
      if (booklist) {
        if (booklist.books) {
          booklist.books.delete(bookId)
          await AppDB.booklists.put(booklist)
        }
      }
    },
    async removeFromBooklist(bookId: number, booklistId: number) {
      console.log('db.shudan.remove - ', bookId, booklistId)

      AppDB.transaction('rw', AppDB.books, AppDB.booklists, async () => {
        await Promise.all([
          this.removeBooklistIdFromBook(bookId, booklistId),
          this.removeBookIdFromBooklist(bookId, booklistId),
        ]);
      })

      // 同步更新 booklistsStore
      await refreshStore()
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