<script setup lang="ts">
import router from '@/router'
import { useBooksStore } from '@/stores'
import { ref } from 'vue'

import BaseDataRows from './BaseRows.vue'
import DeleteButton from '@comps/DeleteButton.vue'
import ContextMenu from "./BookRowsContextMenu.vue"
import { vContextMenu, useContextMenu } from '@comps/contextMenu'
import BookRowsTags from './BookRowsTags.vue'
import EditableText from '@comps/EditableText.vue'
import BookRowsLendStatus from './BookRowsLendStatus.vue'
import BookRowsName from './BookRowsName.vue'
import BaseButton from '../BaseButton.vue';

const props = defineProps(['items'])
const store = useBooksStore()
const { targetId } = useContextMenu();
const currentUpdateField = ref('')

function openDetail(rowId: number | undefined) {
  router.push('/data-row-detail/' + rowId)
}

async function updateField(rowId: number, payload: string) {
  let obj: { [key: string]: string } = {}

  obj[currentUpdateField.value] = payload

  await store.update(rowId, obj)

  currentUpdateField.value = ''
}

async function updateLend(rowId: number, info: string) {
  store.updateTest(rowId, {
    lend: info
  })
}

async function markReadingStatus(rowId: number, readingStatus: string) {
  store.updateTest(rowId, {
    readingStatus: readingStatus
  })
}

async function updateCover(rowId: number, cover: File | undefined) {
  store.updateTest(rowId, {
    cover: cover
  })
}

async function updateTag(rowId: number, tags: string[]) {
  store.updateTest(rowId, {
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
</script>

<template>
  <BaseDataRows :items="props.items">
    <template #item="{ id, name, author, categories, publishing, published, cover, lend, readingStatus, douban }">
      <div class="row" v-context-menu="id">
        <div v-if="store.view.fields.id" class="id">{{ (id < 9) ? ('0' + id) : id }}</div>
            <BookRowsLendStatus v-if="store.view.fields.lend" :lend="lend" :rowId="id" @update-lend:reset="updateLend"
              @update-lend:add="updateLend"></BookRowsLendStatus>
            <BookRowsName v-if="store.view.fields.name" :cover="cover" :rowId="id" :name="name" :isName="() => true"
              :readingStatus="readingStatus" @update="(rowId, payload) => {
                currentUpdateField = 'name'
                updateField(rowId, payload)
              }" @update-cover="updateCover" @mark-reading-status="markReadingStatus"></BookRowsName>
            <BaseButton @click="openDouban(douban)">豆瓣</BaseButton>
            <EditableText v-if="store.view.fields.author" :rowId="id" :text="author || '-- 作者 --'" @update="(rowId, payload) => {
              currentUpdateField = 'author'
              updateField(rowId, payload)
            }"></EditableText>
            <EditableText v-if="store.view.fields.publishing" :rowId="id" :text="publishing || '-- 出版社 --'" @update="(rowId, payload) => {
              currentUpdateField = 'publishing'
              updateField(rowId, payload)
            }"></EditableText>
            <EditableText v-if="store.view.fields.published" :rowId="id" :text="published || '-- 出版时间 --'" @update="(rowId, payload) => {
              currentUpdateField = 'published'
              updateField(rowId, payload)
            }"></EditableText>
            <BookRowsTags v-if="store.view.fields.categories" :categories="categories" :rowId="id"
              @update-tag:add="updateTag" @update-tag:delete="updateTag"></BookRowsTags>
            <DeleteButton v-if="store.view.control.delete" @click="deleteItem(id)"></DeleteButton>
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
  padding: 3px 10px 4px;
  margin: 0 2px;
  background-color: slategrey;
}
</style>