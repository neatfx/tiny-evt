<script setup lang="ts">
import { useBooksStore } from '../stores'
import { useDataRowsController } from '@/components/data-row/controller'

// ControllerBar 主要由通用组件构成，BookRowAdder & BookRows 为专有组件
import BookRowAdder from '@comps/data-row/BookRowAdder.vue'
import ControllerBar from '@comps/data-row/ControllerBar.vue';
import BookRows from "@/components/data-row/BookRows.vue"
import BookCards from "@/components/data-row/BookCards.vue"
import { onMounted } from 'vue';

const store = useBooksStore()
const { workingFilters } = useDataRowsController(store)

store.$subscribe((mutation, state) => {
  // persist the whole state to the local storage whenever it changes
  localStorage.setItem('books', JSON.stringify(state.view))
})

onMounted(() => {
  const viewLocal = localStorage.getItem('books')
  if (viewLocal) store.view = JSON.parse(viewLocal)
})
</script>

<template>
  <ControllerBar :views="store.view" :filters="store.filters" :workingFilters="workingFilters">
    <template #adder>
      <BookRowAdder></BookRowAdder>
    </template>
  </ControllerBar>
  <BookRows v-if="store.view.layout.rows" :items="store.items"></BookRows>
  <BookCards v-if="store.view.layout.cards" :items="store.items"></BookCards>
</template>

<style scoped>
</style>