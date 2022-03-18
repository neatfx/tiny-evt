<script setup lang="ts">
import BaseButton from './BaseButton.vue';
import FolderPanel from './FolderPanel.vue';

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

</script>

<template>
  <FolderPanel title="Add" :isInlineFixed="true" :isActionMenu="true">
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
      <BaseButton class="btn-submit" @click="$emit('add', state)" text="Submit"></BaseButton>
    </div>
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