<script setup lang="ts">
import FolderPanel from '@comps/FolderPanel.vue';
import BaseButton from "@comps/BaseButton.vue";
import { trans } from '@comps/controller-bar/translate'

const props = defineProps(['rowId', 'readingStatus']);
const emit = defineEmits<{
  (e: 'mark-reading-status', rowId: number, readingStatus: string): void
}>()
const menuData = new Map<string, string>()
menuData.set('想读', 'wanted')
menuData.set('未读', 'not-yet')
menuData.set('在读', 'reading')
menuData.set('已读', 'read')

function mark(readingStatus: string) {
  emit('mark-reading-status', props.rowId, readingStatus)
}
</script>

<template>
  <FolderPanel :isPopMenu="true">
    <template #header>
      <BaseButton :class='[readingStatus]'>{{ trans(readingStatus) }}</BaseButton>
    </template>
    <template #body>
      <ul v-for="key in menuData.keys()" :key="key">
        <li @click="mark(menuData.get(key))">{{ key }}</li>
      </ul>
    </template>
    </FolderPanel>
</template>

<style scoped>
.wanted,
.wanted:hover {
  background-color: lightskyblue;
}

.not-yet,
.not-yet:hover {
  background-color: lightcoral;
}

.reading,
.reading:hover {
  background-color: lightgoldenrodyellow;
}

.read,
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
  background-color: lightgray;
  cursor: default;
}
</style>