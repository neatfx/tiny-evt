<script setup lang="ts">
import router from '@/router'
import { useBooksStore } from '@/stores'
import { ref } from 'vue'

import BaseDataRows from './BaseRows.vue'
import BookRowsReadStatus from './BookRowsReadStatus.vue'
import DeleteButton from '@comps/DeleteButton.vue'
import ContextMenu from "./RowsContextMenu.vue"
import { vContextMenu, useContextMenu } from '@comps/contextMenu'
import BookRowsInlineTags from './BookRowsInlineTags.vue'
import EditableText from '@comps/EditableText.vue'
import BookRowsLendStatus from './BookRowsLendStatus.vue'
import BookRowsFieldName from './BookRowsFieldName.vue'

const props = defineProps(['items'])
const store = useBooksStore()
const { targetId } = useContextMenu();
const currentUpdateField = ref('')

function openDetail(rowId: number | undefined) {
  router.push('/data-row-detail/' + rowId)
}

async function updateItem(rowId: number, payload: string) {
  console.log(rowId, payload)
  let obj: { [key: string]: string } = {}

  obj[currentUpdateField.value] = payload

  await store.update(rowId, obj)
  currentUpdateField.value = ''
}

async function deleteItem(key: number | undefined) {
  if (key) await store.delete(key)
}

async function addTag(rowId: number, tags: string[]) {
  console.log(rowId, tags)
  store.updateTest(rowId, {
    categories: tags
  })
}

async function deleteTag(tags: string[], rowId: number) {
  store.updateTest(rowId, {
    categories: tags
  })
}

async function deleteLend(rowId: number) {
  store.updateTest(rowId, {
    lend: undefined
  })
}

async function addLend(rowId: number, info: string) {
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
</script>

<template>
  <BaseDataRows :items="props.items">
    <template #item="{ id, name, author, categories, publishing, published, cover, lend, readingStatus }">
      <div v-context-menu="id">
        <div v-if="store.view.fields.id" class="id">{{ id }}</div>
        <div class="row-seg">
          <BookRowsLendStatus v-if="store.view.fields.lend" :lend="lend" :rowId="id" @reset-lend="deleteLend"
            @add-lend="addLend"></BookRowsLendStatus>
          <BookRowsReadStatus v-if="store.view.fields.readingStatus" :rowId="id" :readingStatus="readingStatus"
            @mark-reading-status="markReadingStatus"></BookRowsReadStatus>
          <div v-if="store.view.fields.name">
            <BookRowsFieldName :cover="cover" :rowId="id" :text="name" :isName="() => true" @update="(rowId, payload) => {
              currentUpdateField = 'name'
              updateItem(rowId, payload)
            }" @update-cover="updateCover"></BookRowsFieldName>
          </div>
          <DeleteButton v-if="store.view.control.delete" @click="deleteItem(id)"></DeleteButton>
        </div>
        <div class="row-seg">
          <div v-if="store.view.fields.author">
            <EditableText :rowId="id" :text="author" @update="(rowId, payload) => {
              currentUpdateField = 'author'
              updateItem(rowId, payload)
            }"></EditableText>
          </div>
          <EditableText v-if="store.view.fields.publishing" :rowId="id" :text="publishing" @update="(rowId, payload) => {
            currentUpdateField = 'publishing'
            updateItem(rowId, payload)
          }"></EditableText>
          <EditableText v-if="store.view.fields.published" :rowId="id" :text="published" @update="(rowId, payload) => {
            currentUpdateField = 'published'
            updateItem(rowId, payload)
          }"></EditableText>
        </div>
        <div class="row-seg">
          <BookRowsInlineTags v-if="store.view.fields.categories" :categories="categories" :rowId="id" @add-tag="addTag"
            @delete-tag="deleteTag"></BookRowsInlineTags>
          <!-- <BookRowsTags v-if="store.view.control.categories" :categories="categories" :rowId="id" @add-tag="addTag">
          </BookRowsTags> -->
        </div>
      </div>
    </template>
  </BaseDataRows>
  <ContextMenu @view="openDetail(targetId)" @delete="deleteItem(targetId)">
  </ContextMenu>
</template>

<style scoped>
.row-seg {
  display: inline-grid;
  grid-template-columns: auto;
  grid-auto-flow: column;
  justify-content: left;
  gap: 1px;
  margin-right: 5px;
}

.id {
  display: inline-block;
  text-align: center;
  width: 30px;
  padding: 3px 5px 4px;
  margin-right: 5px;
  background-color: slategray;
}
</style>