import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { TestingDB, Contact } from '../db'
// import { mande } from 'mande'

// const api = mande('/api/users')

export const useTestingStore = defineStore('testing', {
  state: () => ({
    items: [] as Contact[],
    tags: [] as String[],
    panel: ref<boolean>(true)
  }),
  getters: {
  },
  actions: {
    async list(offset: number = 0, limit: number = 10) {
      this.items = await TestingDB.contacts.offset(offset).limit(limit).toArray()
    },
    async add(name: string, age: number) {
      this.items = await TestingDB.contacts.toArray()

      await TestingDB.contacts.add(new Contact(
        name,
        age
      ))

      await this.list()
    },
    async delete(key: number) {
      await TestingDB.contacts.delete(key)
      await this.list()
    },
    async getUniqueTags() {
      // this.tags = await TestingDB.contacts.orderBy('tags').uniqueKeys();
    },
    async updateExpandedPanel(newRef: Ref<boolean>) {
      // this.tags = await TestingDB.contacts.orderBy('tags').uniqueKeys();
      // this.panel = newRef
    }
  },
})