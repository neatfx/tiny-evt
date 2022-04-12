<script setup lang="ts">
import { onMounted } from 'vue';

import { useBooksStore } from '../stores'

import { useDataRowsController } from '@/components/controller-bar/controller'
import ControllerBar from '@comps/controller-bar/ControllerBar.vue';

import BookRowsAdder from '@comps/book-rows/BookRowsAdder.vue'
import BookRows from "@/components/book-rows/BookRows.vue"

import BookCards from "@/components/book-cards/BookCards.vue"

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
      <BookRowsAdder></BookRowsAdder>
    </template>
  </ControllerBar>
  <BookRows v-if="store.view.layout.rows" :items="store.items"></BookRows>
  <BookCards v-if="store.view.layout.cards" :items="store.items"></BookCards>
</template>

<style scoped>
</style>