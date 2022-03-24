<script setup lang="ts">
import { useFilter } from './filter'
import BaseButton from "../BaseButton.vue"

const { removeFilter, resetFilter } = useFilter()
defineProps(['items'])

function resetAllFilters() {
  resetFilter()
  // usePagination().reset()
}
</script>

<template>
    <ul id="filter-tags-wrapper" v-if="Object.keys(items).length">
      <li>      <BaseButton @click="resetAllFilters">Reset Filter</BaseButton></li>
      <li v-for="(v, k) in items" :key="k" class="filter-item">
        <span class="filter-type">{{ k }}</span>
        <span class="filter-type">is</span>
        <span class="filter-value">{{ v }}</span>
        <span class="btn-delete" @click="removeFilter(k.toString())">
          <!-- <span class="icon-cross"></span> -->
          X
        </span>
      </li>
    </ul>
</template>

<style scoped>
/* 过滤器标签 */
#filter-tags-wrapper {
  display: grid;
  grid-template-columns: auto;
  grid-auto-flow: column;
  gap: 10px;
  list-style: none;
  justify-content: left;
  padding: 10px;
  border: 1px solid grey;
}
li {
  float: left;
  /* background-color: cadetblue; */
}
.filter-item {
  margin-right: 10px;
}
.filter-type {
  display: inline-block;
  padding: 2px 10px;
  margin-right: 1px;
  background-color: darkkhaki;
}
.filter-value {
  display: inline-block;
  padding: 2px 10px 2px;
  background-color: cadetblue;
}
.btn-delete {
  display: inline-block;
  padding: 2px 10px 2px 10px;
  margin-left: 1px;
  background-color: indianred;
}
.icon-cross {
  /* font-size:large; */
  /* display: inline-block; */
  transition-property: all;
  transform: rotate(45deg);
}
</style>