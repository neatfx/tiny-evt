import { defineStore } from 'pinia'
import { TestingDB } from '../../db'
import type { IndexableTypeArray } from 'dexie';
import { Contact } from '../../db/testing/contact';

import { usePagination } from '../../components/pagination';

// import { mande } from 'mande'

const { total, offset, limit } = usePagination()

export const useContactsStore = defineStore('contact', {
  state: () => ({
    items: [] as Contact[],
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
      this.total = await TestingDB.contacts.count()
    },
    async list() {
      this.items = await TestingDB.contacts.offset(offset.value).limit(limit.value).toArray()
    },
    async add(name: string, age: number, sex: string, role: string) {
      await TestingDB.contacts.add(new Contact(
        name,
        age,
        sex,
        role
      ))

      await this.fetchPagedRows()
    },
    async delete(key: number) {
      await TestingDB.contacts.delete(key)

      await this.fetchPagedRows()
    },
    async fetchFiltersMeta() {
      await TestingDB.contacts.orderBy('sex').uniqueKeys((keysArray) => {
        this.filters.sex = keysArray
      });
      await TestingDB.contacts.orderBy('role').uniqueKeys((keysArray) => {
        this.filters.role = keysArray
      });
    },
    async filter(obj: object) {
      // console.log(obj)
      total.value = await TestingDB.contacts
        .where(obj).count()
      this.items = await TestingDB.contacts
        .where(obj)
        .offset(offset.value).limit(limit.value).toArray()
    },
    async fetchPagedRows() {
      await this.count()
      await this.list()
      total.value = this.total
    },
    async search() {
      TestingDB.transaction('rw', TestingDB.books, function () {
        // TestingDB.books.add({
        //   name: "三体 黑暗森林",
        //   author: "刘慈欣"
        // });

        TestingDB.books.where("nameWords").startsWithIgnoreCase("三").distinct().toArray(function (books) {
          console.log("Found " + books.length + " books.", books);
        });
      }).catch(function (e: { stack: any; }) {
        console.log(e.stack || e);
      });
    }
  },
})