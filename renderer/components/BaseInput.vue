<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>
<template>
  <input v-model="text" />
</template>
<style scoped>
input {
  padding: 8px 0px 6px 5px;
  border-style: none;
  background-color: grey;
}
input:focus {
  outline: none;
}
</style>