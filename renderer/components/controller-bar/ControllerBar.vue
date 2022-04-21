<script setup lang="ts">
import { onMounted, ref } from 'vue';

import ViewOptions from './ViewOptions.vue'
import FilterMenu from './FilterMenu.vue'
import FilterTags from "./FilterTags.vue"
import Booklist from './Booklist.vue'
import Search from "./Search.vue";
import Pagination from "../Pagination.vue";
import Adder from './Adder.vue'
import BooklistAdder from './BooklistAdder.vue';

import BaseButton from '../BaseButton.vue';
import { useBooksStore } from '../../stores';
import { usePagination } from '../pagination';

defineProps(['views', 'filters', 'workingFilters'])
const showAdder = ref(false)
const showBooklistAdder = ref(false)
const booksStore = useBooksStore()
const { reset } = usePagination()

async function showingDletedBooks() {
  booksStore.showDeleted = !booksStore.showDeleted
  // 打开回收站时需重置分页器
  reset()
  await booksStore.fetchPagedRows()
}
onMounted(async () => {
  await booksStore.dbTotal()
})
</script>
<template>
  <div class="control-bar">
    <div class="opt-row">
      <div class="left">
        <ViewOptions class="seg" :views="views"></ViewOptions>
        <FilterMenu class="seg" :items="filters">
        </FilterMenu>
        <div class="seg btn-book-adder">
          <BaseButton class="btn-add-book" @click="showAdder = !showAdder">{{ showAdder ? ' ^' : ' +' }}</BaseButton>
          <BaseButton class="btn-book-info">{{ booksStore.totalFixed + '书籍' }}</BaseButton>
          <BaseButton class="btn-add-book" @click="showingDletedBooks">回收站</BaseButton>
        </div>
        <Booklist class="seg" @show-booklist-adder="showBooklistAdder = !showBooklistAdder"></Booklist>
        <Search class="seg"></Search>
      </div>
      <div class="right">
        <Pagination></Pagination>
      </div>
    </div>
  </div>
  <FilterTags v-if="booksStore.showFilterTagsZone" class="filter-tags" :items="workingFilters"></FilterTags>
  <Adder v-if="showAdder"></Adder>
  <BooklistAdder v-if="booksStore.showBooklistAdder"></BooklistAdder>
</template>

<style scoped>
.control-bar {
  display: grid;
  gap: 10px;
  margin: 0 0 7px 60px;
}

.opt-row {
  display: grid;
  grid-template-columns: 1fr auto;
}

.seg {
  margin-right: 3px;
}

.btn-book-adder {
  display: inline-block;
  padding: 0;
}

.btn-book-info {
  background-color: #888;
}
</style>