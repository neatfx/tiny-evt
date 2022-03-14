<script setup lang="ts">
import { onMounted, reactive, watch } from "vue"
import type Contact from "@/db/tables/Contact"
import { useTestingStore } from '../stores/testing'

import DataRows from "../components/DataRows.vue"
import ViewBAddFormVue from "../components/ViewBAddForm.vue"

const store = useTestingStore()
const state = reactive({
  showForm: true,
  items: [] as Contact[]
})

function toggle() {
  state.showForm = !state.showForm
}

async function addItem(data: any) {
  await store.add(data.friendName, data.friendAge)

  data.status = `Friend ${data.friendName} successfully added.`;
  data.friendName = '';
  data.friendAge = data.defaultAge;
}

async function deleteItem(key: number | undefined) {
  if (key) await store.delete(key)
}

onMounted(async () => {
  await store.list()

  state.items = store.items
  // console.log(state)
})

watch(
  () => store.items,
  (newValue, oldValue) => {
    console.log('view-b')
    state.items = store.items
  },
  { deep: true }
)
</script>

<template>
  <button @click="toggle">Add New</button>
  <ViewBAddFormVue :show="state.showForm" @add="addItem"></ViewBAddFormVue>
  <DataRows :items="state.items" @delete="deleteItem"></DataRows>
</template>

<style>
button {
  display: inline-block;
  background-color: dimgrey;
  border: none;
  padding: 7px 10px;
  outline: none;
}
button:hover {
  background-color: lightgrey;
}
</style>