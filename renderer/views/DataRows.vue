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

const store = useContactsStore()
const { page, offset } = usePagination()
const { filterRef, resetFilter, filterRole, filterSex, removeFilter } = useFilter()

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

  offset.value = 0
  page.value = 1
}

watch([page], async () => {
  if (Object.keys(filterRef.value).length) {
    await store.filter(filterRef.value)
  } else {
    await store.refreshPage()
  }
})

watchEffect(async () => {
  if (Object.keys(filterRef.value).length) {

    offset.value = 0
    page.value = 1

    await store.filter(filterRef.value)
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
    <ul id="filter-tags-wrapper" v-if="Object.keys(filterRef).length">
      <li v-for="(v, k) in filterRef" :key="k" class="filter-item">
        <span class="filter-type">{{ k }}</span>
        <span class="filter-type">is</span>
        <span class="filter-tag">{{ v }}</span>
        <span class="btn-delete" @click="removeFilter(k)">
          <!-- <span class="icon-cross"></span> -->
          X
        </span>
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
  grid-auto-flow: column;
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
  padding: 2px 10px;
  margin-right: 1px;
  background-color: darkkhaki;
}
.filter-tag {
  display: inline-block;
  padding: 2px 10px 2px;
  background-color: cadetblue;
}
.btn-delete {
  display: inline-block;
  padding: 2px 10px 2px 10px;
  margin-left: 1px;
  background-color: indianred;
}
.icon-cross {
  /* font-size:large; */
  /* display: inline-block; */
  transition-property: all;
  transform: rotate(45deg);
}
</style>