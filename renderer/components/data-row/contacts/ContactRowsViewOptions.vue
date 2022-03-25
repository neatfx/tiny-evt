<script setup lang="ts">
import FolderPanel from '@comps/FolderPanel.vue';
import BaseButton from '@comps/BaseButton.vue';

import { useContactsStore } from '@/stores'
import { ref } from 'vue';

const store = useContactsStore()
const on = ref('on')
const off = ref('off')
function toggle(field: string) {
  switch (field) {
    case 'delete':
      store.view.delete = !store.view.delete
      break;
    case 'edit':
      store.view.edit = !store.view.edit
      break;
  }
}
</script>

<template>
  <FolderPanel :isInlinePanel="true">
    <template #header>
      <BaseButton>View</BaseButton>
    </template>
    <template #body>
      <div class="wrapper">
        <div class="controller-block">Controller</div>
        <ul>
          <li v-for="(v, k) in store.view" :key="k">
            <div :class="['status-color-base', v ? on : off]"></div>
            <BaseButton @click="toggle(k)">{{ k }}</BaseButton>
          </li>
        </ul>
        <hr>
        <div class="fields-block">Fields</div>
        <ul>
          <li v-for="(v, k) in Object.keys(store.items[0])" :key="k">
            <div :class="['status-color-base', true ? on : off]"></div>
            <BaseButton @click="toggle(v)">{{ v }}</BaseButton>
          </li>
        </ul>
      </div>
    </template>
  </FolderPanel>
</template>

<style scoped>
.wrapper {
  padding: 20px;
}
hr{
  margin: 15px 0 0;
  border:1px solid darkgrey;
}
.controller-block {
  margin: 0 0 10px 0;
}
.fields-block {
  margin: 10px 0 10px 0;
}
ul {
  display: grid;
  grid-auto-flow: column;
  gap: 10px;
  list-style: none;
  justify-content: left;
  padding: 0px;
  margin: 0px 0 0 0;
}
li {
  display: grid;
  grid-template-columns: 5px auto;
  gap: 0px;
  border: 1px solid d;
  padding: 2px;
}
.on {
  background-color: greenyellow;
}
.off {
  background-color: goldenrod;
}
</style>