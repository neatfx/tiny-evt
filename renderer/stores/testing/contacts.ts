import { defineStore } from 'pinia'
import { TestingDB, Contact } from '../../db'
import { usePagination } from '../../components/pagination';
// import { mande } from 'mande'

const { total, offset, limit } = usePagination()

export const useContactsStore = defineStore('contact', {
  state: () => ({
    items: [] as Contact[],
    total: 0,
    tags: [] as String[],
  }),
  getters: {},
  actions: {
    async count() {
      this.total = await TestingDB.contacts.count()
    },
    async list() {
      this.items = await TestingDB.contacts.offset(offset.value).limit(limit.value).toArray()
    },
    async add(name: string, age: number) {
      await TestingDB.contacts.add(new Contact(
        name,
        age
      ))

      await this.page()
    },
    async delete(key: number) {
      await TestingDB.contacts.delete(key)

      await this.page()
    },
    async getUniqueTags() {
      // this.tags = await TestingDB.contacts.orderBy('tags').uniqueKeys();
    },
    async page() {
      await this.count()
      await this.list()
      total.value = this.total
    },
  },
})