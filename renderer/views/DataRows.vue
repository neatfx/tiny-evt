<script setup lang="ts">
import { useContactsStore } from '../stores'

import DataRowsFilterMenu from '../components/data-row/RowsFilterMenu.vue'
import DataRowsSearch from "../components/data-row/DataRowsSearch.vue";
import DataRowAdder from "../components/data-row/contact-rows/ContactRowAdder.vue"
import Pagination from "../components/Pagination.vue";
import DataRowsViewOptions from '../components/data-row/contact-rows/ContactRowsViewOptions.vue'
import FilterTags from "../components/data-row/FilterTags.vue"
import ContactRows from "../components/data-row/contact-rows/ContactRows.vue"

import { useDataRowsOpt } from '@comps/data-row/data-rows-controller'

const store = useContactsStore()
const { workingFilters } = useDataRowsOpt(store)
</script>

<template>
  <div class="control-bar">
    <div class="opt-row">
      <div class="left">
        <DataRowsFilterMenu :items="store.filters"></DataRowsFilterMenu>
        <DataRowsSearch></DataRowsSearch>
        <DataRowAdder></DataRowAdder>
      </div>
      <div class="right">
        <Pagination></Pagination>
        <DataRowsViewOptions :items="store.filters.sex"></DataRowsViewOptions>
      </div>
    </div>
    <FilterTags class="filter-tags" :items="workingFilters"></FilterTags>
  </div>
  <ContactRows :items="store.items"></ContactRows>
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