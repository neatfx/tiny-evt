<script setup lang="ts">
import BaseButton from '@comps/BaseButton.vue';
import BaseInput from '@comps/BaseInput.vue';
import { ref } from 'vue';

const props = defineProps(['categories', 'rowId'])
const emit = defineEmits<{
  (event: 'add-tag', rowId: number, tags: string[]): void
}>()
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
  <Transition name="slide-up" mode="out-in">
    <div class="wrapper">
      <BaseButton v-if="!showInput" @click="showInput = !showInput">标签</BaseButton>
      <div v-if="showInput" @mouseleave="() => { showInput = false; tagInput = '' }">
        <BaseInput class="input-zone" v-model="tagInput" />
        <BaseButton class="add-btn" @click="addsTag">添加</BaseButton>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.wrapper {
  display: inline-block;
}

.input-zone {
  /* width: 80px; */
  /* display: inline-block; */
  /* margin: 0; */
  /* padding: 0px 10px; */
  vertical-align: middle;
  height: 100%;
  background-color: grey;
  /* border: 1px solid red; */
}

.input-zone:focus {
  display: inline-block;
  height: 100%;
}

.add-btn {
  display: inline-block;
  margin: 0 5px 0 0;
}

/* Transition */
.slide-up-move,
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0.2;
  transform: translateX(2px);
}
</style>