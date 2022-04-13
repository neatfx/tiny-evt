<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from '@comps/BaseButton.vue';
import BaseInput from '@comps/BaseInput.vue';

const props = defineProps(['categories', 'rowId'])
const emit = defineEmits<{
  (event: 'update-tag:delete', rowId: number, tags: string[]): void
  (event: 'update-tag:add', rowId: number, tags: string[]): void
}>()
const currentTag = ref(100)
const tagInput = ref('')
const showInput = ref(false)

function deleteTag(key: number) {
  const arr: string[] = Array.from(props.categories)
  arr.splice(key, 1)
  emit('update-tag:delete', props.rowId, arr)
}

function addTag() {
  if (tagInput.value === '') {
    showInput.value = false
    return
  }
  const arr: string[] = Array.from(props.categories)
  if (!arr.includes(tagInput.value)) {
    arr.push(tagInput.value)
  }
  emit('update-tag:add', props.rowId, arr)
  tagInput.value = ''
  showInput.value = false
}
</script>

<template>
  <ul>
    <li v-for="(value, key) in props.categories" :key="key">
      <div class="tag-wrapper" @mouseenter="() => currentTag = key" @mouseleave="() => currentTag = 100">
        <div class="tag-name">
          <span>{{ value }}</span>
        </div>
        <div v-if="currentTag === key" class="delete-btn" @click="deleteTag(key)">
          <span class="cross">+</span>
        </div>
      </div>
    </li>
  </ul>
  <!-- <Transition name="slide-up" mode="out-in"> -->
  <BaseButton v-if="!showInput" @click="showInput = !showInput" class="tag-adder">标签</BaseButton>
  <BaseButton v-else-if="showInput" class="add-btn" @click="addTag">添加</BaseButton>
  <BaseInput v-if="showInput" class="input-zone" v-model="tagInput" />
  <!-- </Transition> -->
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: inline-grid;
  grid-template-columns: auto;
  grid-auto-flow: column;
}

li {
  background-color: slategray;
  margin-right: 2px;
}

.tag-wrapper {
  display: grid;
  position: relative;
}

.tag-name {
  padding: 3px 12px;
}

.delete-btn {
  position: absolute;
  right: 0;
  padding: 4px 10px 3px 12px;
  background-color: darksalmon;
}

.cross {
  display: inline-block;
  transition-property: all;
  transform: rotate(45deg);
}

.input-zone {
  vertical-align: middle;
  /* border: 1px solid red; */
  background-color: lightgray;
}

.input-zone:focus {
  vertical-align: middle;
}

.tag-adder,
.tag-adder:hover {
  background-color: steelblue;
  /* border: 1px solid red; */
}

.add-btn,
.add-btn:hover {
  vertical-align: middle;
  background-color: steelblue;
}

/* Transition */
.slide-up-move,
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateX(2px);
}
</style>