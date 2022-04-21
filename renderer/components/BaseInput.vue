<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
  content?: string
}>()
defineEmits(['update:modelValue'])
const inputVal = ref('')
let inputRef = ref(null)

function startInput(e:any) {
  // console.log(e)
  // const testLength = e.target;
  // console.log(inputVal.value.length)
}
onMounted(() => {
  if (props.content) inputVal.value = props.content
})
</script>

<template>
  <input type="text" @input="$emit('update:modelValue', inputVal)" @keydown="startInput(this)" v-model="inputVal" ref="inputRef"/>
</template>

<style scoped>
input {
  padding: 0px 10px;
  border-style: none;
  background-color: grey;
}

input:focus {
  outline: none;
  height: auto;
}
</style>