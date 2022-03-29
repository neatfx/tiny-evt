<script setup lang="ts">
import { useBooksStore } from '@stores/index'
import { reactive } from 'vue';

import BaseButton from '../BaseButton.vue';
import FolderPanel from '../FolderPanel.vue';

export type IFormFields = {
  friendName: String;
  friendAge: Number;
}
const state: IFormFields = {
  friendName: 'someone',
  friendAge: 21,
}
const data = reactive({

})
const store = useBooksStore()

async function addItem(data: any) {
  await store.add('test-book-name', 'neatfx', ['计算机技术', '前端开发'], 'Future Publishing Room')
}
</script>

<template>
  <FolderPanel title="Add" :isInlinePanel="true">
    <template #header>
      <BaseButton>添加</BaseButton>
    </template>
    <template #body>
      <div class="panel-body">
        <label class="field-name">
          书名:
          <input v-model="state.friendName" type="text" />
        </label>
        <br />
        <label>
          作者:
          <input v-model="state.friendAge" type="text" />
        </label>
        <label>
          分类:
          <input v-model="state.friendAge" type="text" />
        </label>
        <label>
          出版社:
          <input v-model="state.friendAge" type="text" />
        </label>
        <br />
        <BaseButton class="btn-submit" @click="addItem(state)">保存</BaseButton>
      </div>
    </template>
  </FolderPanel>
</template>

<style scoped>
.panel-body {
  padding: 20px;
}
.btn-submit {
  margin-top: 15px;
}
</style>