<script setup lang="ts">
import { useBooksStore } from '@stores/index'

import BaseButton from '../BaseButton.vue';
import BaseInput from '../BaseInput.vue';
import FolderPanel from '../FolderPanel.vue';

const props = defineProps(['showFullAdder'])
defineEmits<{
  (event: 'opent-full-adder'): void;
}>()
const bookData = {
  name: '',
}
function check(): boolean {
  if (!bookData.name) return false
  return true
}

const store = useBooksStore()

async function opentFullAdder(ev: any) {

}

async function addItem() {
  if (!check()) {
    console.log('invalid form')
    return
  }

  await store.add(bookData)
}
</script>

<template>
  <FolderPanel title="Add" :isInlinePanel="true" position="right">
    <template #header>
      <BaseButton>+</BaseButton>
    </template>
    <template #body>
      <div class="panel-body-wrapper">
        <BaseButton class="btn" @click="$emit('opent-full-adder')">{{ props.showFullAdder ? '快速模式' : '完全模式' }}</BaseButton>
        <label v-if="!props.showFullAdder">
          <!-- <span>书名</span> -->
          <BaseInput type="text" :modelValue="bookData.name"
            @update:model-value="newValue => bookData.name = newValue" />
          <BaseButton class="btn-submit btn" @click="addItem">添加</BaseButton>
        </label>
      </div>
    </template>
  </FolderPanel>
</template>

<style scoped>
.panel-body-wrapper {
  display: grid;
  grid-template-columns: auto;
  grid-auto-flow: column;
  gap: 2px;
  padding: 3px;
  background-color: gray;
  /* margin-left: 5px; */
}
.btn{
  background-color: dimgray;
}
.btn:hover{
  background-color:darkgray;
}
label {
  display: grid;
  grid-template-columns: auto;
  grid-auto-flow: column;
  gap: 0px;
}

span {
  font-size: small;
  padding: 5px 10px 0px;
  background-color: dimgray;
  vertical-align: middle;
}

input,
input:focus {
  vertical-align: middle;
  outline: none;
  border: 2px solid dimgray;
  font-size: small;
  height: auto;
}
</style>