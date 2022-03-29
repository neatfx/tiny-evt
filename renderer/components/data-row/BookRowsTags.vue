<script setup lang="ts">
import FolderPanel from '@comps/FolderPanel.vue';
import BaseButton from '@comps/BaseButton.vue';
import BaseInput from '@comps/BaseInput.vue';
import { ref } from 'vue';
import { useBooksStore } from '@/stores'

const props = defineProps(['categories', 'rowId'])
const emit = defineEmits<{
  (event: 'add-tag', tags: string[], rowId: number): void
  (event: 'delete-tag', tags: string[], rowId: number): void
}>()
const on = ref('on')
const off = ref('off')
const tagInput = ref('')

function addTag() {
  const arr: string[] = Array.from(props.categories)
  if (!arr.includes(tagInput.value)){
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
      <BaseButton>分类标签</BaseButton>
    </template>
    <template #body>
      <div class="wrapper">
        <ul>
          <li v-for="(value, key) in props.categories" :key="key">
            <span class="tag-name">{{ value }}</span>
            <span class="delete-btn" @click="deleteTag(key)">+</span>
          </li>
        </ul>
        <div class="add">
          <BaseInput class="input-zone" v-model="tagInput" />
          <BaseButton class="add-btn" @click="addTag">添加标签</BaseButton>
        </div>
      </div>
    </template>
  </FolderPanel>
</template>

<style scoped>
.wrapper {
  padding: 10px;
  background-color: darkgrey;
}
ul {
  display: grid;
  grid-template-columns: auto;
  grid-auto-flow: column;
  justify-content: left;
  list-style: none;
  padding: 0px;
  margin: 0;
}
li {
  padding: 0px 0px;
  text-align: center;
  background-color: khaki;
  margin: 5px;
}
.tag-name {
  padding: 0 10px;
}
.delete-btn {
  display: inline-block;
  padding: 2px 10px;
  background-color: lightcoral;
}
.add {
  display: grid;
  grid-template-columns: auto;
  grid-auto-flow: column;
}
.input-zone {
  display: block;
  margin: 5px;
}
.add-btn {
  margin: 5px;
}
</style>