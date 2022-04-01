<script setup lang="ts">
import router from '@/router'
import { useBooksStore } from '@/stores'

import BaseDataRows from '@comps/data-row/BaseRows.vue'
import DataRowStatus from '@/components/data-row/ContactRowStatus.vue'
import DeleteButton from '@comps/DeleteButton.vue'
import ContextMenu from "@/components/data-row/RowsContextMenu.vue"
import { vContextMenu, useContextMenu } from '@comps/contextMenu'
import BookRowsTags from '@comps/data-row/BookRowsTags.vue'
import BookRowsInlineTags from '@comps/data-row/BookRowsInlineTags.vue'
import BookRowsCover from '@comps/data-row/BookRowsCover.vue'

const props = defineProps(['items'])
const store = useBooksStore()
const { targetId } = useContextMenu();

function openDetail(rowId: number | undefined) {
  router.push('/data-row-detail/' + rowId)
}

async function updateItem(key: number | undefined) {
  console.log('Delete item by ID ', key)
  // if (key) await store.update(key)
}

async function deleteItem(key: number | undefined) {
  // console.log('Delete item by ID ', key)
  if (key) await store.delete(key)
}

async function addTag(tags: string[], rowId: number) {
  console.log('add tag', tags, rowId)
  store.updateTest(rowId, {
    categories: tags
  })
}

async function deleteTag(tags: string[], rowId: number) {
  console.log('delete tag', tags, rowId)
  store.updateTest(rowId, {
    categories: tags
  })
}
</script>

<template>
  <BaseDataRows :items="props.items">
    <template #item="{ id, name, author, categories, publishing, cover }">
      <div class="row" v-context-menu="id">
        <div class="left">
          <div v-if="store.view.fields.id" class="id">{{ id }}</div>
          <DataRowStatus v-if="store.view.fields.status"></DataRowStatus>
          <BookRowsCover :cover="cover"></BookRowsCover>
          <div
            v-if="store.view.fields.name"
            class="title"
            @click="openDetail(id)"
          >{{ '《 ' + name + ' 》' }}</div>
          <BookRowsInlineTags
            v-if="store.view.fields.categories"
            :categories="categories"
            :rowId="id"
            @add-tag="addTag"
            @delete-tag="deleteTag"
          ></BookRowsInlineTags>
          <div v-if="store.view.fields.author" class="title">{{ author }}</div>
          <div v-if="store.view.fields.publishing" class="title">{{ publishing || "N" }}</div>
        </div>
        <div class="right">
          <BookRowsTags
            v-if="store.view.control.categories"
            :categories="categories"
            :rowId="id"
            @add-tag="addTag"
            @delete-tag="deleteTag"
            class="right"
          ></BookRowsTags>
          <!-- <DataRowEditButton v-if="store.view.control.edit" class="right" @click="updateItem(id)"></DataRowEditButton> -->
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