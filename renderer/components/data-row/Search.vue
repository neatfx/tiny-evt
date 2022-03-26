<script setup lang="ts">
import { ref, watch } from 'vue';
import BaseInput from '../BaseInput.vue';
import BaseButton from '../BaseButton.vue';
import { useContactsStore } from '@/stores'

const store = useContactsStore()
const search = ref('')
watch(search, async(newKeyWords) =>{
  await store.search(newKeyWords)
})
</script>
<template>
  <BaseInput v-model="search"/>
  <BaseButton>Search</BaseButton>
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