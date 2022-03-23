<script setup lang="ts">
import { ref } from 'vue';

import FolderPanel from './FolderPanel.vue';
import BaseButton from './BaseButton.vue';
import type { IndexableTypeArray } from 'dexie';

const emit = defineEmits<{
  (e: 'filter-sex', sex: string): void
  (e: 'filter-role', sex: string): void
}>()
const props = defineProps<{
  items: {
    sex: IndexableTypeArray
    role: IndexableTypeArray
  }
}>()
const seletedFilter = ref('')

function showFinalFilter(filterType: string) {
  console.log(filterType)
  seletedFilter.value = filterType
}

function onFilterItemClick(filterType: string, filterValue: string) {
  console.log('click', filterType)

  switch (filterType) {
    case 'sex':
      emit('filter-sex', filterValue)
      seletedFilter.value = ''
      break;
    case 'role':
      emit('filter-role', filterValue)
      seletedFilter.value = ''
      break;
  }

}
</script>

<template>
  <FolderPanel title="Filter" :isInlineFixed="true" :isActionMenu="true">
    <template #header>
      <BaseButton>Rows Filter</BaseButton>
    </template>
    <template #body>
      <ul>
        <li v-for="(v, k) in props.items" :key="k" @click="showFinalFilter(k)">{{ k }}</li>
      </ul>
    </template>
  </FolderPanel>
  <ul v-if="'sex' === seletedFilter" class="final-filter">
    <li v-for="(v, k) in props.items.sex" :key="k" @click="onFilterItemClick('sex', v.toString())">{{ v }}</li>
  </ul>
  <ul v-if="'role' === seletedFilter" class="final-filter">
    <li v-for="(v, k) in props.items.role" :key="k" @click="onFilterItemClick('role', v.toString())">{{ v }}</li>
  </ul>
</template>

<style scoped>
ul {
  font-size: 15px;
  list-style: none;
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