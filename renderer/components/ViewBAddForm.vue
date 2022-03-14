<script setup lang="ts">

export type IFormFields = {
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
  friendName: '',
  friendAge: 21,
  defaultAge: 21,
}
</script>

<template>
  <div class="data-form">
    <label class="field-name">
      Name:
      <input v-model="state.friendName" type="text" />
    </label>
    <label>
      Age:
      <input v-model="state.friendAge" type="number" />
    </label>
    <button class="btn-submit" @click="$emit('add', state)">Submit</button>
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
.btn-submit {
  margin-top: 15px;
}
.data-form {
  border: 1px solid grey;
  padding: 5px 15px 0;
  margin: 0 0 10px 0;
}
input {
  display: block;
  padding: 8px 10px;
  border: 1px solid red;
  border: none;
  background-color: darkgray;
}
input:focus {
  outline-style: none;
  background-color:ghostwhite;
}
</style>