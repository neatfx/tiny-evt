<script setup lang="ts">
defineProps(['items'])
</script>

<template>
  <TransitionGroup name="list" tag="ul">
    <li v-if="!items.length" class="no-data">无数据</li>
    <li v-for="item in items" :key="item.id">
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
  /* border: 1px solid grey; */
  padding: 5px 0 5px 3px;
  margin-bottom: 1px;
  list-style: none;
  background-color:dimgrey;
  border-radius: 1rem 0 0 0;
}
li:hover {
  background-color:gray;
}
.no-data {
  background-color: grey;
  text-align: center;
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
  transform: translateY(-5px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>