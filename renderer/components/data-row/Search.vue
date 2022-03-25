<script setup lang="ts">
import { ref } from 'vue';
import BaseInput from '../BaseInput.vue';
import BaseButton from '../BaseButton.vue';

const search = ref<string>()
function typing(e) {
  console.log(e)
}
</script>
<template>
  <BaseInput text="" @change="typing" />
  <BaseButton class="">Search</BaseButton>
</template>
<style scoped>
input {
  padding: 7px;
  border-radius: 0;
  border-style: none;
  background-color: grey;
}
input:focus {
  outline: none;
}
</style>