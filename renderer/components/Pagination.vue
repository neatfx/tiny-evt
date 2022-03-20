<script setup lang="ts">
import BaseButton from './BaseButton.vue';
import { usePagination } from './pagination';

const { offset, limit, total, pages, head,prev,next,end } = usePagination()

</script>
<template>
    <BaseButton @click="head">Head</BaseButton>
    <BaseButton @click="prev">Prev</BaseButton>
    <BaseButton @click="next">Next</BaseButton>
    <BaseButton @click="end">End</BaseButton>
</template>
<style scoped> 
</style>