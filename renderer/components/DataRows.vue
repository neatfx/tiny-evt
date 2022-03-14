<script setup lang="ts">
import type Contact from '@/db/tables/Contact';
import { onMounted, reactive, shallowRef, triggerRef, watch, type ShallowRef } from 'vue'
import { useMainStore } from '../stores/list'

let state = reactive({
  items: [] as Contact[]
})

const itemsStore = useMainStore()

onMounted(async () => {
  await itemsStore.getTestingItems()

  state.items = itemsStore.items
  // console.log(state)
})

watch(
  () => itemsStore.items,
  () => {
    state.items = itemsStore.items
  }
)

async function deleteItem(key: number | undefined) {
  if (key) await itemsStore.deleteTestingItem(key)
}
</script>

<template>
  <ul>
    <li v-for="post in state.items" :key="post.id">
      <button>Act-1</button>
      <button>Act-2</button>
      {{ post.id }} - {{ post.name }} - {{ post.age }}
      <button
        @click="deleteItem(post.id)"
        class="right"
      >Delete</button>
    </li>
  </ul>
</template>

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