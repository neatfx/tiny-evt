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
      delete: true,
      edit: true
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
    // async add(name: string, age: number, sex: string, role: string) {
    //   await TestingDB.books.add(new Book(
    //     name,
    //     age,
    //     sex,
    //     role
    //   ))

    //   await this.fetchPagedRows()
    // },
    async delete(key: number) {
      await TestingDB.books.delete(key)

      await this.fetchPagedRows()
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
    async filter(filter: {
      publishing: string[],
      categories: string[]
    }) {
      console.log(filter)
      total.value = await TestingDB.books
        .where('categories').anyOf(Array.from(filter.categories))
        .and((c) => {
          if (filter.publishing.length == 0) {
            return true
          } else {
             return filter.publishing.includes(c.publishing!)
          }
        })
        .count()
      this.items = await TestingDB.books
        .where('categories').anyOf(Array.from(filter.categories))
        .and((c) => {
          if (filter.publishing.length == 0) {
            return true
          } else {
             return filter.publishing.includes(c.publishing!)
          }
        })
        .offset(offset.value).limit(limit.value).toArray()
    },
    async fetchPagedRows() {
      await this.count()
      await this.list()
      total.value = this.total
    },
    async search(ketwords: string) {
      TestingDB.transaction('rw', TestingDB.books, function () {
        TestingDB.books.where("nameWords").startsWithIgnoreCase(ketwords).distinct().toArray(function (books) {
          console.log("Found " + books.length + " books.", books);
        });
      }).catch(function (e: { stack: any; }) {
        console.log(e.stack || e);
      });
    }
  },
})