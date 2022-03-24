<script setup lang="ts">
import { ref, watchEffect } from 'vue';

import FolderPanel from '../FolderPanel.vue';
import BaseButton from '../BaseButton.vue';
import type { IndexableTypeArray } from 'dexie';
import { useFilter } from './filter'

const { filterRole, filterSex } = useFilter()
const props = defineProps<{
  items: {
    sex: IndexableTypeArray
    role: IndexableTypeArray
  }
}>()
const seletedFilter = ref('')
const filtersMenu = ref<EventTarget | null>()

// 显示二级菜单
function showFinalFilter(e: MouseEvent, filterType: string) {
  seletedFilter.value = filterType
  filtersMenu.value = e.target
}

function onFilterItemClick(e: MouseEvent, filterType: string, filterValue: string) {
  switch (filterType) {
    case 'sex':
      filterSex(filterValue)
      seletedFilter.value = ''
      break;
    case 'role':
      filterRole(filterValue)
      seletedFilter.value = ''
      break;
  }
}

// 隐藏二级菜单
watchEffect(() => {
  window.addEventListener("click", (e) => {
    if (e.target !== filtersMenu.value) {
      seletedFilter.value = ''
    }
  })
})
</script>

<template>
  <FolderPanel title="Filter" :isInlineFixed="true" :isActionMenu="true">
    <template #header>
      <BaseButton>Rows Filter</BaseButton>
    </template>
    <template #body>
      <ul class="filters-list">
        <li v-for="(v, k) in props.items" :key="k" @click="showFinalFilter($event, k)">{{ k }}</li>
      </ul>
    </template>
  </FolderPanel>
  <ul v-if="'sex' === seletedFilter" class="final-filter">
    <li
      v-for="(v, k) in props.items.sex"
      :key="k"
      @click="onFilterItemClick($event, 'sex', v.toString())"
    >{{ v }}</li>
  </ul>
  <ul v-if="'role' === seletedFilter" class="final-filter">
    <li
      v-for="(v, k) in props.items.role"
      :key="k"
      @click="onFilterItemClick($event, 'role', v.toString())"
    >{{ v }}</li>
  </ul>
</template>

<style scoped>
ul {
  font-size: 15px;
  list-style: none;
  width: 87px;
  margin: 0;
  padding: 0;
  z-index: 900;
}
li {
  padding: 5px 10px;
  background-color: grey;
}

li:hover {
  background-color: lightgray;
  cursor: default;
}
/*  */
.filters-list {
  z-index: 990;
}
.final-filter {
  position: fixed;
  background-color: lightgray;
}
</style>