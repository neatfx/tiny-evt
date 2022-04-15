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
  <FolderPanel :is-inline-panel="true" position="right">
    <template #header>
      <BaseButton class="btn-actions">#</BaseButton>
    </template>
    <template #body>
      <ul>
        <li @click="emit('')"><span class="mark-select"></span>2021年度最佳非虚构作品</li>
        <li @click="emit('action-remove-from-booklist')"><span class="mark-select"></span>科幻经典</li>
        <li @click="emit('')"><span class="mark-select"></span>Rust 编程语言系列</li>
      </ul>
      <div class="lists">
        <BaseButton class="btn-actions">添加至书单 ></BaseButton>
      </div>
    </template>
  </FolderPanel>
</template>

<style scoped>
.mark-select {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 0 10px 0 0;
  background-color: chartreuse;
}
.lists{
  display: grid;
  grid-template-columns: auto;
  grid-auto-flow: column;
  gap: 5px;
  padding: 5px;
}
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
  background-color: #777;
}

li:hover {
  background-color: #777;
  cursor: default;
}
</style>