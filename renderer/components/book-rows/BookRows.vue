<script setup lang="ts">
import router from '@/router'
import { useBooksStore } from '@/stores'
import { ref } from 'vue'

import { vContextMenu, useContextMenu } from '@comps/contextMenu'
import EditableText from '@comps/EditableText.vue'
import BaseButton from '@comps/BaseButton.vue';
import { useFilter } from '@comps/controller-bar/filter'

import BaseDataRows from './BaseRows.vue'
import BookRowsLendStatus from './BookRowsLendStatus.vue'
import BookRowsName from './BookRowsName.vue'
import BookRowsTags from './BookRowsTags.vue'
import ContextMenu from "./BookRowsContextMenu.vue"

const props = defineProps(['items'])
const store = useBooksStore()
const { targetId } = useContextMenu();
const currentUpdateField = ref('')
const { filter } = useFilter()

function openDetail(rowId: number | undefined) {
  router.push('/data-row-detail/' + rowId)
}

async function updateField(rowId: number, payload: string) {
  let obj: { [key: string]: string } = {}

  obj[currentUpdateField.value] = payload

  await store.update(rowId, obj)

  currentUpdateField.value = ''
}

async function updateLend(rowId: number, note: string) {
  store.update(rowId, {
    lend: note
  })
}

async function markReadingStatus(rowId: number, readingStatus: string) {
  store.update(rowId, {
    readingStatus: readingStatus
  })
}

async function updateCover(rowId: number, cover: File | undefined) {
  store.updateCover(rowId, cover)
}

async function updateTag(rowId: number, tags: string[]) {
  store.update(rowId, {
    categories: tags
  })
}

async function deleteItem(key: number | undefined) {
  if (key) await store.delete(key)
}

function openDouban(url: string) {
  console.log(url)
  window.open(url, '_blank') // 新窗口打开外链接
}

function formmatId(rowId: number) {
  if (rowId < 10) return '000' + rowId
  if (rowId >= 10 && rowId < 100) return '00' + rowId
  if (rowId >= 100 && rowId < 1000) return '0' + rowId
}

async function recoverBook(bookId: number) {
  await store.update(bookId, { deleted: false })
}

async function hardDeleteBook(bookId: number) {
  await store.delete(bookId, true)
}
</script>

<template>
  <BaseDataRows :items="props.items">
    <template
      #item="{ id, name, author, categories, publishing, published, cover, lend, readingStatus, douban, booklists, deleted }">
      <div class="row" v-context-menu="id">
        <!-- 恢复（仅在书籍处于已删除状态，回收站界面可见） -->
        <BaseButton v-if="deleted" class="btn-recover" @click="recoverBook(id)">恢复
        </BaseButton>

        <BaseButton v-if="deleted" class="btn-recover" @click="hardDeleteBook(id)">彻底删除
        </BaseButton>
        <!-- ID（数据库主键） -->
        <div v-if="store.view.fields.id" class="id">{{ formmatId(id) }}</div>
        <!-- 借阅状态 -->
        <BookRowsLendStatus v-if="store.view.fields.lend" :lend="lend" :rowId="id" @update-lend:reset="updateLend"
          @update-lend:add="updateLend"></BookRowsLendStatus>
        <!-- 书名（常用操作菜单、阅读状态、书名、书单） -->
        <BookRowsName :cover="cover" :rowId="id" :name="name" :isName="() => true" :readingStatus="readingStatus"
          :booklists="booklists" :viewOption="store.view" @update="(rowId, payload) => {
            currentUpdateField = 'name'
            updateField(rowId, payload)
          }" @update-cover="updateCover" @mark-reading-status="markReadingStatus" @add-lend-note="updateLend"
          @delete-book="deleteItem(id)">
        </BookRowsName>
        <BaseButton v-if="douban && store.view.fields.douban" class="douban" @click="openDouban(douban)">豆</BaseButton>
        <!-- 作者 -->
        <div v-if="store.view.fields.author">
          <BaseButton class="prefix-field-icon-filter" @dblclick="filter('author', author)">作者</BaseButton>
          <EditableText :rowId="id" :text="author || '---'" @update="(rowId, payload) => {
            currentUpdateField = 'author'
            updateField(rowId, payload)
          }"></EditableText>
        </div>
        <!-- 出版社 -->
        <div v-if="store.view.fields.publishing">
          <BaseButton class="prefix-field-icon-filter" @dblclick="filter('publishing', publishing)">出版发行</BaseButton>
          <EditableText :rowId="id" :text="publishing || '---'" @update="(rowId, payload) => {
            currentUpdateField = 'publishing'
            updateField(rowId, payload)
          }"></EditableText>
        </div>
        <!-- 出版时间 -->
        <div v-if="store.view.fields.published">
          <BaseButton class="prefix-field-icon-filter">版次</BaseButton>
          <EditableText :rowId="id" :text="published || '---'" @update="(rowId, payload) => {
            currentUpdateField = 'published'
            updateField(rowId, payload)
          }"></EditableText>
        </div>
        <BookRowsTags v-if="store.view.fields.categories" :categories="categories" :rowId="id"
          @update-tag:add="updateTag" @update-tag:delete="updateTag"></BookRowsTags>
      </div>
    </template>
  </BaseDataRows>
  <ContextMenu @view="openDetail(targetId)" @delete="deleteItem(targetId)">
  </ContextMenu>
</template>

<style scoped>
.row {
  display: grid;
  grid-template-columns: auto;
  grid-auto-flow: column;
  justify-content: left;
  gap: 5px;
}

.id {
  text-align: center;
  padding: 3px 10px 4px 8px;
  margin: 0 2px;
  color: #333;
  background-color: slategrey;
  border-radius: 50rem 50rem 50rem 0;
}

.btn-recover {
  margin-left: 3px;
  background-color: chocolate;
  border-radius: 50rem 50rem 50rem 0;
}

.prefix-field-icon-filter,
.prefix-field-icon-filter:hover {
  background-color: #888;
  margin-right: 0;
  border-radius: 1rem 0 0 0;
}

.douban,
.douban:hover {
  border-radius: 50rem 50rem 50rem 0;
  background-color: limegreen;
}

.btn-delete {
  justify-self: right;
}
</style>