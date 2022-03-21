import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { TestingDB, Contact } from '../../db'
// import { mande } from 'mande'

export const useContactsStore = defineStore('contact', {
  state: () => ({
    items: [] as Contact[],
    total: 0,
    tags: [] as String[],
  }),
  getters: {
  },
  actions: {
    async count() {
      this.total = await TestingDB.contacts.count()
    },
    async list(offset: number = 0, limit: number = 10) {
      this.items = await TestingDB.contacts.offset(offset).limit(limit).toArray()
    },
    async add(name: string, age: number) {
      this.items = await TestingDB.contacts.toArray()

      await TestingDB.contacts.add(new Contact(
        name,
        age
      ))
    },
    async delete(key: number) {
      await TestingDB.contacts.delete(key)
    },
    async getUniqueTags() {
      // this.tags = await TestingDB.contacts.orderBy('tags').uniqueKeys();
    }
  },
})