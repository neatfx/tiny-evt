<script setup lang="ts">
import { onMounted } from "vue"

import { useTestingStore, } from '../stores/testing'

import DataRowsFilter from '../components/DataRowsFilter.vue'
import DataRowAdder from "../components/DataRowAdder.vue"
import DataRows from "../components/DataRows.vue"
import ContextMenu from "../components/DataRowContextMenu.vue"

const store = useTestingStore()

async function addItem(data: any) {
  await store.add(data.friendName, data.friendAge)
}

async function deleteItem(key: number | undefined) {
  if (key) await store.delete(key)
}

function filterDataRows(e) {
  console.log(e.target.value)
}

onMounted(async () => {
  await store.list()
})
</script>

<template>
  <div class="action-bar">
    <DataRowsFilter @change="filterDataRows"></DataRowsFilter>
    <DataRowAdder @add="addItem"></DataRowAdder>
  </div>
  <DataRows :items="store.items" @delete="deleteItem"></DataRows>
  <ContextMenu @delete="deleteItem"></ContextMenu>
</template>

<style scoped>
.action-bar {
  margin-bottom: 10px;
}
</style>