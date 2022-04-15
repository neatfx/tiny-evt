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
  <FolderPanel :is-inline-panel="true">
    <template #header>
      <BaseButton class="btn-actions"><span>书单</span></BaseButton>
    </template>
    <template #body>
      <ul>
        <li @click="emit('action-show-more')">显示更多数据...</li>
        <li v-if="!hasCover" @click="emit('booklist:select')">
          <span>添加封面</span>
          <div class="btn-delete" @click="deleteList(key)">
            <span class="cross"></span>
          </div>
        </li>
        <li v-if="hasCover" @click="emit('action-delete-cover')">移除封面</li>
        <li @click="emit('action-add-note')">添加借书备注...</li>
        <li @click="emit('action-delete-book')">删除书籍</li>
      </ul>
    </template>
  </FolderPanel>
</template>

<style scoped>
ul {
  font-size: 15px;
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  font-size: small;
  padding: 5px 15px 5px;
  background-color: #777;
}

li:hover {
  background-color: lightgrey;
  cursor: default;
}

.btn-delete {
  display: inline-block;
  position: relative;
  top: 2px;
  margin: 0px 10px;
  width: 15px;
  height: 15px;
  padding: 0px 0px 0px 0px;
  background-color: indianred;
  border-radius: 1em;
  text-align: center;
}

.cross {
  display: inline-block;
  position: relative;
  width: 7px;
  height: 1px;
  top: -7px;
  background-color: #555;
}
</style>