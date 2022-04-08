<script setup lang="ts">
import { useBooksStore } from '@/stores'
import { ref } from 'vue'

import BaseCards from '@comps/data-row/BaseCards.vue'
import BookRowsReadStatus from '@/components/data-row/BookRowsReadStatus.vue'
import BookRowsTags from '@comps/data-row/BookRowsTags.vue'
import BookRowsInlineTags from '@comps/data-row/BookRowsInlineTags.vue'
import EditableText from '@comps/EditableText.vue'
import BookRowsLendStatus from '@comps/data-row/BookRowsLendStatus.vue'
import Modal from '@comps/Modal.vue'
import { computed } from '@vue/reactivity'

const props = defineProps(['items'])
const store = useBooksStore()
const currentUpdateField = ref('')

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
const curItemIndex = ref(1)
const curItemId = computed(() => {
  return curItemIndex.value + 1
})

function showMore(bookId: number, ifShowModal: boolean) {
  curItemIndex.value = bookId
  showModal.value = ifShowModal
}
</script>

<template>
  <Teleport to="body">
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <div class="id">{{ curItemId }}</div>
        <EditableText
          :rowId="store.items[curItemIndex]?.id"
          :text="store.items[curItemIndex]?.name"
          :isName="() => true"
          @update="(rowId, payload) => {
            currentUpdateField = 'name'
            updateItem(rowId, payload)
          }"
          class="book-name"
        ></EditableText>
      </template>
      <template #body>
        <BookRowsLendStatus
          :rowId="store.items[curItemIndex]?.id"
          :lend="store.items[curItemIndex]?.lend"
          @reset-lend="deleteLend"
          @add-lend="addLend"
        ></BookRowsLendStatus>
        <BookRowsReadStatus
          :rowId="store.items[curItemIndex]?.id"
          :read="store.items[curItemIndex]?.read"
          @mark-read="markRead"
        ></BookRowsReadStatus>
        <div>
          <title>作者</title>
          <EditableText
            v-if="store.view.fields.author"
            :rowId="store.items[curItemIndex]?.id"
            :text="store.items[curItemIndex]?.author"
            @update="(rowId, payload) => {
              currentUpdateField = 'author'
              updateItem(rowId, payload)
            }"
          ></EditableText>
        </div>
        <div>
          <EditableText
            v-if="store.view.fields.publishing"
            :rowId="store.items[curItemIndex]?.id"
            :text="store.items[curItemIndex]?.publishing"
            @update="(rowId, payload) => {
              currentUpdateField = 'publishing'
              updateItem(rowId, payload)
            }"
          ></EditableText>
        </div>
        <div class="tags-zone">
          <BookRowsInlineTags
            v-if="store.view.fields.categories"
            :rowId="store.items[curItemIndex]?.id"
            :categories="store.items[curItemIndex]?.categories"
            @delete-tag="deleteTag"
            class="inline-tags"
          ></BookRowsInlineTags>
          <BookRowsTags
            v-if="store.view.control.categories"
            :rowId="store.items[curItemIndex]?.id"
            :categories="store.items[curItemIndex]?.categories"
            @add-tag="addTag"
            class="tag-adder"
          ></BookRowsTags>
        </div>
      </template>
    </modal>
  </Teleport>
  <BaseCards :items="props.items" @show-more="showMore"></BaseCards>
</template>

<style scoped>
.id {
  display: inline-block;
  text-align: center;
  width: 30px;
  padding: 4px 5px 0 5px;
  margin-right: 5px;
  background-color: slategray;
}
.book-name {
  background: none;
}
.tags-zone {
  margin-top: 10px;
}
.inline-tags {
  float: left;
  /* display: inline-block; */
}
.tag-adder {
  margin-top: 5px;
  display: block;
}
</style>