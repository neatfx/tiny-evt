<script setup lang="ts">


export type IFormFields = {
  status: String;
  friendName: String;
  friendAge: Number;
  defaultAge: Number;
}
defineProps({
  show: Boolean,
})
defineEmits<{
  (e: 'add', data: IFormFields): void
}>()

const state: IFormFields = {
  status: '',
  friendName: '',
  friendAge: 21,
  defaultAge: 21,
}
</script>

<template>
  <div id="data-form" v-if="show">
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
    <button @click="$emit('add', state)">Submit</button>
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