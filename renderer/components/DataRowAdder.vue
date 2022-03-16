<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from './BaseButton.vue';

export type IFormFields = {
  friendName: String;
  friendAge: Number;
}

defineEmits<{
  (e: 'add', data: IFormFields): void
}>()

const state: IFormFields = {
  friendName: 'someone',
  friendAge: 21,
}
const showDataRowAdder = ref(false)

</script>

<template>
  <BaseButton @click="showDataRowAdder = !showDataRowAdder" text="Add"></BaseButton>
  <div v-if="showDataRowAdder" class="form-wrapper">
    <label class="field-name">
      Name:
      <input v-model="state.friendName" type="text" />
    </label>
    <br>
    <label>
      Age:
      <input v-model="state.friendAge" type="number" />
    </label>
    <br>
    <BaseButton class="btn-submit" @click="$emit('add', state)" text="Submit"></BaseButton>
    <BaseButton @click="showDataRowAdder = false" text="Close"></BaseButton>
  </div>
</template>

<style scoped>
.form-wrapper {
  padding: 15px;
  margin: 10px 0 10px 0;
  background-color:slategray;
}
.btn-submit {
  margin-top: 15px;
}
</style>