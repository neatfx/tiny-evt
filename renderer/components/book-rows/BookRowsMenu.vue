<script setup lang="ts">
import BaseButton from '@comps/BaseButton.vue';
import FolderPanel from '@comps/FolderPanel.vue';
import { computed } from 'vue';

const props = defineProps(['hasCover']);
const emit = defineEmits<{
  (e: 'action-show-cover-uploader'): Promise<void>
  (e: 'action-delete-cover'): Promise<void>
  (e: 'action-delete-book'): Promise<void>
}>()
const menuData = new Map<string, string>()
menuData.set('添加封面', 'action-show-cover-uploader')
menuData.set('移除封面', 'action-delete-cover')
// menuData.set('显示更多数据', 'read')
menuData.set('删除本书', 'action-delete-book')

const computedMenu = computed(() => {
  if (props.hasCover === 't') {
    menuData.delete('添加封面')
    menuData.set('移除封面', 'action-delete-cover')
  } else {
    menuData.delete('移除封面')
    menuData.set('添加封面', 'action-show-cover-uploader')
  }

  return menuData
})
</script>

<template>
  <FolderPanel :is-pop-menu="true" position="right">
    <template #header>
      <BaseButton class="btn-actions">+ </BaseButton>
    </template>
    <template #body>
      <ul v-for="key in computedMenu.keys()" :key="key">
        <li @click="emit(computedMenu.get(key))">{{ key }}</li>
      </ul>
    </template>
  </FolderPanel>
</template>

<style scoped>
.btn-actions{
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