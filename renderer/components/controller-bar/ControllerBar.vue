<script setup lang="ts">
import { ref } from 'vue';

import ViewOptions from './ViewOptions.vue'
import FilterMenu from './FilterMenu.vue'
import FilterTags from "./FilterTags.vue"
import Search from "./Search.vue";
import Pagination from "../Pagination.vue";
import Adder from './Adder.vue'
import FullAdder from './FullAdder.vue'

defineProps(['views', 'filters', 'workingFilters'])
const showFullAdder = ref(false)
</script>
<template>
  <div class="control-bar">
    <div class="opt-row">
      <div class="left">
        <ViewOptions class="seg" :views="views"></ViewOptions>
        <FilterMenu class="seg" :items="filters"></FilterMenu>
        <Adder class="seg" @opent-full-adder="showFullAdder = !showFullAdder" :show-full-adder="showFullAdder"></Adder>
        <Search class="seg"></Search>
      </div>
      <div class="right">
        <Pagination></Pagination>
      </div>
    </div>
  </div>
  <FilterTags class="filter-tags" :items="workingFilters"></FilterTags>
  <FullAdder v-if="showFullAdder"></FullAdder>
</template>

<style scoped>
.control-bar {
  display: grid;
  gap: 10px;
  margin: 0 0 7px 50px;
}

.opt-row {
  display: grid;
  grid-template-columns: 1fr auto;
}

.seg {
  margin-right: 1px;
}
</style>