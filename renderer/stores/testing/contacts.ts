import { defineStore } from 'pinia'
import { TestingDB, Contact } from '../../db'
import { usePagination } from '../../components/pagination';
import type { IndexableTypeArray } from 'dexie';
// import { mande } from 'mande'

const { total, offset, limit } = usePagination()

export const useContactsStore = defineStore('contact', {
  state: () => ({
    items: [] as Contact[],
    total: 0,
    tags: [] as IndexableTypeArray,
  }),
  getters: {},
  actions: {
    async count() {
      this.total = await TestingDB.contacts.count()
    },
    async list() {
      this.items = await TestingDB.contacts.offset(offset.value).limit(limit.value).toArray()
    },
    async add(name: string, age: number, sex: string) {
      await TestingDB.contacts.add(new Contact(
        name,
        age,
        sex
      ))

      await this.page()
    },
    async delete(key: number) {
      await TestingDB.contacts.delete(key)

      await this.page()
    },
    async getUniqueTags() {
      await TestingDB.contacts.orderBy('sex').uniqueKeys((keysArray) => {
        this.tags = keysArray
      });
    },
    async filter(sex: string) {
      offset.value = 0;
      
      this.items = await TestingDB.contacts.filter(function (contact) {
        return contact.sex === sex;
      }).offset(offset.value).limit(limit.value).toArray()
    },
    async page() {
      await this.count()
      await this.list()
      total.value = this.total
    },
  },
})