<script setup lang="ts">
import { watch, watchEffect } from "vue"

import router from '../router'
import { useContactsStore } from '../stores'

import { useFilter } from '../components/data-row/filter'
import DataRowsFilterMenu from '../components/data-row/DataRowsFilterMenu.vue'
import BaseButton from "../components/BaseButton.vue"
import DataRowsSearch from "../components/data-row/DataRowsSearch.vue";
import DataRowAdder from "../components/data-row/DataRowAdder.vue"
import Pagination from "../components/Pagination.vue";
import { usePagination } from '../components/pagination';
import DataRowsViewOptions from '../components/data-row/DataRowsViewOptions.vue'

import DataRows from "../components/data-row/DataRows.vue"
import ContextMenu from "../components/data-row/DataRowContextMenu.vue"
import FilterTags from "../components/data-row/FilterTags.vue"

const store = useContactsStore()
const { workingFilters, resetFilter, filterRole, filterSex } = useFilter()

async function addItem(data: any) {
  await store.add(data.friendName, data.friendAge, 'F', 'user')
}

function openDetail(rowId: number | undefined) {
  router.push('/data-row-detail/' + rowId)
}

async function deleteItem(key: number | undefined) {
  if (key) await store.delete(key)
}

function resetAllFilters() {
  resetFilter()
  usePagination().reset()
}

watch([usePagination().page], async () => {
  if (Object.keys(workingFilters.value).length) {
    await store.filter(workingFilters.value)
  } else {
    await store.refreshPage()
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
    await store.refreshPage()
  }
})

watchEffect(async () => {
  await store.refreshPage()
  await store.getFiltersMeta()
})
</script>

<template>
  <div class="action-bar">
    <div>
      <div class="left">
        <DataRowsFilterMenu :items="store.filters" @filter-sex="filterSex" @filter-role="filterRole"></DataRowsFilterMenu>
        <BaseButton @click="resetAllFilters">Reset Filter</BaseButton>
        <DataRowsSearch></DataRowsSearch>
        <DataRowAdder @add="addItem"></DataRowAdder>
      </div>
      <div class="right">
        <Pagination></Pagination>
        <DataRowsViewOptions :items="store.filters.sex" @filter-sex="filterSex"></DataRowsViewOptions>
      </div>
      <div class="clear"></div>
    </div>
    <FilterTags :items="workingFilters"></FilterTags>
  </div>
  <DataRows :items="store.items" @open-detail="openDetail" @delete="deleteItem"></DataRows>
  <ContextMenu @delete="deleteItem"></ContextMenu>
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