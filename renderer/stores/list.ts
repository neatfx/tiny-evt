import { TestingDB } from '../db'
import Contact from '../db/tables/Contact'
import { defineStore } from 'pinia'
// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useMainStore = defineStore('main', {
  // a function that returns a fresh state
  state: () => ({
    counter: 0,
    name: 'Eduardo',
    items: [] as Contact[]
  }),
  // optional getters
  getters: {
    // getters receive the state as first parameter
    doubleCount: (state) => state.counter * 2,
    // use getters in other getters
    doubleCountPlusOne(): number {
      return this.doubleCount + 1
    },
  },
  // optional actions
  actions: {
    reset() {
      // `this` is the store instance
      this.counter = 0
    },
    async getTestingItems() {
        this.items = await TestingDB.contacts.toArray()
        // console.log(this.items)
    },
    async addTestingItems(friendName: string, friendAge: number) {
      this.items = await TestingDB.contacts.toArray()

      await TestingDB.contacts.add(new Contact(
        friendName,
        friendAge
      ))

      await this.getTestingItems()
    },
  },
})