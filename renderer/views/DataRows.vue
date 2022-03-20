<script setup lang="ts">
import { onMounted } from "vue"

import { useTestingStore, } from '../stores/testing'
import router from '../router'

import DataRowsFilter from '../components/DataRowsFilter.vue'
import DataRowAdder from "../components/DataRowAdder.vue"
import DataRowsSearch from "../components/DataRowsSearch.vue";
import Pagination from "../components/Pagination.vue";
import DataRows from "../components/DataRows.vue"
import ContextMenu from "../components/DataRowContextMenu.vue"
import { usePagination } from '../components/pagination';

const { offset, limit, total, pages } = usePagination()
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
  if (key) await store.delete(key)
}
async function getData() {
  console.log('getData')
  await store.list(offset.value, limit.value)
}
async function onPaginationChange() {
  getData()
}
onMounted(async () => {
  setTimeout(async () => {
    getData()
  }, 100)
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
      <Pagination @change="onPaginationChange"></Pagination>
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