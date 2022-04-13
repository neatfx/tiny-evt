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
  cover: null,
  created: new Date()
}
function check(): boolean {
  if (!bookData.name || !bookData.author) return false
  return true
}

const store = useBooksStore()
const imgSrc = ref(false)

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
    imgSrc.value = true
    document.querySelector("img")?.setAttribute('src', URL.createObjectURL(file))
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
  imgSrc.value = false
}
</script>

<template>
  <FolderPanel title="Add" :isInlinePanel="true" position="right">
    <template #header>
      <BaseButton>+</BaseButton>
    </template>
    <template #body>
      <div class="panel-body-wrapper">
        <div class="book-fields">
          <div class="dropzone" @dragover="ondragover" @drop="ondrop">
            <span v-if="!imgSrc">封面</span>
            <img />
          </div>

          <div class="text-fields">
            <label>
              <span>书名</span>
              <BaseInput type="text" :modelValue="bookData.name"
                @update:model-value="newValue => bookData.name = newValue" />
            </label>
            <label>
              <span>作者</span>
              <BaseInput type="text" :modelValue="bookData.author"
                @update:model-value="newValue => bookData.author = newValue" />
            </label>
            <label>
              <span>分类</span>
              <BaseInput type="text" :modelValue="bookData.categories"
                @update:model-value="newValue => bookData.categories = newValue.split(',')" />
            </label>
            <label>
              <span>出版社</span>
              <BaseInput type="text" :modelValue="bookData.publishing"
                @update:model-value="newValue => bookData.publishing = newValue" />
            </label>
          </div>
        </div>
        <BaseButton class="btn-submit" @click="addItem">保存</BaseButton>
      </div>
    </template>
  </FolderPanel>
</template>

<style scoped>
.panel-body-wrapper {
  display: grid;
  gap: 10px;
  padding: 15px;
}

.book-fields {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-auto-flow: column;
  gap: 15px;
}

.dropzone {
  border: 2px dotted silver;
  border-radius: 5px;
  width: 130px;
  height: 190px;
  text-align: center;
}

img {
  width: 130px;
}

label {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-auto-flow: column;
  /* gap: 15px; */
  /* border: 1px solid blue; */
  margin-bottom: 10px;
}

span {
  padding: 5px 10px 5px;
  background-color: bisque;
  text-align: right;
}

input {
  border: 1px solid darkgray;
  margin-left: 5px;
  vertical-align: middle;
  font-size: small;
  padding: 5px 0 5px;
  /* margin-top: 2px; */

}

.btn-submit {
  margin: 5px 0 0 0;
  padding: 5px 20px;
  justify-self: right;
}
</style>