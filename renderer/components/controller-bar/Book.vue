<script setup lang="ts">
import { ref } from 'vue';
import type { IBook } from '@/db';
import { useBooksStore } from '@stores/index'

import BaseButton from '../BaseButton.vue';
import BaseInput from '../BaseInput.vue';
import FolderPanel from '../FolderPanel.vue'

const booksStore = useBooksStore()
const imgSrc = ref(false)
const fullMode = ref(false)
const bookData: IBook = {
  name: '',
  cover: undefined,
  author: '',
  readingStatus: 'read',
  categories: [],
  publishing: '',
  published: '',
}

function check(): boolean {
  if (!bookData.name) return false
  return true
}

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

  await booksStore.add(bookData)
  imgSrc.value = false
}
</script>

<template>
  <FolderPanel :is-inline-panel="true">
    <template #header>
      <BaseButton class="btn-book-info">{{ booksStore.totalFixed + '书籍' }}</BaseButton>
    </template>
    <template #body>
      <div class="panel-body-wrapper">
        <!-- 书籍 - 模式切换 -->
        <BaseButton class="btn-mode" @click="fullMode = !fullMode">{{
          fullMode ? '模式 > 标准' :
            '模式 > 快速'
        }}
        </BaseButton>
        <!-- 书籍 - 快速模式 -->
        <label v-if="!fullMode">
          <span>书名</span>
          <BaseInput type="text" :modelValue="bookData.name"
            @update:model-value="newValue => bookData.name = newValue" />
        </label>
        <!-- 书籍 - 标准模式 -->
        <div v-if="fullMode" class="full-mode">
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
              <BaseInput type="text" :modelValue="bookData.published"
                @update:model-value="newValue => bookData.published = newValue" />
            </label>
          </div>
        </div>
        <!-- 提交保存 -->
        <div class="submit">
          <BaseButton class="btn-submit" @click="addItem">添加书籍</BaseButton>
        </div>
      </div>
    </template>
  </FolderPanel>
</template>

<style scoped>
.panel-body-wrapper {
  padding: 5px;
  border-bottom: none;
}

.btn-mode {
  margin-bottom: 5px;
}
.btn-mode:hover {
  margin-bottom: 5px;
  background-color: dimgray;
}

.full-mode {
  display: grid;
  grid-template-columns: 150px 232px auto;
  gap: 10px;
}

.dropzone {
  /* height: 190px; */
  text-align: center;
  background-color:darkslategray;
  /* border: 1px solid red; */
}

.tip {
  position: relative;
  top: 50px;
  padding: 5px 10px;
  /* background-color: cadetblue; */
}

img {
  width: 150px;
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
  padding: 5px 10px;
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
.submit {
  margin-top: 5px;
}

.btn-submit {
  padding: 6px 20px;
  background-color:darkgray;
}

.btn-submit:hover {
  background-color: cornflowerblue;
}
</style>