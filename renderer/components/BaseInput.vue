<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
  content?: string
}>()
defineEmits(['update:modelValue'])
const inputVal = ref('')

onMounted(() => {
  if (props.content) inputVal.value = props.content
})
</script>

<template>
  <input type="text" @input="$emit('update:modelValue', inputVal)" v-model="inputVal" />
</template>

<style scoped>
input {
  padding: 0 10px;
  border-style: none;
  background-color: grey;
  width: max-content;
  height: 100%;
}
input:focus {
  outline: none;
  /* caret-color: goldenrod; */
  width:fit-content;
}
</style>