<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from '@comps/BaseButton.vue';
import BaseInput from '@comps/BaseInput.vue';
import { useFilter } from '@comps/controller-bar/filter'

const props = defineProps(['categories', 'rowId'])
const emit = defineEmits<{
  (event: 'update-tag:delete', rowId: number, tags: string[]): void
  (event: 'update-tag:add', rowId: number, tags: string[]): void
}>()
const currentTag = ref(100)
const tagInput = ref('')
const showInput = ref(false)
const { filter } = useFilter()

function deleteTag(key: number) {
  const arr: string[] = Array.from(props.categories || [])
  arr.splice(key, 1)
  emit('update-tag:delete', props.rowId, arr)
}

function addTag() {
  if (tagInput.value === '') {
    showInput.value = false
    return
  }
  const arr: string[] = Array.from(props.categories || [])
  if (!arr.includes(tagInput.value)) {
    arr.push(tagInput.value)
  }
  emit('update-tag:add', props.rowId, arr)
  tagInput.value = ''
  showInput.value = false
}

function sendCurrTagToFilter(filterValue: string) {
  filter('categories', filterValue)
}
</script>

<template>
  <ul>
    <li v-for="(value, key) in props.categories" :key="key">
      <div class="tag-wrapper" @mouseenter="() => currentTag = key" @mouseleave="() => currentTag = 100">
        <div class="tag-name" @dblclick="sendCurrTagToFilter(value)">
          <span>{{ value }}</span>
        </div>
        <div v-if="currentTag === key" class="delete-btn" @click="deleteTag(key)">
          <span class="cross"></span>
        </div>
      </div>
    </li>
  </ul>

  <div class="input-wrapper" @mouseleave="() => {
    showInput = false
    tagInput = ''
  }">
    <Transition name="slide-up" mode="out-in">
      <BaseInput v-if="showInput" class="input-zone" v-model="tagInput" />
    </Transition>
    <BaseButton v-if="!showInput" @click="showInput = !showInput" class="tag-adder">+</BaseButton>
    <BaseButton v-else-if="showInput" class="add-btn" @click="addTag">+</BaseButton>
  </div>

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
  background-color: cadetblue;
  margin-right: 6px;
  border-radius: 50rem 50rem 50rem 50rem;
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
  right: -10px;
  top: -10px;
  width: 20px;
  height: 20px;
  padding: 0px 0px 0px 0px;
  background-color: indianred;
  border-radius: 1em;
}

.cross {
  display: inline-block;
  position: relative;
  width: 8px;
  height: 1px;
  top: -6px;
  left: 6px;
  background-color: #333;
}

.input-wrapper {
  position: relative;
}

.input-zone {
  position: absolute;
  vertical-align: middle;
  border-radius: 1rem;
  padding: 7px 0 7px 35px;
  width: 60px;
  background-color: #aaa;
}

.input-zone:focus {
  width: 60px;
  border-radius: 1rem;
  padding: 7px 0 7px 35px;
  vertical-align: middle;
}

.tag-adder,
.tag-adder:hover {
  position: absolute;
  left: 2px;
  top: 2px;
  padding: 3px 9px;
  background-color:slategray;
  border-radius: 1rem;
}

.add-btn,
.add-btn:hover {
  position: absolute;
  left: 2px;
  top: 2px;
  padding: 3px 9px;
  background-color: cadetblue;
  border-radius: 1rem;
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