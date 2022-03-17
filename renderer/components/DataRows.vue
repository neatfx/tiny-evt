<script setup lang="ts">
import type { Contact } from '@/db'
import { vContextMenu } from './contextMenu'
import ActionButton from './DataRowEditButton.vue'
import BaseButton from './BaseButton.vue';
import router from '../router'
import ActionPanel from './FolderPanelX.vue'

defineProps<{
  items: Contact[]
}>()

const emit = defineEmits<{
  (e: 'delete', id: number | undefined): void
}>()

function viewRowDetail(e: MouseEvent, paylaod: number | undefined) {
  console.log(e, paylaod)
  router.push('/data-row-detail')
}
</script>

<template>
  <TransitionGroup name="list" tag="ul">
    <li v-for="post in items" :key="post.id" v-context-menu="post.id">
      <BaseButton class="btn-left" text="Type"></BaseButton>
      <BaseButton class="btn-left" text="Progress"></BaseButton>
      <ActionPanel></ActionPanel>
      <a @click="viewRowDetail($event, post.id)">{{ post.id }} - {{ post.name }} @ {{ post.age }}</a>
      <BaseButton @click="emit('delete', post.id)" class="right" text="Delete"></BaseButton>
      <ActionButton></ActionButton>
    </li>
  </TransitionGroup>
</template>

<style scoped>
ul {
  padding: 0;
  margin: 0;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
}
li {
  border: 1px solid grey;
  padding: 5px 0 5px 5px;
  margin-top: -1px;
  list-style: none;
}
li:hover {
  background-color: #2d2f36;
}
a {
  color: gainsboro;
  margin: 0 10px;
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