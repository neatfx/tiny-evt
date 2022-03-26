import { defineStore } from 'pinia'
import { TestingDB } from '../../db'
import type { IndexableTypeArray } from 'dexie';
import { Book } from '../../db/testing/book';

import { usePagination } from '../../components/pagination';

// import { mande } from 'mande'

const { total, offset, limit } = usePagination()

export const useBooksStore = defineStore('books', {
  state: () => ({
    items: [] as Book[],
    total: 0,
    filters: {
      sex: [] as IndexableTypeArray,
      role: [] as IndexableTypeArray,
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
      await TestingDB.books.orderBy('sex').uniqueKeys((keysArray) => {
        this.filters.sex = keysArray
      });
      await TestingDB.books.orderBy('role').uniqueKeys((keysArray) => {
        this.filters.role = keysArray
      });
    },
    async filter(obj: object) {
      // console.log(obj)
      total.value = await TestingDB.books
        .where(obj).count()
      this.items = await TestingDB.books
        .where(obj)
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