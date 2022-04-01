<script setup lang="ts">
import FolderPanel from '@comps/FolderPanel.vue';
import BaseButton from '@comps/BaseButton.vue';
import BaseInput from '@comps/BaseInput.vue';
import { ref } from 'vue';

const props = defineProps(['categories', 'rowId'])
const emit = defineEmits<{
  (event: 'add-tag', tags: string[], rowId: number): void
  (event: 'delete-tag', tags: string[], rowId: number): void
}>()
const tagInput = ref('')

function addTag() {
  const arr: string[] = Array.from(props.categories)
  if (!arr.includes(tagInput.value)) {
    arr.push(tagInput.value)
  }
  emit('add-tag', arr, props.rowId)
}

function deleteTag(key: number) {
  const arr: string[] = Array.from(props.categories)
  arr.splice(key, 1)
  emit('delete-tag', arr, props.rowId)
}
</script>

<template>
  <FolderPanel :isInlinePanel="true">
    <template #header>
      <BaseButton>标签</BaseButton>
    </template>
    <template #body>
      <div class="wrapper">
        <BaseInput class="input-zone" v-model="tagInput" />
        <BaseButton class="add-btn" @click="addTag">添加</BaseButton>
      </div>
    </template>
  </FolderPanel>
</template>

<style scoped>
.wrapper {
  padding: 5px 0px 5px 5px;
  background-color: darkgrey;
}
.input-zone {
  margin: 0px;

}
.add-btn {
  margin: 0px 0 0;
}
</style>