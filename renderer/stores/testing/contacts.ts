import { defineStore } from 'pinia'
import { TestingDB} from '../../db'
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

      await this.page()
    },
    async delete(key: number) {
      await TestingDB.contacts.delete(key)

      await this.page()
    },
    async getUniqueSex() {
      await TestingDB.contacts.orderBy('sex').uniqueKeys((keysArray) => {
        this.filters.sex = keysArray
      });
    },
    async getUniqueRole() {
      await TestingDB.contacts.orderBy('role').uniqueKeys((keysArray) => {
        this.filters.role = keysArray
      });
    },
    async filter(obj: object) {
      offset.value = 0;
      console.log(obj)
      this.items = await TestingDB.contacts
        .where(obj)
        .offset(offset.value).limit(limit.value).toArray()

      total.value = this.items.length
    },
    async page() {
      await this.count()
      await this.list()
      total.value = this.total
    },
  },
})