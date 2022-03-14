<script setup lang="ts">
import { reactive } from "vue";
import DataRows from "../components/DataRows.vue"
import { useMainStore } from '../stores/list'

const state = reactive({
  showForm: true,
  status: '',
  friendName: '',
  friendAge: 21,
  defaultAge: 21
})

function toggleForm() {
  state.showForm = !state.showForm
}

async function addNew() {
  const itemsStore = useMainStore()
  await itemsStore.addTestingItems(state.friendName, state.friendAge)

  //   this.status = `Friend ${this.friendName} successfully added. Got id ${id}`;
  state.friendName = '';
  state.friendAge = state.defaultAge;
}
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
  <DataRows></DataRows>
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