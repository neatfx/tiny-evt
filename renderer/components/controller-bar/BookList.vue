<script setup lang="ts">
import BaseButton from '@comps/BaseButton.vue';
import BaseInput from '@comps/BaseInput.vue';
import FolderPanel from '@comps/FolderPanel.vue';
import { onMounted, reactive, ref } from 'vue';
import { useBooklistsStore, useBooksStore } from '../../stores';
import { useFilter } from './filter'
import EditableText from '@comps/EditableText.vue';
import DeleteButton from '@comps/DeleteButton.vue';
import type { IBooklist } from '@/db';

const curBooklist = reactive({
  id: 0,
  name: ''
})
const booklistsStore = useBooklistsStore()
const booksStore = useBooksStore()
const currId = ref(1000)
const confirmDelete = ref(false)
const { resetFilter } = useFilter()
const emit = defineEmits<{
  (event: 'show-booklist-adder'): void
}>()

// 设置选定书单置顶显示并为 booksStore 提供过滤数据参数（ bookIds@booklist.books ）
async function selectBooklist(listID: number, list: any) {
  curBooklist.id = list.id
  curBooklist.name = list.name

  // 请求书单所包含的书籍列表
  booksStore.booklistSelected = true
  booksStore.currBooklist = Array.from(list.books)
  resetFilter()
  await booksStore.count()
  await booksStore.list()
}

async function unselectBooklist() {
  curBooklist.id = 0
  curBooklist.name = ''

  // 从书单返回书籍列表模式
  booksStore.booklistSelected = false
  booksStore.currBooklist = []
  resetFilter()
  await booksStore.count()
  await booksStore.list()
}

async function deleteBooklist(booklistId: number | undefined) {
  if (booklistId !== undefined) {
    await booklistsStore.delete(booklistId)
    confirmDelete.value = false
  }
}

async function updateBooklistName(booklistId: number, name: string) {
  console.log(booklistId, name)
  booklistsStore.update(booklistId, { name: name })
}

const booklistData: IBooklist = {
  name: '',
}

async function addBooklist() {
  await booklistsStore.add(booklistData)
}

onMounted(async () => {
  await booklistsStore.list()
  await booklistsStore.count()
})
</script>

<template>
  <div class="root-wrapper">
    <FolderPanel :is-inline-panel="true">
      <template #header>
        <BaseButton class="btn-actions">
          {{ curBooklist.name ? curBooklist.name : booklistsStore.total + ' 书单 ' }}
        </BaseButton>
      </template>
      <template #body>
        <div class="wrapper">
          <div class="adder">
            <!-- <label> -->
            <BaseInput class="adder-input" type="text" :modelValue="booklistData.name"
              @update:model-value="newValue => booklistData.name = newValue" />
            <BaseButton class="btn-submit" @click="addBooklist">创建书单</BaseButton>
            <!-- </label> -->
          </div>
          <!--  -->
          <ul class="all-list">
            <li v-for="(v, k) in booklistsStore.items" :key="k" @mouseenter="() => currId = k"
              @mouseleave="() => currId = 1000">
              <div class="booklist-info-zone" @click="selectBooklist(k, v)">
                <span v-if="curBooklist.name === v.name" class="indicator indicator-curr"></span>
                <span v-if="curBooklist.name !== v.name" class="indicator"></span>
                <span class="books-count">{{ v?.books?.size }}</span>
                <EditableText class="book-name-editable" :text="v?.name"
                  @update="(rowId, payload) => updateBooklistName(v.id, payload)">
                </EditableText>
              </div>
              <DeleteButton class="btn-delete" @click="deleteBooklist(v.id)"></DeleteButton>
            </li>
          </ul>
        </div>
      </template>
    </FolderPanel>
    <BaseButton v-if="curBooklist.name" class="btn-reset" @click="unselectBooklist">
      <span class="close">+</span>
    </BaseButton>
  </div>
</template>

<style scoped>
.root-wrapper {
  display: inline-block;
}

.wrapper {
  padding: 5px;
}

ul {
  font-size: 15px;
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  position: relative;
  display: grid;
  grid-auto-flow: column;
  justify-content: left;
  font-size: small;
  /* background-color: #777; */
  /* padding: 0 0 0 0; */
  margin-bottom: 3px;
  border-left: 3px solid #888;
}

li:last-child {
  margin-bottom: 0;
}

li:hover {
  background-color: dimgray;
  border-left: 3px solid silver;
}


.cur-list {
  padding: 2px 10px;
  font-size: small;
  margin-bottom: 5px;
  background-color: dimgrey;
}

.booklist-info-zone {
  display: inline-grid;
  grid-auto-flow: column;
  background-color: #888;
}

.indicator {
  width: 5px;
  height: 5px;
  margin: 5px 0 0 5px;
  background-color: silver;
}

.indicator-curr {
  background-color: chartreuse;
}

.books-count {
  padding: 4px 15px 4px 5px;
  text-align: center;
  /* background-color: #aaa; */
}

.btn-delete {
  background-color: #888;
}

.btn-delete:hover {
  background-color: darkgray;
}

.close {
  font-size: small;
  display: inline-block;
  transform: rotate(45deg);
}

/*  */

.adder {
  margin-bottom: 5px;
}

.booklist-name {
  font-size: small;
  padding: 2px 5px 0;
  background-color: dimgray;
}

.adder-input,
.adder-input:focus {
  display: inline-block;
  width: 150px;
  vertical-align: middle;
  outline: none;
  font-size: small;
  height: auto;
  padding: 8px;
  background-color: #999;
}

/*  */

.btn-submit {
  vertical-align: middle;
  padding: 6px 10px;
  background-color: darkgray;
  margin-left: 5px;
}

.btn-submit:hover {
  background-color: cornflowerblue;
}

.btn-reset {
  background-color: gray;
}
</style>