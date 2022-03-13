<template>
  <ul>
    <li v-for="post in items" :key="post.id">
      <button @click="">Act-1</button>
      <button @click="">Act-2</button>
      {{ post.id }} - {{ post.name }} - {{ post.age }}
      <button class="right" @click="">Act-3</button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TestingDB } from '../db'
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
      this.items = await TestingDB.contacts.toArray()
      console.log(this.items)
    }
  },
  async mounted() {
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
.right{
float: right;
margin-right: 5px;
}
</style>