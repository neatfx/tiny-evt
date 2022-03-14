<script setup lang="ts">

export type IFormFields = {
  status: String;
  friendName: String;
  friendAge: Number;
  defaultAge: Number;
}
// defineProps({
//   // show: Boolean,
// })
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
  <div class="data-form">
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

<style scoped>
button {
  display: block;
  background-color: dimgrey;
  border: none;
  padding: 7px 10px;
  outline: none;
  margin-bottom: 10px;
}
button:hover {
  background-color: lightgrey;
}
.data-form {
  /* display: block; */
  height: 150px;
  /* width: 200px; */
  border: 1px solid dimgrey;
  padding: 5px;
  margin: 0 0 10px 0;
}
</style>