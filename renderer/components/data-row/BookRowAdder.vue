<script setup lang="ts">
import { useBooksStore } from '@stores/index'
import { ref } from 'vue';

import BaseButton from '../BaseButton.vue';
import BaseInput from '../BaseInput.vue';
import FolderPanel from '../FolderPanel.vue';

const bookData = ref({
  name: '',
  author: '',
  categories: [],
  publishing: ''
})
const store = useBooksStore()

async function addItem(data: any) {
  console.log(bookData.value)
  // await store.add('test-book-name', 'neatfx', ['计算机技术', '前端开发'], 'Future Publishing Room')
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
          <BaseInput
            type="text"
            :modelValue="bookData.name"
            @update:model-value="newValue => bookData.name = newValue"
          />
        </label>
        <label>
          作者:
          <BaseInput
            type="text"
            :modelValue="bookData.author"
            @update:model-value="newValue => bookData.author = newValue"
          />
        </label>
        <label>
          分类:
          <BaseInput
            type="text"
            :modelValue="bookData.categories"
            @update:model-value="newValue => bookData.categories = newValue"
          />
        </label>
        <label>
          出版社:
          <BaseInput
            type="text"
            :modelValue="bookData.publishing"
            @update:model-value="newValue => bookData.publishing = newValue"
          />
        </label>
        <BaseButton class="btn-submit" @click="addItem">保存</BaseButton>
      </div>
    </template>
  </FolderPanel>
</template>

<style scoped>
.panel-body {
  padding: 20px;
}
label {
  display: block;
  margin: 5px 0;
}
input {
  border: 1px solid darkgray;
  /* padding: 15px; */
  margin-left: 20px;
}
input:last-child {
  /* margin-left: 0; */
}
.btn-submit {
  margin-top: 0px;
}
</style>