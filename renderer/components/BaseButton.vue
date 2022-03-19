<script setup lang="ts">
</script>

<template>
  <button>
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  background-color: dimgrey;
  border: none;
  padding: 7px 10px;
  outline: none;
  margin-right: 5px;
}
button:hover {
  background-color: lightgrey;
}
</style>