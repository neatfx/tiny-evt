<script setup lang="ts">
import router from '@/router'
import { useBooksStore } from '@/stores'
import { ref } from 'vue'

import BaseDataRows from '@comps/data-row/BaseRows.vue'
import BookRowsReadStatus from '@/components/data-row/BookRowsReadStatus.vue'
import DeleteButton from '@comps/DeleteButton.vue'
import ContextMenu from "@/components/data-row/RowsContextMenu.vue"
import { vContextMenu, useContextMenu } from '@comps/contextMenu'
import BookRowsTags from '@comps/data-row/BookRowsTags.vue'
import BookRowsInlineTags from '@comps/data-row/BookRowsInlineTags.vue'
import BookRowsCover from '@comps/data-row/BookRowsCover.vue'
import EditableText from '@comps/EditableText.vue'
import BookRowsLendStatus from '@comps/data-row/BookRowsLendStatus.vue'

const props = defineProps(['items'])
const store = useBooksStore()
const { targetId } = useContextMenu();
const currentUpdateField = ref('')

function openDetail(rowId: number | undefined) {
  router.push('/data-row-detail/' + rowId)
}

async function updateItem(rowId: number, payload: string) {
  let obj: { [key: string]: string } = {}

  obj[currentUpdateField.value] = payload

  await store.update(rowId, obj)
  currentUpdateField.value = ''
}

async function deleteItem(key: number | undefined) {
  if (key) await store.delete(key)
}

async function addTag(tags: string[], rowId: number) {
  store.updateTest(rowId, {
    categories: tags
  })
}

async function deleteTag(tags: string[], rowId: number) {
  store.updateTest(rowId, {
    categories: tags
  })
}

function deleteLend(rowId: number) {
  store.updateTest(rowId, {
    lend: undefined
  })
}

function addLend(rowId: number, info: string) {
  store.updateTest(rowId, {
    lend: info
  })
}

function markRead(rowId: number, read: boolean | undefined) {
   store.updateTest(rowId, {
    read: read
  })
}
</script>

<template>
  <BaseDataRows :items="props.items">
    <template #item="{ id, name, author, categories, publishing, cover, lend, read }">
      <div class="row" v-context-menu="id">
        <div class="left">
          <div v-if="store.view.fields.id" class="id">{{ id }}</div>
          <BookRowsLendStatus v-if="store.view.fields.status" :lend="lend" :rowId="id" @reset-lend="deleteLend" @add-lend="addLend"></BookRowsLendStatus>
          <BookRowsReadStatus
            v-if="store.view.fields.read"
            :rowId="id"
            :read="read"
            @mark-read="markRead"
          ></BookRowsReadStatus>
          <BookRowsCover :cover="cover"></BookRowsCover>
          <EditableText
            v-if="store.view.fields.name"
            :rowId="id"
            :text="name"
            :isName="() => true"
            @update="(rowId, payload) => {
              currentUpdateField = 'name'
              updateItem(rowId, payload)
            }"
          ></EditableText>
          <BookRowsInlineTags
            v-if="store.view.fields.categories"
            :categories="categories"
            :rowId="id"
            @delete-tag="deleteTag"
          ></BookRowsInlineTags>
          <EditableText
            v-if="store.view.fields.author"
            :rowId="id"
            :text="author"
            @update="(rowId, payload) => {
              currentUpdateField = 'author'
              updateItem(rowId, payload)
            }"
          ></EditableText>
          <EditableText
            v-if="store.view.fields.publishing"
            :rowId="id"
            :text="publishing"
            @update="(rowId, payload) => {
              currentUpdateField = 'publishing'
              updateItem(rowId, payload)
            }"
          ></EditableText>
        </div>
        <div class="right">
          <BookRowsTags
            v-if="store.view.control.categories"
            :categories="categories"
            :rowId="id"
            @add-tag="addTag"
            class="right"
          ></BookRowsTags>
          <DeleteButton v-if="store.view.control.delete" class="right" @click="deleteItem(id)"></DeleteButton>
        </div>
      </div>
    </template>
  </BaseDataRows>
  <ContextMenu @view="openDetail(targetId)" @delete="deleteItem(targetId)"></ContextMenu>
</template>

<style scoped>
.row {
  display: grid;
  /* grid-template-columns: 1fr autp; */
  grid-auto-flow: column;
  /* justify-content: left; */
}
.id {
  text-align: center;
  width: 30px;
  padding: 4px 5px 0 5px;
  margin-right: 5px;
  background-color: slategray;
}
.title {
  background-color: darkgray;
  padding: 4px 10px;
  margin-right: 5px;
}
.left {
  display: grid;
  /* grid-template-columns: 40px 1fr minmax(0, 300px) auto auto auto; */
  grid-auto-flow: column;
  justify-self: left;
  margin-left: 2px;
  /* border: 1px solid red; */
}
.right {
  display: grid;
  /* grid-template-columns: 1fr auto; */
  grid-auto-flow: column;
  justify-self: right;
  /* border: 1px solid red; */
}
</style>