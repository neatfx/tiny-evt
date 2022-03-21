<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

import FolderPanel from './FolderPanel.vue';
import BaseButton from './BaseButton.vue';
import type { IndexableTypeArray } from 'dexie';

const emit = defineEmits<{
  (e: 'filter-sex', sex: string): void
}>()

const props = defineProps<{
  items: IndexableTypeArray
}>()

onMounted(() => {
  console.log(props.items)
})
</script>

<template>
  <FolderPanel title="Filter" :isInlineFixed="true" :isActionMenu="true">
    <template #header>
      <BaseButton>Sex Filter</BaseButton>
    </template>
    <template #body>
      <ul v-for="item in props.items" :key="item.toString">
        <li @click="emit('filter-sex', item.toString())">{{ item }}</li>
      </ul>
    </template>
  </FolderPanel>
</template>

<style scoped>
ul {
  font-size: 15px;
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  padding: 5px 10px;
}

li:hover {
  background-color: #0070f5;
  cursor: default;
}
</style>