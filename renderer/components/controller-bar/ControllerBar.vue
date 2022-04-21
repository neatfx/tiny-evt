<script setup lang="ts">
import { onMounted } from 'vue';

import ViewOptions from './ViewOptions.vue'
import Filter from './Filter.vue'
import Book from './Book.vue';
import Booklist from './Booklist.vue'
import Search from "./Search.vue";
import Pagination from "../Pagination.vue";

import BaseButton from '../BaseButton.vue';
import { useBooksStore } from '../../stores';
import { usePagination } from '../pagination';

defineProps(['views', 'filters', 'workingFilters'])
const booksStore = useBooksStore()
const { reset } = usePagination()

async function showingDletedBooks() {
  booksStore.showDeleted = !booksStore.showDeleted
  reset() // 打开回收站时需重置分页器
  await booksStore.fetchPagedRows()
}

onMounted(async () => {
  await booksStore.dbTotal()
})
</script>
<template>
  <div class="control-bar">
    <div class="opt-row">
      <div class="left-items">
        <ViewOptions :views="views"></ViewOptions>
        <Filter :items="filters"></Filter>
        <Book></Book>
        <Booklist></Booklist>
        <BaseButton @click="showingDletedBooks">回收站</BaseButton>
        <Search></Search>
      </div>
      <div>
        <Pagination></Pagination>
      </div>
    </div>
  </div>
</template>

<style scoped>
.control-bar {
  margin: 0 0 7px 60px;
}

.opt-row {
  display: grid;
  grid-template-columns: 1fr auto;
}

.left-items {
  display: grid;
  grid-template-columns: auto;
  grid-auto-flow: column;
  justify-content: left;
  gap: 2px;
}
</style>