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
      <div @mouseenter="() => currentTag = key" @mouseleave="() => currentTag = 100">
        <div class="tag-name">
          <span>{{ value }}</span>
        </div>
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
  grid-auto-flow: column;
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  text-align: center;
  background-color: khaki;
  margin-right: 5px;
}
.tag-name {
  padding: 3px 8px;
}
.delete-btn {
  position: fixed;
  padding: 3px 10px;
  background-color: lightcoral;
}
.cross {
  display: inline-block;
  transition-property: all;
  transform: rotate(45deg);
}
</style>