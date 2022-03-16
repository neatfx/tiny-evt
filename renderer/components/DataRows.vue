<script setup lang="ts">
import type { Contact } from '@/db'
import { vContextMenu } from './contextMenu'
import ActionButton from './DataRowEditButton.vue'
import BaseButton from './BaseButton.vue';

defineProps<{
  items: Contact[]
}>()

const emit = defineEmits<{
  (e: 'delete', id: number | undefined): void
}>()
</script>

<template>
  <TransitionGroup name="list" tag="ul">
    <li v-for="post in items" :key="post.id" v-context-menu="post.id">
      <BaseButton class="btn-left" text="Act-1"></BaseButton>
      <BaseButton class="btn-left" text="Act-2"></BaseButton>
      <a>{{ post.id }} - {{ post.name }} - {{ post.age }}</a>
      <BaseButton @click="emit('delete', post.id)" class="right" text="Delete"></BaseButton>
      <ActionButton></ActionButton>
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
</style>