<script setup lang="ts">
import { watch, watchEffect } from "vue"

import router from '../router'
import { useContactsStore } from '../stores'

import { useFilter } from '../components/filter'
import DataRowsFilter from '../components/DataRowsFilter.vue'
import BaseButton from "../components/BaseButton.vue"
import DataRowsSearch from "../components/DataRowsSearch.vue";
import DataRowAdder from "../components/DataRowAdder.vue"
import Pagination from "../components/Pagination.vue";
import { usePagination } from '../components/pagination';
import DataRowsViewOptions from '../components/DataRowsViewOptions.vue'

import DataRows from "../components/DataRows.vue"
import ContextMenu from "../components/DataRowContextMenu.vue"
import FilterTags from "../components/FilterTags.vue"

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
        <DataRowsFilter :items="store.filters" @filter-sex="filterSex" @filter-role="filterRole"></DataRowsFilter>
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