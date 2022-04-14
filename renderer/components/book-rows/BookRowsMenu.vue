<script setup lang="ts">
import BaseButton from '@comps/BaseButton.vue';
import FolderPanel from '@comps/FolderPanel.vue';

const props = defineProps(['hasCover']);
const emit = defineEmits<{
  (e: 'action-show-cover-uploader'): Promise<void>
  (e: 'action-delete-cover'): Promise<void>
  (e: 'action-delete-book'): Promise<void>
}>()
const menuData = new Map<string, string>()
if (props.hasCover === 'f') menuData.set('添加封面', 'action-show-cover-uploader')
if (props.hasCover === 't') menuData.set('删除封面', 'action-delete-cover')
// menuData.set('显示更多数据', 'read')
menuData.set('删除书籍', 'action-delete-book')
</script>

<template>
  <FolderPanel :is-pop-menu="true" position="right">
    <template #header>
      <BaseButton class="btn-actions">+ </BaseButton>
    </template>
    <template #body>
      <ul v-for="key in menuData.keys()" :key="key">
        <li @click="emit(menuData.get(key))">{{ key }}</li>
      </ul>
    </template>
  </FolderPanel>
</template>

<style scoped>
.btn-actions,
.btn-actions:hover {
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