<script setup lang="ts">
import FolderPanel from '@comps/FolderPanel.vue';

const props = defineProps(['rowId', 'readingStatus']);
const emit = defineEmits<{
  (e: 'mark-reading-status', readingStatus: string): void
}>()
const menuData = new Map<string, string>()
menuData.set('想读', 'wanted')
menuData.set('未读', 'not-yet')
menuData.set('在读', 'reading')
menuData.set('已读', 'read')

function mark(readingStatus: string) {
  emit('mark-reading-status', readingStatus)
}
</script>

<template>
  <FolderPanel :isPopMenu="true" position="right">
    <template #header>
      <div class="circle-wrapper">
        <div :class='["circle", readingStatus]'></div>
      </div>
    </template>
    <template #body>
      <ul v-for="key in menuData.keys()" :key="key">
        <li @click="mark(menuData.get(key))" :class="menuData.get(key)">{{ key }}</li>
      </ul>
    </template>
  </FolderPanel>
</template>

<style scoped>
.circle-wrapper {
  background-color: #777;
}

.circle {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50rem;
  margin: 10px 10px 4px;
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
  font-size: small;
  padding: 5px 15px;
}

li:hover {
  cursor: default;
}
</style>