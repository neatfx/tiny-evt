<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps(['categories', 'rowId'])
const emit = defineEmits<{
  (event: 'delete-tag', tags: string[], rowId: number): void
}>()
const currentTag = ref(100)

function deleteTag(key: number) {
  const arr: string[] = Array.from(props.categories)
  arr.splice(key, 1)
  emit('delete-tag', arr, props.rowId)
}
</script>

<template>
  <ul>
    <li v-for="(value, key) in props.categories" :key="key">
      <div
        class="tag-name"
        @mouseenter="() => currentTag = key"
        @mouseleave="() => currentTag = 100"
      >
        <span>{{ value }}</span>
        <div v-if="currentTag === key" class="delete-btn" @click="deleteTag(key)">
          <span class="cross">+</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped>
ul {
  display: grid;
  grid-template-columns: auto;
  grid-auto-flow: column;
  /* justify-content: left; */
  list-style: none;
  padding: 0px;
  margin: 0;
}
li {
  position: relative;
  display: grid;
  /* grid-auto-flow: column; */
  text-align: center;
  background-color: khaki;
  margin-right: 5px;
}
.tag-wrapper {
  border: 1px solid red;
  /* display: inline-block; */
}
.tag-name {
  /* position: relative; */
  padding: 3px 8px;
}
.delete-btn {
  position: absolute;
  top: 29px;
  right: 0;
  padding: 3px 10px;
  background-color: lightcoral;
  z-index: 800;
}
.cross {
  display: inline-block;
  transition-property: all;
  transform: rotate(45deg);
}
</style>