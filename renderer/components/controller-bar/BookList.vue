<script setup lang="ts">
import BaseButton from '@comps/BaseButton.vue';
import FolderPanel from '@comps/FolderPanel.vue';
import { reactive, ref } from 'vue';

const props = defineProps(['hasCover']);
const emit = defineEmits<{
  (e: 'booklist:select'): Promise<void>
  (e: 'booklist:delete'): Promise<void>
}>()
const curBooklist = reactive({
  id: 0,
  name: ''
})

function selectBooklist(listID: number, name: string) {
  console.log(listID, name)
  // 设置选定书单置顶显示
  curBooklist.id = listID
  curBooklist.name = name
  // emit('booklist:select')
}

function deleteBooklist() {
  // console.log('ss')
  curBooklist.id = 0
  curBooklist.name = ''
  emit('booklist:delete')
}
</script>

<template>
  <FolderPanel :is-inline-panel="true">
    <template #header>
      <BaseButton class="btn-actions"><span>书单</span></BaseButton>
    </template>
    <template #body>
      <!-- 当前书单 -->
      <ul v-if="curBooklist.name" class="cur-list">
        <li @click="">{{ curBooklist.name }}</li>
      </ul>
      <!-- 动态列表 -->
      <ul class="all-list">
        <li @click="">书单-1</li>
        <li v-if="!hasCover">
          <span @click="selectBooklist(2, '书单-2')">书单-2</span>
          <div class="btn-delete" @click="deleteBooklist">
            <span class="cross"></span>
          </div>
        </li>
        <li @click="">书单-3</li>
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
.cur-list{
  border-bottom: 2px solid dimgray;
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