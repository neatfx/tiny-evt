<script setup lang="ts">
import BaseButton from './BaseButton.vue';
import { usePagination } from './pagination';

const { total, pages, page, head, prev, next, end } = usePagination()

</script>

<template>
    <BaseButton @click="head">First</BaseButton>
    <BaseButton @click="prev">Prev</BaseButton>
    <BaseButton disabled>{{ page }} / {{ pages }}</BaseButton>
    <BaseButton disabled>{{ total }} Rows</BaseButton>
    <BaseButton @click="next">Next</BaseButton>
    <BaseButton @click="end">Last</BaseButton>
</template>
<style scoped>
</style>