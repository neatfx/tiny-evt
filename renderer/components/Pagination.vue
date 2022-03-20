<script setup lang="ts">
import { watch, watchEffect } from 'vue';
import BaseButton from './BaseButton.vue';
import { usePagination } from './pagination';

const emit = defineEmits<{
  (e: 'change'): void
}>()

const { offset, limit, total, pages, head,prev,next,end } = usePagination(emit)

watch(offset,()=>{
    emit('change')
})
watch(limit,()=>{
    emit('change')
})

</script>
<template>
    <BaseButton @click="head">Head</BaseButton>
    <BaseButton @click="prev">Prev</BaseButton>
    <BaseButton @click="next">Next</BaseButton>
    <BaseButton @click="end">End</BaseButton>
</template>
<style scoped> 
</style>