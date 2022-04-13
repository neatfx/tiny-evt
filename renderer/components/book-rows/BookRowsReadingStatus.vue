<script setup lang="ts">
import FolderPanel from '@comps/FolderPanel.vue';

const props = defineProps(['rowId', 'readingStatus']);
const emit = defineEmits<{
  (e: 'mark-reading-status', rowId: number, readingStatus: string): Promise<void>
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
  <FolderPanel :isPopMenu="true" position="right">
    <template #header>
      <div :class='["circle", readingStatus]'></div>
    </template>
    <template #body>
      <ul v-for="key in menuData.keys()" :key="key">
        <li @click="mark(menuData.get(key))">{{ key }}</li>
      </ul>
    </template>
  </FolderPanel>
</template>

<style scoped>
.circle {
  width: 5px;
  height: 29px;
}

.wanted {
  background-color: lightskyblue;
}

.not-yet {
  background-color: coral;
}

.reading {
  background-color: yellow;
}

.read {
  background-color: chartreuse;
}

ul {
  font-size: 15px;
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  padding: 5px 15px;
  background-color: dimgray;
  /* border: 1px solid #666; */
  /* margin-top: -1px; */
}

li:hover {
  background-color: grey;
  cursor: default;
}
</style>