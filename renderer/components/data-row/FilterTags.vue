<script setup lang="ts">
import { useFilter } from './filter'
import BaseButton from "../BaseButton.vue"

const { removeFilter, resetFilter, trans } = useFilter()
defineProps<{
  items: Map<string, Set<string>>
}>()

</script>

<template>
  <!-- <TransitionGroup name="list"> -->
    <div class="wrapper" v-if="items.size">
      <BaseButton @click="resetFilter">Clear All Filters</BaseButton>
      <ul class="filter-tags-wrapper" v-for="key in items.keys()" :key="key">
        <li class="type-li">
          <span class="filter-type">{{ trans(key) }}</span>
        </li>
        <li v-for="v in items.get(key)" :key="key + v">
          <span class="filter-value">{{ v }}</span>
          <span class="btn-delete" @click="removeFilter(key, v)">
            <span class="cross">+</span>
          </span>
        </li>
      </ul>
    </div>
  <!-- </TransitionGroup> -->
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
.type-li {
  padding: 0;
  border: 0;
}
.filter-type {
  display: inline-block;
  padding: 5px 10px 5px;
  margin-right: 0px;
  background-color: teal;
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