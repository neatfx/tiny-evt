<script setup lang="ts">
import { ref } from 'vue';

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

defineProps(['views', 'filters', 'workingFilters'])
const showAdder = ref(false)
const showBooklistAdder = ref(false)
const booksStore = useBooksStore()
</script>
<template>
  <div class="control-bar">
    <div class="opt-row">
      <div class="left">
        <ViewOptions class="seg" :views="views"></ViewOptions>
        <FilterMenu class="seg" :items="filters">
        </FilterMenu>
        <Booklist class="seg" @show-booklist-adder="showBooklistAdder = !showBooklistAdder"></Booklist>
        <Search class="seg"></Search>
      </div>
      <div class="right">
        <div class="seg btn-book-adder">
          <BaseButton class="btn-add-book" @click="showAdder = !showAdder">{{ showAdder ? ' ^' : ' +' }}</BaseButton>
          <BaseButton class="btn-book-info">{{ booksStore.total + '书籍' }}</BaseButton>
        </div>
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