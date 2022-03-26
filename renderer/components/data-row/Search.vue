<script setup lang="ts">
import { ref } from 'vue';
import BaseInput from '../BaseInput.vue';
import BaseButton from '../BaseButton.vue';
import { useContactsStore } from '@/stores'

const store = useContactsStore()
const search = ref<string>()
function go() {
  // console.log(e)
  store.search()
}
</script>
<template>
  <BaseInput text="" @change="typing"/>
  <BaseButton @click="go">Search</BaseButton>
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