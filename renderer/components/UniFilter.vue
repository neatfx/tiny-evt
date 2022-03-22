<script setup lang="ts">
import { ref } from 'vue';

import FolderPanel from './FolderPanel.vue';
import BaseButton from './BaseButton.vue';

const emit = defineEmits<{
  (e: 'filter-sex', sex: string): void
  (e: 'filter-role', sex: string): void
}>()
const props = defineProps<{
  items: Array<any>
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
      break;
    case 'role':
      emit('filter-role', filterValue)
    default:
      seletedFilter.value = ''
      break;
  }

}
</script>

<template>
  <FolderPanel title="Filter" :isInlineFixed="true" :isActionMenu="true">
    <template #header>
      <BaseButton>Filter</BaseButton>
    </template>
    <template #body>
      <ul>
        <li v-for="(k, v) in props.items" :key="k" @click="showFinalFilter(v.toString())">{{ v }}</li>
      </ul>
    </template>
  </FolderPanel>
  <ul v-if="'sex' === seletedFilter" class="final-filter">
    <li v-for="(k, v) in props.items.sex" :key="k" @click="onFilterItemClick('sex', k)">{{ k }}</li>
  </ul>
  <ul v-if="'role' === seletedFilter" class="final-filter">
    <li v-for="(k, v) in props.items.role" :key="k" @click="onFilterItemClick('role', k)">{{ k }}</li>
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
}

li:hover {
  background-color: #0070f5;
  cursor: default;
}
/*  */
.final-filter {
  position: fixed;
  background-color: aqua;
}
</style>