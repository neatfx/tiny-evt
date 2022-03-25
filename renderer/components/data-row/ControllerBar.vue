<script setup lang="ts">
import DataRowsFilterMenu from '@comps/data-row/RowsFilterMenu.vue'
import DataRowsSearch from "@comps/data-row/DataRowsSearch.vue";
import DataRowAdder from "@comps/data-row/contact-rows/ContactRowAdder.vue"
import Pagination from "@comps/Pagination.vue";
import DataRowsViewOptions from '@comps/data-row/contact-rows/ContactRowsViewOptions.vue'
import FilterTags from "@comps/data-row/FilterTags.vue"

defineProps(['filters', 'workingFilters'])
</script>
<template>
  <div class="control-bar">
    <div class="opt-row">
      <div class="left">
        <DataRowsViewOptions :items="filters"></DataRowsViewOptions>
        <DataRowsFilterMenu :items="filters"></DataRowsFilterMenu>
        <DataRowsSearch></DataRowsSearch>
        <DataRowAdder></DataRowAdder>
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