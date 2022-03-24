<script setup lang="ts">
import { useContactsStore } from '../../../stores'

import BaseButton from '../../BaseButton.vue';
import FolderPanel from '../../FolderPanel.vue';

export type IFormFields = {
  friendName: String;
  friendAge: Number;
}

const state: IFormFields = {
  friendName: 'someone',
  friendAge: 21,
}
const store = useContactsStore()

async function addItem(data: any) {
  await store.add(data.friendName, data.friendAge, 'F', 'user')
}
</script>

<template>
  <FolderPanel title="Add" :isInlineFixed="true" :isActionMenu="true">
    <template #header>
      <BaseButton>New</BaseButton>
    </template>
    <template #body>
      <div class="panel-body">
        <label class="field-name">
          Name:
          <input v-model="state.friendName" type="text" />
        </label>
        <br />
        <label>
          Age:
          <input v-model="state.friendAge" type="number" />
        </label>
        <br />
        <BaseButton class="btn-submit" @click="addItem(state)">Submit</BaseButton>
      </div>
    </template>
  </FolderPanel>
</template>

<style scoped>
.panel-body {
  padding: 20px;
}
.btn-submit {
  margin-top: 15px;
}
</style>