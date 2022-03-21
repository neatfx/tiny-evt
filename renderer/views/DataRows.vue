<script setup lang="ts">
import { onMounted, ref, watch } from "vue"

import router from '../router'
import { useContactsStore } from '../stores'

import DataRowsFilter from '../components/DataRowsFilter.vue'
import DataRowsSearch from "../components/DataRowsSearch.vue";
import DataRowAdder from "../components/DataRowAdder.vue"
import Pagination from "../components/Pagination.vue";
import { usePagination } from '../components/pagination';

import DataRows from "../components/DataRows.vue"
import ContextMenu from "../components/DataRowContextMenu.vue"
import BaseButton from "../components/BaseButton.vue"

const store = useContactsStore()
const { page } = usePagination()
const filterRef = ref<{
  sex?: string
  role?: string
}>({})

async function filterSex(sex: string) {
  filterRef.value.sex = sex
  await store.filter(filterRef.value)
}

async function filterRole(role: string) {
  filterRef.value.role = role
  await store.filter(filterRef.value)
}

async function resetFilter() {
  filterRef.value = {}
  await store.page()
}

async function addItem(data: any) {
  await store.add(data.friendName, data.friendAge, 'F', 'user')
}

function openDetail(rowId: number | undefined) {
  console.log(rowId)
  router.push('/data-row-detail')
}

async function deleteItem(key: number | undefined) {
  if (key) await store.delete(key)
}

watch([page], async () => {
  // if(filters.){}
  await store.page()
})

onMounted(async () => {
  await store.page()
  await store.getUniqueSex()
  await store.getUniqueRole()
  console.log(store.filters)
})

</script>

<template>
  <div class="action-bar">
    <div class="left">
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