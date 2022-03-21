<script setup lang="ts">
import { onMounted, watch } from "vue"

import router from '../router'
import { useContactsStore } from '../stores'

import DataRowsFilter from '../components/DataRowsFilter.vue'
import DataRowsSearch from "../components/DataRowsSearch.vue";
import DataRowAdder from "../components/DataRowAdder.vue"
import Pagination from "../components/Pagination.vue";
import { usePagination } from '../components/pagination';

import DataRows from "../components/DataRows.vue"
import ContextMenu from "../components/DataRowContextMenu.vue"

const store = useContactsStore()
const { page } = usePagination()

async function filter(sex: string) {
  console.log('filter-sex: ', sex)
  await store.filter(sex)
}

async function addItem(data: any) {
  await store.add(data.friendName, data.friendAge, 'F')
}

function openDetail(rowId: number | undefined) {
  console.log(rowId)
  router.push('/data-row-detail')
}

async function deleteItem(key: number | undefined) {
  if (key) await store.delete(key)
}

watch([page], async () => {
  await store.page()
})

onMounted(async () => {
  await store.page()
  await store.getUniqueTags()
  console.log(store.tags)
})

</script>

<template>
  <div class="action-bar">
    <div class="left">
      <DataRowsFilter :items="store.tags" @filter-sex="filter"></DataRowsFilter>
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