<script setup lang="ts">
import BaseButton from '@comps/BaseButton.vue';
import FolderPanel from '@comps/FolderPanel.vue';
import { onMounted, reactive, ref } from 'vue';
import { useBooklistsStore, useBooksStore } from '../../stores';
import { useFilter } from './filter'
import EditableText from '../EditableText.vue';
import DeleteButton from '../DeleteButton.vue';

const curBooklist = reactive({
  id: 0,
  name: ''
})
const booklistsStore = useBooklistsStore()
const booksStore = useBooksStore()
const currId = ref(1000)
const confirmDelete = ref(false)
const { workingFilters, resetFilter } = useFilter()
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

onMounted(async () => {
  await booklistsStore.list()
  await booklistsStore.count()
})
</script>

<template>
  <div class="root-wrapper">
    <BaseButton class="btn-reset" @click="booksStore.showBooklistAdder = !booksStore.showBooklistAdder">
      {{ booksStore.showBooklistAdder ? '^' : '+' }}
    </BaseButton>
    <FolderPanel :is-inline-panel="true">
      <template #header>
        <BaseButton class="btn-actions">
          {{ curBooklist.name ? curBooklist.name : booklistsStore.total + ' 书单 ' }}
        </BaseButton>
      </template>
      <template #body>
        <div class="wrapper">
          <ul class="all-list">
            <li v-for="(v, k) in booklistsStore.items" :key="k" @mouseenter="() => currId = k"
              @mouseleave="() => currId = 1000">
              <div class="booklist-wrapper">
                <div class="booklist-name-zone" @click="selectBooklist(k, v)">
                  <span v-if="curBooklist.name === v.name" class="indicator indicator-curr"></span>
                  <span v-if="curBooklist.name !== v.name" class="indicator"></span>
                  <span class="list-books-count">{{ '共 ' + v?.books?.size + ' 本' }}</span>
                  <EditableText :text="v?.name" @update="(rowId, payload) => updateBooklistName(v.id, payload)">
                  </EditableText>
                </div>
                <DeleteButton class="btn-delete" @click="deleteBooklist(v.id)"></DeleteButton>
              </div>
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

.btn-actions {
  background-color: #888;
}

ul {
  font-size: 15px;
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  position: relative;
  font-size: small;
  background-color: #777;
  cursor: default;
  padding: 2px 2px 0 5px;
}

li:last-child {
  padding-bottom: 2px;
}

li:hover {
  background-color: dimgray;
}


.cur-list {
  padding: 2px 10px;
  font-size: small;
  margin-bottom: 5px;
  background-color: #777;
}

.indicator {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 0 5px 0 0;
  background-color: dimgray;
}

.indicator-curr {
  background-color: greenyellow;
}

.booklist-wrapper {
  /* padding: 0px 0 2px; */
  /* border: 1px solid lawngreen; */
}

.list-books-count {
  display: inline-block;
  padding: 3px 5px 4px;
  background-color: #888;
}

.booklist-name-zone {
  display: inline-block;
  margin: 0px 2px 0 0;
  /* padding: 5px 0; */
  /* border: 1px solid blue; */
}

.btn-delete {
  display: inline-block;
  padding: 3px 10px 5px;
  background-color: cornflowerblue;
}

.close {
  font-size: small;
  display: inline-block;
  transform: rotate(45deg);
}
</style>