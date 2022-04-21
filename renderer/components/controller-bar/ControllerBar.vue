<script setup lang="ts">
import { onMounted } from 'vue';

import ViewOptions from './ViewOptions.vue'
import Filter from './Filter.vue'
import FilterTags from "./FilterTags.vue"
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
      <div>
        <ViewOptions class="seg" :views="views"></ViewOptions>
        <Filter class="seg" :items="filters"></Filter>
        <Book class="seg"></Book>
        <Booklist class="seg"></Booklist>
        <Search class="seg"></Search>
      </div>
      <div>
        <BaseButton class="seg" @click="showingDletedBooks">回收站</BaseButton>
        <Pagination></Pagination>
      </div>
    </div>
  </div>
  <FilterTags v-if="booksStore.showFilterTagsZone" class="filter-tags" :items="workingFilters"></FilterTags>
</template>

<style scoped>
.control-bar {
  margin: 0 0 7px 60px;
}

.opt-row {
  display: grid;
  grid-template-columns: 1fr auto;
}

.seg {
  margin-right: 2px;
}
</style>