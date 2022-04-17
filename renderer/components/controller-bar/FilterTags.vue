<script setup lang="ts">
import { useFilter } from './filter'
import { trans } from './translate'

const { removeFilter } = useFilter()
defineProps<{
  items: Map<string, Set<string>>
}>()
</script>

<template>
  <div class="wrapper" v-if="items.size">
    <ul class="filter-tags-wrapper" v-for="key in items.keys()" :key="key">
      <li>
        <span class="filter-value">{{ trans(key) }}</span>
      </li>
      <li v-for="v in items.get(key)" :key="key + v">
        <span class="filter-value">{{ v }}</span>
        <span class="btn-delete" @click="removeFilter(key, v)">
          <span class="cross rotate">+</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.wrapper {
  border-bottom: none;
  padding: 0 5px 5px;
  font-size: small;
  border: 2px solid dimgray;
}

.filter-tags-wrapper {
  display: grid;
  grid-auto-flow: column;
  gap: 10px;
  list-style: none;
  justify-content: left;
  padding: 0px;
  margin: 5px 0 0 0;
}

li {
  border: 2px solid dimgray;
  padding: 2px 2px 2px;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
}

.type-li {
  padding: 0;
  border: 0;
}

.filter-type {
  display: inline-block;
  padding: 6px 15px 6px;
  margin-right: 0px;
  background-color: grey;
}

.filter-value {
  display: inline-block;
  padding: 2px 15px 2px;
  background-color: slategray;
}

.btn-delete {
  display: inline-block;
  padding: 2px 8px 2px 8px;
  margin-left: 2px;
  background-color: lightcoral;
}

.cross {
  font-size: small;
  display: inline-block;
  transition-property: all;
  transform: rotate(45deg);
}
</style>