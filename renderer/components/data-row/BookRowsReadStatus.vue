<script setup lang="ts">
import FolderPanel from '@comps/FolderPanel.vue';
import BaseButton from "@comps/BaseButton.vue";

const props = defineProps(['rowId', 'read']);
const emit = defineEmits<{
  (e: 'mark-read', rowId: number, read: boolean | undefined): void
}>()

const menuData = new Map<string, boolean>()
menuData.set('已读', true)
menuData.set('未读', false)

function mark(read: boolean | undefined) {
  emit('mark-read', props.rowId, read)
}
</script>

<template>
  <FolderPanel :isPopMenu="true">
    <template #header>
      <BaseButton v-if="read" class="read">已读</BaseButton>
      <BaseButton v-else-if="!read">未读</BaseButton>
    </template>
    <template #body>
      <ul v-for="key in menuData.keys()" :key="key">
        <li @click="mark(menuData.get(key))">{{ key }}</li>
      </ul>
    </template>
  </FolderPanel>
</template>

<style scoped>
.read {
  background-color:lightgreen;
}
.read:hover {
  background-color: lightgreen;
}
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