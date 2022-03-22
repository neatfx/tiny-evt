<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from "vue"

import router from '../router'
import { useContactsStore } from '../stores'

import UniFilter from '../components/UniFilter.vue'
import DataRowsFilter from '../components/DataRowsFilter.vue'
import DataRowsSearch from "../components/DataRowsSearch.vue";
import DataRowAdder from "../components/DataRowAdder.vue"
import Pagination from "../components/Pagination.vue";
import { usePagination } from '../components/pagination';
import { useFilter } from '../components/filter'

import DataRows from "../components/DataRows.vue"
import ContextMenu from "../components/DataRowContextMenu.vue"
import BaseButton from "../components/BaseButton.vue"

const store = useContactsStore()
const { page } = usePagination()
const { filterRef, resetFilter, filterRole, filterSex } = useFilter()

async function addItem(data: any) {
  await store.add(data.friendName, data.friendAge, 'F', 'user')
}

function openDetail(rowId: number | undefined) {
  router.push('/data-row-detail/' + rowId)
}

async function deleteItem(key: number | undefined) {
  if (key) await store.delete(key)
}

watch([page], async () => {
  if (Object.keys(filterRef.value).length) {
    await store.filter(filterRef.value)
  } else {
    await store.page()
  }
})

watchEffect(async () => {
  if (Object.keys(filterRef.value).length) {
    await store.filter(filterRef.value)
  } else {
    await store.page()
  }
})

watchEffect(async () => {
  await store.page()
  await store.getUniqueSex()
  await store.getUniqueRole()
})

</script>

<template>
  <div class="action-bar">
    <div class="left">
      <UniFilter :items="store.filters"></UniFilter>
      <DataRowsFilter :items="store.filters.sex" @filter-sex="filterSex"></DataRowsFilter>
      <DataRowsFilter :items="store.filters.role" @filter-sex="filterRole"></DataRowsFilter>
      <BaseButton @click="resetFilter">Reset Filter</BaseButton>
      <DataRowsSearch></DataRowsSearch>
      <DataRowAdder @add="addItem"></DataRowAdder>
    </div>
    <div class="right">
      <Pagination></Pagination>
    </div>
    <div class="clear"></div>
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