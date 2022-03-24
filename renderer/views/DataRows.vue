<script setup lang="ts">
import { watch, watchEffect } from "vue"
import { useContactsStore } from '../stores'

import { useFilter } from '../components/data-row/filter'
import DataRowsFilterMenu from '../components/data-row/RowsFilterMenu.vue'
import DataRowsSearch from "../components/data-row/DataRowsSearch.vue";
import DataRowAdder from "../components/data-row/contact-rows/ContactRowAdder.vue"
import Pagination from "../components/Pagination.vue";
import { usePagination } from '../components/pagination';
import DataRowsViewOptions from '../components/data-row/contact-rows/ContactRowsViewOptions.vue'
import FilterTags from "../components/data-row/FilterTags.vue"
import ContactRows from "../components/data-row/contact-rows/ContactRows.vue"

const store = useContactsStore()
const { workingFilters, filterRole, filterSex } = useFilter()

watch([usePagination().page], async () => {
  if (Object.keys(workingFilters.value).length) {
    await store.filter(workingFilters.value)
  } else {
    await store.fetchPagedRows()
  }
})

watch(workingFilters, () => {
  if (Object.keys(workingFilters.value).length === 0) {
    usePagination().reset()
  }
})

watchEffect(async () => {
  if (Object.keys(workingFilters.value).length) {

    usePagination().reset()

    await store.filter(workingFilters.value)
  } else {
    await store.fetchPagedRows()
  }
})

watchEffect(async () => {
  await store.fetchPagedRows()
  await store.fetchFiltersMeta()
})
</script>

<template>
  <div class="action-bar">
    <div class="left">
      <DataRowsFilterMenu :items="store.filters" @filter-sex="filterSex" @filter-role="filterRole"></DataRowsFilterMenu>
      <DataRowsSearch></DataRowsSearch>
      <DataRowAdder></DataRowAdder>
    </div>
    <div class="right">
      <Pagination></Pagination>
      <DataRowsViewOptions :items="store.filters.sex" @filter-sex="filterSex"></DataRowsViewOptions>
    </div>
    <div class="clear"></div>
    <FilterTags :items="workingFilters"></FilterTags>
  </div>
  <ContactRows :items="store.items"></ContactRows>
</template>

<style scoped>
.action-bar {
  margin-bottom: 10px;
}
.left {
  float: left;
}
.right {
  float: right;
}
.clear {
  clear: both;
}
</style>