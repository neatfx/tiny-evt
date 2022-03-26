<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>
<template>
  <input v-model="text" />
</template>
<style scoped>
input{
  padding: 7px;
  border-radius: 0;
  border-style: none;
  background-color:grey;
}
input:focus{
  outline: none;
}
</style>