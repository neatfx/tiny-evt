<script setup lang="ts">
import { watchEffect } from "vue"

import router from '../router'
import { useTestingStore, } from '../stores/testing'

import DataRowsFilter from '../components/DataRowsFilter.vue'
import DataRowsSearch from "../components/DataRowsSearch.vue";
import DataRowAdder from "../components/DataRowAdder.vue"
import Pagination from "../components/Pagination.vue";
import { usePagination } from '../components/pagination';

import DataRows from "../components/DataRows.vue"
import ContextMenu from "../components/DataRowContextMenu.vue"

const { offset, limit, total } = usePagination()
const store = useTestingStore()

function filterDataRows(e) {
  console.log(e.target.value)
}

async function addItem(data: any) {
  await store.add(data.friendName, data.friendAge)
}

function openDetail(rowId: number | undefined) {
  console.log(rowId)
  router.push('/data-row-detail')
}

async function deleteItem(key: number | undefined) {
  if (key) await store.delete(key, offset.value, limit.value)
}

watchEffect(async () => {
  await store.count();
  total.value = store.total;
})

watchEffect(async () => {
  await store.list(offset.value, limit.value);
})
</script>

<template>
  <div class="action-bar">
    <div class="left">
      <DataRowsFilter @change="filterDataRows"></DataRowsFilter>
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