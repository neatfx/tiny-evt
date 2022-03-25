<script setup lang="ts">
import FolderPanel from '@comps/FolderPanel.vue';
import BaseButton from '@comps/BaseButton.vue';

import { useContactsStore } from '@/stores'

const store = useContactsStore()

function toggle(field: string) {
  store.view.delete = !store.view.delete
}
</script>

<template>
  <FolderPanel title="Filter" :isInlinePanel="true">
    <template #header>
      <BaseButton>View</BaseButton>
    </template>
    <template #body>
      <ul class="filter-tags-wrapper">
        <li v-for="(v, k) in store.view" :key="k">
          <div class="filter-type"></div>
          <BaseButton @click="toggle(k)">{{ k }}</BaseButton>
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