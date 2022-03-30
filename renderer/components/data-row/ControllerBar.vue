<script setup lang="ts">
import DataRowsViewOptions from '@/components/data-row/ViewOptions.vue'
import DataRowsFilterMenu from '@/components/data-row/FilterMenu.vue'
import DataRowsSearch from "@comps/data-row/Search.vue";
import Pagination from "@comps/Pagination.vue";
import FilterTags from "@comps/data-row/FilterTags.vue"

defineProps(['views', 'filters', 'workingFilters'])
</script>
<template>
  <div class="control-bar">
    <div class="opt-row">
      <div class="left">
        <DataRowsViewOptions :views="views"></DataRowsViewOptions>
        <DataRowsFilterMenu :items="filters"></DataRowsFilterMenu>
        <slot name="adder"></slot>
        <DataRowsSearch></DataRowsSearch>
      </div>
      <div class="right">
        <Pagination></Pagination>
      </div>
    </div>
    <FilterTags class="filter-tags" :items="workingFilters"></FilterTags>
  </div>
</template>

<style scoped>
.control-bar {
  display: grid;
  gap: 10px;
  margin-bottom: 11px;
}
.opt-row {
  display: grid;
  grid-template-columns: 1fr auto;
}
</style>