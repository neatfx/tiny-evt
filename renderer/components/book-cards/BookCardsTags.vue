<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from '@comps/BaseButton.vue';
import BaseInput from '@comps/BaseInput.vue';

const props = defineProps(['categories', 'rowId'])
const emit = defineEmits<{
  (event: 'delete-tag', tags: string[], rowId: number): void
  (event: 'add-tag', rowId: number, tags: string[]): void
}>()
const currentTag = ref(100)

function deleteTag(key: number) {
  const arr: string[] = Array.from(props.categories)
  arr.splice(key, 1)
  emit('delete-tag', arr, props.rowId)
}

const tagInput = ref('')
const showInput = ref(false)

function addsTag() {
  console.log(tagInput.value)
  if (tagInput.value === '') {
    showInput.value = false
    return
  }
  const arr: string[] = Array.from(props.categories)
  if (!arr.includes(tagInput.value)) {
    arr.push(tagInput.value)
  }
  emit('add-tag', props.rowId, arr)
  tagInput.value = ''
  showInput.value = false
}
</script>

<template>
  <div class="wrapper">
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

    <!-- <Transition name="slide-up" mode="out-in"> -->
      <BaseButton v-if="!showInput" @click="showInput = !showInput">标签</BaseButton>
      <BaseButton v-else-if="showInput" class="add-btn" @click="addsTag">添加</BaseButton>
    <!-- </Transition> -->
    <Transition name="slide-up" mode="out-in">
      <BaseInput v-if="showInput" class="input-zone" v-model="tagInput" />
    </Transition>
  </div>
</template>

<style scoped>
.wrapper {
  display: inline-grid;
  grid-template-columns: auto;
  grid-auto-flow: column;
}

li {
  background-color: khaki;
  margin-right: 1px;
}

.tag-wrapper {
  display: grid;
  position: relative;
}

.tag-name {
  padding: 3px 8px;
}

.delete-btn {
  position: absolute;
  right: 0;
  padding: 4px 10px 3px 12px;
  background-color: lightcoral;
}

.cross {
  display: inline-block;
  transition-property: all;
  transform: rotate(45deg);
}

.input-zone {
  vertical-align: middle;
}

.input-zone:focus {
  vertical-align: middle;
}

.add-btn {
  margin-right: 0;
  vertical-align: middle;
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