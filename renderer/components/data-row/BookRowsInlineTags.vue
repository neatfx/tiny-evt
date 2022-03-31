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
  <ul>
    <li v-for="(value, key) in props.categories" :key="key">
      <span class="tag-name">{{ value }}</span>
      <span class="delete-btn" @click="deleteTag(key)">
        <span class="cross">+</span>
      </span>
    </li>
  </ul>
  <!-- <div class="add">
          <BaseInput class="input-zone" v-model="tagInput" />
          <BaseButton class="add-btn" @click="addTag">添加标签</BaseButton>
  </div>-->
</template>

<style scoped>
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
  display: grid;
  grid-auto-flow: column;
  text-align: center;
  background-color: khaki;
  margin-right: 5px;
}
.tag-name {
  padding: 3px 8px;
}
.delete-btn {
  padding: 3px 10px;
  background-color: lightcoral;
}
.cross {
  display: block;
  transition-property: all;
  transform: rotate(45deg);
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