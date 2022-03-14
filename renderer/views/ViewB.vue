<script setup lang="ts">
import { onMounted, reactive, watch } from "vue";
import type Contact from "@/db/tables/Contact";
import { useTestingStore } from '../stores/testing'
import DataRows from "../components/DataRows.vue"

const store = useTestingStore()
const state = reactive({
  showForm: true,
  status: '',
  friendName: '',
  friendAge: 21,
  defaultAge: 21,
  items: [] as Contact[]
})

function toggleForm() {
  state.showForm = !state.showForm
}

async function addNew() {
  await store.add(state.friendName, state.friendAge)

  state.status = `Friend ${state.friendName} successfully added.`;
  state.friendName = '';
  state.friendAge = state.defaultAge;
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
  <button @click="toggleForm">Add New</button>
  <div id="data-form" v-if="state.showForm">
    <label>
      Name:
      <input v-model="state.friendName" type="text" />
    </label>
    <br />
    <label>
      Age:
      <input v-model="state.friendAge" type="number" />
    </label>
    <br />
    <button @click="addNew">Submit</button>
    <p>{{ state.status }}</p>
  </div>
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
#data-form {
  border: 1px sold lightgrey;
  padding: 5px;
}
</style>