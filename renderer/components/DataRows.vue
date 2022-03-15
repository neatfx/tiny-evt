<script setup lang="ts">
import type { Contact } from '@/db'
import { ref } from 'vue';

defineProps<{
  items: Contact[]
}>()

const docState = ref('saved')

const emit = defineEmits<{
  (e: 'delete', id: number | undefined): void
}>()

const vContextMenu = {
  created: (el: HTMLLIElement, binding: any) => {
    el.oncontextmenu = (e: MouseEvent) =>{
      console.log('contextMenu', binding)
    }
  }
}
</script>

<template>
  <TransitionGroup name="list" tag="ul">
    <li v-for="post in items" :key="post.id" v-context-menu="post.id">
      <button class="btn-left">Act-1</button>
      <button class="btn-left">Act-2</button>
      <a>{{ post.id }} - {{ post.name }} - {{ post.age }}</a>
      <button
        @click="emit('delete', post.id)"
        class="right"
      >Delete</button>
      <Transition name="slide-up" mode="out-in" class="right">
        <button v-if="docState === 'saved'" @click="docState = 'edited'">Edit</button>
        <button v-else-if="docState === 'edited'" @click="docState = 'editing'">Save</button>
        <button v-else-if="docState === 'editing'" @click="docState = 'saved'">Cancel</button>
      </Transition>
    </li>
  </TransitionGroup>
</template>

<style scoped>
ul {
  border: 1px solid grey;
  padding: 0;
  margin: 0;
}
li {
  display: block;
  margin-left: 0;
  border-bottom: 1px solid grey;
  padding: 5px 0 5px 5px;
  color: gainsboro;
}
li:last-child {
  border-bottom: none;
}
li:hover {
  background-color: #2d2f36;
}
button {
  background-color: dimgrey;
  border: none;
  padding: 7px 10px;
  outline: none;
  margin-right: 5px;
}
button:hover {
  background-color: lightgrey;
}
.right {
  float: right;
}

/* Transition */
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}

/* .slide-up-move,
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
} */
</style>