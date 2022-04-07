<script setup lang="ts">
import router from '@/router'
import { useBooksStore } from '@/stores'
import { computed, ref } from 'vue'

import BaseCards from '@comps/data-row/BaseCards.vue'
import BookRowsReadStatus from '@/components/data-row/BookRowsReadStatus.vue'
import { vContextMenu, useContextMenu } from '@comps/contextMenu'
import BookRowsTags from '@comps/data-row/BookRowsTags.vue'
import BookRowsInlineTags from '@comps/data-row/BookRowsInlineTags.vue'
import BookCardsCover from '@comps/data-row/BookCardsCover.vue'
import EditableText from '@comps/EditableText.vue'
import BookRowsLendStatus from '@comps/data-row/BookRowsLendStatus.vue'
import Modal from '@comps/Modal.vue'

const props = defineProps(['items'])
const store = useBooksStore()
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

async function markRead(rowId: number, read: boolean | undefined) {
  store.updateTest(rowId, {
    read: read
  })
}

async function addCover(rowId: number, cover: File | undefined) {
  store.updateTest(rowId, {
    cover: cover
  })
}

const showModal = ref(false)
const currentItem = ref(1)
</script>

<template>
  <Teleport to="body">
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <div class="id">{{ currentItem }}</div>
        <EditableText
          :rowId="currentItem"
          :text="store.items[currentItem - 1]?.name"
          :isName="() => true"
          @update="(rowId, payload) => {
            currentUpdateField = 'name'
            updateItem(rowId, payload)
          }"
        ></EditableText>
      </template>
      <template #body>
        <BookRowsLendStatus
          :lend="store.items[currentItem - 1]?.lend"
          :rowId="currentItem"
          @reset-lend="deleteLend"
          @add-lend="addLend"
        ></BookRowsLendStatus>
        <BookRowsReadStatus
          :rowId="currentItem"
          :read="store.items[currentItem - 1]?.read"
          @mark-read="markRead"
        ></BookRowsReadStatus>
        <BookRowsInlineTags
          v-if="store.view.fields.categories"
          :categories="store.items[currentItem - 1]?.categories"
          :rowId="currentItem"
          @delete-tag="deleteTag"
        ></BookRowsInlineTags>
        <EditableText
          v-if="store.view.fields.author"
          :rowId="currentItem"
          :text="store.items[currentItem - 1]?.author"
          @update="(rowId, payload) => {
            currentUpdateField = 'author'
            updateItem(rowId, payload)
          }"
        ></EditableText>
        <EditableText
          v-if="store.view.fields.publishing"
          :rowId="currentItem"
          :text="store.items[currentItem - 1]?.publishing"
          @update="(rowId, payload) => {
            currentUpdateField = 'publishing'
            updateItem(rowId, payload)
          }"
        ></EditableText>
        <BookRowsTags
          v-if="store.view.control.categories"
          :categories="store.items[currentItem - 1]?.categories"
          :rowId="currentItem"
          @add-tag="addTag"
          class="right"
        ></BookRowsTags>
      </template>
    </modal>
  </Teleport>
  <BaseCards :items="props.items">
    <template #item="{ id, name, author, categories, publishing, cover, lend, read }">
      <div
        class="card-wrapper"
        @click="() => {
          currentItem = id
          showModal = true
        }"
      >
        <BookCardsCover :rowId="id" :cover="cover" @add-cover="addCover"></BookCardsCover>
      </div>
    </template>
  </BaseCards>
</template>

<style scoped>
.card-wrapper {
  display: grid;
  grid-template-columns: 1fr auto;
}
.meta-zone {
  position: absolute;
  padding: 10px;
  border: 1px solid blueviolet;
  background-color: bisque;
}
.id {
  display: inline-block;
  text-align: center;
  width: 30px;
  padding: 4px 5px 0 5px;
  margin-right: 5px;
  background-color: slategray;
}
</style>