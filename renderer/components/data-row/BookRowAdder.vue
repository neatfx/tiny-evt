<script setup lang="ts">
import type { IBook } from '@/db/testing/type-defs';
import { useBooksStore } from '@stores/index'
import { ref } from 'vue';

import BaseButton from '../BaseButton.vue';
import BaseInput from '../BaseInput.vue';
import FolderPanel from '../FolderPanel.vue';

const bookData: IBook = {
  name: '',
  author: '',
  categories: [],
  publishing: '',
  cover: null
}
function check(): boolean {
  if (!bookData.name || !bookData.author) return false
  return true
}

const store = useBooksStore()

function ondragover(event: any) {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
};

async function ondrop(ev: any) {
  ev.stopPropagation();
  ev.preventDefault();

  const file = ev.dataTransfer.files[0];

  try {
    if (!file) throw new Error(`Only files can be dropped here`);

    bookData.cover = file
  } catch (error) {
    console.error('' + error);
  }
}

async function addItem() {
  if (!check()) {
    console.log('invalid form')
    return
  }

  await store.add(bookData)
}
</script>

<template>
  <FolderPanel title="Add" :isInlinePanel="true">
    <template #header>
      <BaseButton>添加</BaseButton>
    </template>
    <template #body>
      <div class="panel-body">
        <div class="book-fields">
          <div class="dropzone" @dragover="ondragover" @drop="ondrop">Cover</div>
          <div class="text-fields">
            <label>
              <span>书名</span>
              <BaseInput
                type="text"
                :modelValue="bookData.name"
                @update:model-value="newValue => bookData.name = newValue"
              />
            </label>
            <label>
              <span>作者</span>
              <BaseInput
                type="text"
                :modelValue="bookData.author"
                @update:model-value="newValue => bookData.author = newValue"
              />
            </label>
            <label>
              <span>分类</span>
              <BaseInput
                type="text"
                :modelValue="bookData.categories"
                @update:model-value="newValue => bookData.categories = newValue.split(',')"
              />
            </label>
            <label>
              <span>出版社</span>
              <BaseInput
                type="text"
                :modelValue="bookData.publishing"
                @update:model-value="newValue => bookData.publishing = newValue"
              />
            </label>
          </div>
        </div>
        <BaseButton class="btn-submit" @click="addItem">保存</BaseButton>
      </div>
    </template>
  </FolderPanel>
</template>

<style scoped>
.panel-body {
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 10px;
  padding: 10px;
}
.book-fields {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-auto-flow: column;
  gap: 10px;
}
.dropzone {
  border: 2px dotted silver;
  border-radius: 5px;
  width: 130px;
  height: 190px;
  text-align: center;
}
label {
  display: grid;
  grid-template-columns: 1fr auto;
  /* border: 1px solid blue; */
  margin-bottom: 5px;
}
span {
  padding: 4px 10px 0;
  background-color: bisque;
  text-align: right;
}
input {
  border: 1px solid darkgray;
  margin-left: 5px;
}
.btn-submit {
  margin: 5px 0 0 0;
  padding: 5px 20px;
  justify-self: right;
}
</style>