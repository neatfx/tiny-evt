<script setup lang="ts">
defineProps(['items'])
</script>

<template>
  <TransitionGroup name="list" tag="ul">
    <li v-if="!items.length">Loading...</li>
    <li v-for="item in items" :key="item.id">
      <slot name="item" v-bind="item" />
    </li>
  </TransitionGroup>
</template>

<style scoped>
ul {
  position: static;
  padding: 0;
  margin: 0;
}
li {
  float: left;
  border: 1px solid grey;
  margin: 10px;
  padding: 0px;
  list-style: none;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
}
li:hover {
  background-color: #2d2f36;
}
.item{
margin:0;
}
/* Transition */
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease-in-out;
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