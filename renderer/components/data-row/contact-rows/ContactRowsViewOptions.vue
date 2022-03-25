<script setup lang="ts">
import { onMounted } from 'vue';

import FolderPanel from '../../FolderPanel.vue';
import BaseButton from '../../BaseButton.vue';
import type { IndexableTypeArray } from 'dexie';

const emit = defineEmits<{
  (e: 'filter-sex', sex: string): void
}>()

const props = defineProps<{
  items: IndexableTypeArray
}>()

const items = {
  field_1: 'field_1',
  field_2: 'field_2',
  field_3: 'field_3',
  field_4: 'field_4',
  field_5: 'field_5',

}

onMounted(() => {
  // console.log(props.items)
})
</script>

<template>
  <FolderPanel title="Filter" :isInlineFixed="true" :isActionMenu="false">
    <template #header>
      <BaseButton>View</BaseButton>
    </template>
    <template #body>
      <ul class="filter-tags-wrapper">
        <li v-for="(v, k) in items" :key="k">
          <div class="filter-type"></div>
          <div class="filter-value">{{ v }}</div>
        </li>
      </ul>
    </template>
  </FolderPanel>
</template>

<style scoped>
.filter-tags-wrapper {
  display: grid;
  /* grid-auto-flow: column; */
  gap: 10px;
  list-style: none;
  justify-content: left;
  padding: 10px;
  margin: 0px 0 0 0;
}
li {
  display: grid;
  grid-template-columns: 3px auto;
  gap: 2px;
  border: 1px solid d;
  padding: 2px;
}
.filter-type {
  /* margin-right: 5px; */
  background-color: greenyellow;
}
.filter-value {
  padding: 0px 15px;
  background-color: gainsboro;
}
</style>