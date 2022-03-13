<template>
  <ul>
    <li v-for="post in items" :key="post.id">
      <button>Act-1</button>
      <button>Act-2</button>
      {{ post.id }} - {{ post.name }} - {{ post.age }}
      <button class="right">Act-3</button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type Contact from '../db/tables/Contact'
import { useMainStore } from '../stores/list'

export default defineComponent({
  components: {},
  data() {
    return {
      items: [] as Contact[]
    }
  },
  async mounted() {
    const itemsStore = useMainStore()
    await itemsStore.getTestingItems()
    // console.log(itemsStore.items)
    this.items = itemsStore.items
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
.right {
  float: right;
  margin-right: 5px;
}
</style>