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
  padding: 2px 10px 2px 10px;
  border-style: none;
  background-color: grey;
  vertical-align: middle;
  height: 25px;
  margin-top: -4px;
}
input:focus {
  outline: none;
}
</style>