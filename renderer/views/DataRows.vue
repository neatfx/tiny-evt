<script setup lang="ts">
import { watch, watchEffect } from "vue"

import router from '../router'
import { useContactsStore } from '../stores'

import { useFilter } from '../components/filter'
import UniFilter from '../components/UniFilter.vue'
import BaseButton from "../components/BaseButton.vue"
import DataRowsSearch from "../components/DataRowsSearch.vue";
import DataRowAdder from "../components/DataRowAdder.vue"
import Pagination from "../components/Pagination.vue";
import { usePagination } from '../components/pagination';
import DataRowsViewOptions from '../components/DataRowsViewOptions.vue'

import DataRows from "../components/DataRows.vue"
import ContextMenu from "../components/DataRowContextMenu.vue"

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
    <div>
      <div class="left">
        <UniFilter :items="store.filters" @filter-sex="filterSex" @filter-role="filterRole"></UniFilter>
        <BaseButton @click="resetFilter">Reset Filter</BaseButton>
        <DataRowsSearch></DataRowsSearch>
        <DataRowAdder @add="addItem"></DataRowAdder>
      </div>
      <div class="right">
        <Pagination></Pagination>
        <DataRowsViewOptions :items="store.filters.sex" @filter-sex="filterSex"></DataRowsViewOptions>
      </div>
      <div class="clear"></div>
    </div>
    <ul id="filter-tags-wrapper" v-if="Object.keys(filterRef).length">
      <li v-for="(k, v) in filterRef" :key="k" class="filter-item">
        <span class="filter-type">{{ v }}</span>
        <span class="filter-tag">{{ k }}</span>
        <span class="btn-delete">X</span>
      </li>
    </ul>
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

/* 过滤器标签 */
#filter-tags-wrapper {
  display: grid;
  grid-template-columns: auto;
  gap: 10px;
  list-style: none;
  justify-content: left;
  padding: 10px;
  border: 1px solid grey;
}
ul {
}
li {
  float: left;
  /* background-color: cadetblue; */
}
.filter-item {
  margin-right: 10px;
}
.filter-type {
  display: inline-block;
  padding: 1px 10px;
  margin-right: 1px;
  background-color: darkkhaki;
}
.filter-tag {
  display: inline-block;
  padding: 1px 10px;
  background-color: cadetblue;
}
.btn-delete {
  display: inline-block;
  padding: 1px 10px;
  margin-left: 1px;
  background-color: indianred;
}
</style>