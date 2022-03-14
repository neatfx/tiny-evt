<script setup lang="ts">
import type Contact from '@/db/tables/Contact'
import { ref } from 'vue';

defineProps<{
  items: Contact[]
}>()

const docState = ref('saved')

const emit = defineEmits<{
  (e: 'delete', id: number | undefined): void
}>()
</script>

<template>
  <TransitionGroup name="list" tag="ul">
    <li v-for="post in items" :key="post.id">
      <button class="btn-left">Act-1</button>
      <button class="btn-left">Act-2</button>
      {{ post.id }} - {{ post.name }} - {{ post.age }}
      <button
        @click="emit('delete', post.id)"
        class="right"
      >Delete</button>
      <Transition name="slide-up" mode="in-out" class="right">
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
  padding: 6px 0 6px 5px;
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
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>