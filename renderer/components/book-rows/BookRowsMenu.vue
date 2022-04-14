<script setup lang="ts">
import BaseButton from '@comps/BaseButton.vue';
import FolderPanel from '@comps/FolderPanel.vue';

const props = defineProps(['hasCover']);
const emit = defineEmits<{
  (e: 'action-show-cover-uploader'): Promise<void>
  (e: 'action-delete-cover'): Promise<void>
  (e: 'action-add-note'): Promise<void>
  (e: 'action-add-to-collection'): Promise<void>
  (e: 'action-delete-book'): Promise<void>
}>()
</script>

<template>
  <FolderPanel :is-pop-menu="true" position="right">
    <template #header>
      <BaseButton class="btn-actions">{{ hasCover? '#' : '+' }}</BaseButton>
    </template>
    <template #body>
      <ul>
        <!-- <li @click="emit('action-show-more')">显示更多数据...</li> -->
        <li v-if="!hasCover" @click="emit('action-show-cover-uploader')">添加封面</li>
        <li v-if="hasCover" @click="emit('action-delete-cover')">移除封面</li>
        <li @click="emit('action-add-note')">添加借书备注...</li>
        <li @click="emit('action-delete-book')">删除书籍</li>
      </ul>
    </template>
  </FolderPanel>
</template>

<style scoped>
.btn-actions {
  background-color: #777;
}

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
  padding: 4px 15px 5px;
  /* border-color: #777; */
}

li:hover {
  background-color: #777;
  cursor: default;
}
</style>