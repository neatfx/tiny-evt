<script setup lang="ts">
import { ref } from 'vue';
import BaseInput from './BaseInput.vue';

const search = ref<string>()
function typing(e){
console.log(e)
}
</script>
<template>
  <BaseInput text="Search" @change="typing"/>
</template>
<style scoped>
input{
  padding: 7px;
  border-radius: 0;
  border-style: none;
  background-color:grey;
}
input:focus{
  /* border-style: none; */
  outline: none;
}
</style>