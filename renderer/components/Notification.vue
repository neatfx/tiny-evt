<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from './BaseButton.vue';

export type IFormFields = {
  friendName: String;
  friendAge: Number;
  defaultAge: Number;
}

defineEmits<{
  (e: 'add', data: IFormFields): void
}>()

const state: IFormFields = {
  friendName: '',
  friendAge: 21,
  defaultAge: 21,
}
const showDataRowAdder = ref(false)

function toggleDataRowAdder() {
  // data.status = `Friend ${data.friendName} successfully added.`;
  // data.friendName = '';
  // data.friendAge = data.defaultAge;
}

</script>

<template>
  <BaseButton class="btn-add" @click="showDataRowAdder = true" text="Add New"></BaseButton>
  <Teleport to="body">
    <div v-if="showDataRowAdder" class="modal">
      <div class="modal-wrapper">
        <label class="field-name">
          Name:
          <input v-model="state.friendName" type="text" />
        </label>
        <label>
          Age:
          <input v-model="state.friendAge" type="number" />
        </label>
        <BaseButton class="btn-submit" @click="$emit('add', state)" text="Submit"></BaseButton>
        <BaseButton @click="showDataRowAdder = false" text="Close"></BaseButton>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 10%;
  /* left: 35%; */
  width: 100%;
  /* margin-left: -150px; */
  /* border: 1px solid grey; */
  padding: 5px 15px 0;
  margin: 0 0 10px 0;
  background-color: dimgray;
 opacity: 0;

}
.modal-wrapper {
  width: 300px;
    z-index: 998;
  /* position: fixed; */
  background-color: red;
}
.btn-submit {
  margin-top: 15px;
}
.btn-add {
  margin-bottom: 10px;
}
</style>