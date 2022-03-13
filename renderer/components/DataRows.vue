<template>
  <ul>
    <li v-for="post in items" :key="post.id">{{ post.id }} - {{ post.name }} - {{post.age}}</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { db } from '../db/db'
import type Contact from '../db/tables/Contact'

export default defineComponent({
  components: {},
  data() {
    return {
      items: [] as Contact[]
    }
  },
  methods: {
    async getItems() {
      this.items = await db.contacts.toArray()
      console.log(this.items)
    }
  },
  async mounted(){
    await this.getItems()
  }
})
</script>

<style scoped>
ul {
  border: 1px solid grey;
  padding: 0;
  margin: 0;
}
li {
  display: block;
  margin-left: 0;
  border-bottom: 1px solid grey;
  padding: 6px 0 6px 10px;
  color: gainsboro;
}
li:last-child {
  border-bottom: none;
}
li:hover {
  background-color: #2d2f36;
}
</style>