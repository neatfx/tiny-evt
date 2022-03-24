<script setup lang="ts">
import { ref, watchEffect } from 'vue';

import FolderPanel from '../FolderPanel.vue';
import BaseButton from '../BaseButton.vue';
import type { IndexableTypeArray } from 'dexie';
import { useFilter } from './filter'
import { useFolderPanel } from '../folderPanel'

const { filterRole, filterSex } = useFilter()
const props = defineProps<{
  items: {
    sex: IndexableTypeArray
    role: IndexableTypeArray
  }
}>()
const seletedFilter = ref('')
const filtersMenu = ref<EventTarget | null>()
const { currentExpandedPanel } = useFolderPanel()

function showFinalFilter(e: MouseEvent, filterType: string) {
  seletedFilter.value = filterType
  filtersMenu.value = e.target

  if (seletedFilter.value !== '') {
    if (currentExpandedPanel.value) {
      currentExpandedPanel.value()
    } else {
      currentExpandedPanel.value = () => {
        seletedFilter.value = ''
      }
    }
  } else {
    currentExpandedPanel.value = null
  }
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

// 处理一二级菜单可同时展开问题
function onListFilterTypes() {
  if (seletedFilter.value !== '') seletedFilter.value = ""
}

watchEffect(() => {
  window.addEventListener("click", (e) => {
    if (e.target !== filtersMenu.value) {
      seletedFilter.value = ''
      if (currentExpandedPanel.value) {
        currentExpandedPanel.value()
      }
    }
  })
})
</script>

<template>
  <FolderPanel
    title="Filter"
    :isInlineFixed="true"
    :isActionMenu="true"
    v-on:menu-expanded="onListFilterTypes"
  >
    <template #header>
      <BaseButton>Rows Filter</BaseButton>
    </template>
    <template #body>
      <ul>
        <li v-for="(v, k) in props.items" :key="k" @click="showFinalFilter($event, k)">{{ k }}</li>
      </ul>
    </template>
  </FolderPanel>
  <ul v-if="'sex' === seletedFilter" class="final-filter" @click.stop>
    <li
      v-for="(v, k) in props.items.sex"
      :key="k"
      @click="onFilterItemClick($event, 'sex', v.toString())"
    >{{ v }}</li>
  </ul>
  <ul v-if="'role' === seletedFilter" class="final-filter" @click.stop>
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
.final-filter {
  position: fixed;
  background-color: lightgray;
}
</style>