import { defineStore } from 'pinia'
import { TestingDB, Contact } from '../db'

export const useTestingStore = defineStore('testing', {
  state: () => ({
    items: [] as Contact[]
  }),
  getters: {
  },
  actions: {
    async list() {
      this.items = await TestingDB.contacts.toArray()
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
  },
})