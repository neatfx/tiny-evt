<script setup lang="ts">
import BaseButton from '@comps/BaseButton.vue';
import FolderPanel from '@comps/FolderPanel.vue';

const props = defineProps(['rowId', 'readingStatus']);
const emit = defineEmits<{
  (e: 'mark-reading-status', rowId: number, readingStatus: string): Promise<void>
}>()
const menuData = new Map<string, string>()
menuData.set('删除数据', 'wanted')
menuData.set('添加封面图片', 'not-yet')
menuData.set('删除封面图片', 'reading')
menuData.set('展开更多信息', 'read')

function mark(readingStatus: string) {
  emit('mark-reading-status', props.rowId, readingStatus)
}
</script>

<template>
  <FolderPanel :is-inline-panel="true" position="right">
    <template #header>
      <BaseButton class="btn-actions">+ </BaseButton>
    </template>
    <template #body>
      <ul v-for="key in menuData.keys()" :key="key">
        <li @click="mark(menuData.get(key))">{{ key }}</li>
      </ul>
    </template>
  </FolderPanel>
</template>

<style scoped>
.btn-actions, .btn-actions:hover{
  background-color: #777;
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
  background-color: #777;
  cursor: default;
}
</style>