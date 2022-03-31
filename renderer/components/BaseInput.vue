<script setup lang="ts">
import { ref } from 'vue';

defineEmits(['update:modelValue'])
const inputVal = ref('')
</script>
<template>
  <input
    type="text"
    @input="$emit('update:modelValue', inputVal)"
    v-model="inputVal"
  />
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