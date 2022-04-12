<script setup lang="ts">
import ViewOptions from './ViewOptions.vue'
import FilterMenu from './FilterMenu.vue'
import Search from "./Search.vue";
import Pagination from "../Pagination.vue";
import FilterTags from "./FilterTags.vue"

defineProps(['views', 'filters', 'workingFilters'])
</script>
<template>
  <div class="control-bar">
    <div class="opt-row">
      <div class="left">
        <ViewOptions class="seg" :views="views"></ViewOptions>
        <FilterMenu class="seg" :items="filters"></FilterMenu>
        <slot class="seg" name="adder"></slot>
        <Search class="seg"></Search>
      </div>
      <div class="right">
        <Pagination></Pagination>
      </div>
    </div>
  </div>
  <FilterTags class="filter-tags" :items="workingFilters"></FilterTags>
</template>

<style scoped>
.control-bar {
  display: grid;
  gap: 10px;
  margin: 0 0 11px 60px;
}
.opt-row {
  display: grid;
  grid-template-columns: 1fr auto;
}
.seg{
  margin-right: 1px;
}
.filter-tags{
  background-color: gray;
}
</style>