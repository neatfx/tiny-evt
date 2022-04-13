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
  <div class="panel-body-wrapper">
    <div class="book-fields">
      <div class="dropzone" @dragover="ondragover" @drop="ondrop">
        <span v-if="!imgSrc" class="tip">拖放图片至此区域</span>
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
        <label>
          <span>出版时间</span>
          <BaseInput type="text" :modelValue="bookData.name"
            @update:model-value="newValue => bookData.name = newValue" />
        </label>
      </div>
      <div>
        <BaseButton class="btn-submit" @click="addItem">添加</BaseButton>
      </div>

    </div>

  </div>
</template>

<style scoped>
.panel-body-wrapper {
  display: grid;
  grid-template-rows: auto;
  gap: 10px;
  padding: 10px;
  border: 2px solid dimgray;
  justify-content: left;
}

.book-fields {
  display: grid;
  grid-auto-flow: column;
  gap: 10px;
}

.dropzone {
  width: 150px;
  height: 190px;
  text-align: center;
  background-color: slategray;
  /* border: 1px solid red; */
}

.tip {
  position: relative;
  top: 50px;
  padding: 5px 10px;
  background-color: cadetblue;
}

/*  */

.text-fields {
  display: grid;
  gap: 3px;
  /* border: 1px solid red; */
}

label {
  display: grid;
  grid-template-columns: 80px 150px;
  grid-auto-flow: column;
  /* gap: 2px; */
  text-align: center;
}

span {
  font-size: small;
  padding: 8px 10px 0px;
  background-color: dimgray;
}

input,
input:focus {
  vertical-align: middle;
  outline: none;
  border: 3px solid dimgray;
  font-size: small;
  height: auto;
}

/*  */
.btn-submit {
  padding: 6px 20px;
}
</style>