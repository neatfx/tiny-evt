<script setup lang="ts">
import { vContextMenu } from './contextMenu'

defineProps(['items'])
</script>

<template>
  <TransitionGroup name="list" tag="ul">
    <li v-if="!items.length">Loading...</li>
    <li v-for="item in items" :key="item.id" v-context-menu="item.id">
      <slot name="item" v-bind="item" />
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

  display: grid;
  grid-template-columns: 1fr auto;
  width: 100%; /* 行动态效果 patch */
}
li:hover {
  background-color: #2d2f36;
}
a {
  color: gainsboro;
  margin: 0 10px;
}

/* Transition */
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>