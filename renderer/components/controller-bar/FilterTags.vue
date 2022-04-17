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
        <span class="filter-type">{{ trans(key) }}</span>
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
  /* border: 1px solid dimgray; */
  padding: 2px 2px 2px;
}

.type-li {
  padding: 0;
  border: 0;
}

.filter-type {
  display: inline-block;
  padding: 2px 15px 2px 10px;
  background-color: grey;
  border-radius: 0 1em 0 0;
}

.filter-value {
  display: inline-block;
  padding: 2px 15px 2px;
  background-color: slategray;
  border-radius: 1em 1em 1em 1em;
}

.btn-delete {
  display: inline-block;
  padding: 2px 8px 2px 8px;
  margin-left: 3px;
  background-color: lightcoral;
  border-radius: 1rem;
}

.cross {
  /* position:absolute; */
  font-size: small;
  display: inline-block;
  transform: rotate(45deg);

}
</style>