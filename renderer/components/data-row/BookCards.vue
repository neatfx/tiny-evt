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
</script>

<template>
  <BaseCards :items="props.items">
    <template #item="{ id, name, author, categories, publishing, cover, lend, read }">
      <div class="card-wrapper">
        <BookCardsCover :rowId="id" :cover="cover" @add-cover="addCover"></BookCardsCover>
        <div v-if="true" class="meta-zone">
          <!-- <div v-if="store.view.fields.id" class="id">{{ id }}</div> -->
          <BookRowsLendStatus
            v-if="store.view.fields.status"
            :lend="lend"
            :rowId="id"
            @reset-lend="deleteLend"
            @add-lend="addLend"
          ></BookRowsLendStatus>
          <BookRowsReadStatus
            v-if="store.view.fields.read"
            :rowId="id"
            :read="read"
            @mark-read="markRead"
          ></BookRowsReadStatus>

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
          <!-- <BookRowsTags
          v-if="store.view.control.categories"
          :categories="categories"
          :rowId="id"
          @add-tag="addTag"
          class="right"
          ></BookRowsTags>-->
        </div>
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
  /* position: absolute; */
  /* float: left; */
}
.id {
  text-align: center;
  width: 30px;
  padding: 4px 5px 0 5px;
  margin-right: 5px;
  background-color: slategray;
}
</style>