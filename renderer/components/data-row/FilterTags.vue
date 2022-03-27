<script setup lang="ts">
import { useFilter } from './filter'
import BaseButton from "../BaseButton.vue"

const { removeFilter, resetFilter } = useFilter()
defineProps(['items'])
</script>

<template>
  <TransitionGroup name="list">
    <div class="wrapper" v-if="items.length">
      <BaseButton @click="resetFilter">Clear All Filters</BaseButton>
      <ul class="filter-tags-wrapper">
        <li v-for="(v, k) in items" :key="k">
          <div class="filter-type">{{ v.type }}</div>
          <span class="filter-is">is</span>
          <span class="filter-value">{{ v.value }}</span>
          <span class="btn-delete" @click="removeFilter(v[0], v[0])">
            <span class="cross">+</span>
          </span>
        </li>
      </ul>
    </div>
  </TransitionGroup>
</template>

<style scoped>
/* 过滤器标签 */
.wrapper {
  border: 1px solid grey;
  padding: 10px;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
}
.filter-tags-wrapper {
  display: grid;
  grid-auto-flow: column;
  gap: 10px;
  list-style: none;
  justify-content: left;
  padding: 0px;
  margin: 10px 0 0 0;
  /* border: 1px solid grey; */
}
li {
  border: 1px solid grey;
  padding: 2px;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
}
.filter-type {
  display: inline-block;
  padding: 2px 15px 2px;
  margin-right: 2px;
  background-color: slategray;
}
.filter-is {
  display: inline-block;
  padding: 2px 10px;
  margin-right: 2px;
  background-color: grey;
}
.filter-value {
  display: inline-block;
  padding: 2px 15px 2px;
  background-color: slategray;
}
.btn-delete {
  display: inline-block;
  padding: 0px 9px 1px 10px;
  margin-left: 2px;
  background-color: lightcoral;
}
.cross {
  font-size: medium;
  display: inline-block;
  transition-property: all;
  transform: rotate(45deg);
}
</style>