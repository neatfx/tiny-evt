<script setup lang="ts">
import { reactive } from "vue"

export interface IFormFields {
  friendName: string;
  friendAge: number;
  status: string;
  defaultAge: any;
}

const emit = defineEmits<{
  (e: 'add', data: IFormFields | undefined): void
}>()

const state = reactive({
  showForm: true,
  status: '',
  friendName: '',
  friendAge: 21,
  defaultAge: 21,
})

function toggleForm() {
  state.showForm = !state.showForm
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
    <button @click="emit('add', state)">Submit</button>
    <p>{{ state.status }}</p>
  </div>
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