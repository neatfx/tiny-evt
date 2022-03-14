import { TestingDB } from '../db'
import Contact from '../db/tables/Contact'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    items: [] as Contact[]
  }),
  getters: {
  },
  actions: {
    async list() {
      this.items = await TestingDB.contacts.toArray()
    },
    async add(friendName: string, friendAge: number) {
      this.items = await TestingDB.contacts.toArray()

      await TestingDB.contacts.add(new Contact(
        friendName,
        friendAge
      ))

      await this.list()
    },
    async delete(key: number) {
      await TestingDB.contacts.delete(key)
      await this.list()
    },
  },
})