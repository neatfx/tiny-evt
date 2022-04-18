<script setup lang="ts">
import type { IBooklist } from '@/db';
import { useBooklistsStore } from '@stores/index'

import BaseButton from '../BaseButton.vue';
import BaseInput from '../BaseInput.vue';

const booklistsStore = useBooklistsStore()
const booklistData: IBooklist = {
  name: '',
}

async function addBooklist() {
  await booklistsStore.add(booklistData)
}
</script>

<template>
  <div class="panel-body-wrapper">
    <label>
      <span>书单名称</span>
      <BaseInput type="text" :modelValue="booklistData.name"
        @update:model-value="newValue => booklistData.name = newValue" />
    </label>
    <div class="submit">
      <BaseButton class="btn-submit" @click="addBooklist">添加书单</BaseButton>
    </div>
  </div>
</template>

<style scoped>
.panel-body-wrapper {
  padding: 5px;
  border: 2px solid dimgray;
  border-bottom: none;
  margin-left: 60px;
}

/*  */

.text-fields {
  display: grid;
  gap: 3px;
  /* border: 1px solid red; */
}

label {
  display: grid;
  grid-template-columns: 80px 150px;
  grid-auto-flow: column;
  /* gap: 2px; */
  text-align: center;
}

span {
  font-size: small;
  padding: 5px 10px;
  background-color: dimgray;
}

input,
input:focus {
  vertical-align: middle;
  outline: none;
  border: 3px solid dimgray;
  font-size: small;
  height: auto;
}

/*  */
.submit {
  margin-top: 5px;
  /* border: 1px solid red; */
}

.btn-submit {
  padding: 6px 20px;
  background-color: cornflowerblue;
}

.btn-submit:hover {
  background-color: cornflowerblue;
}
</style>