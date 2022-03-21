<script setup lang="ts">
import BaseButton from './BaseButton.vue';
import { usePagination } from './pagination';

const { total, pages, page, head, prev, next, end } = usePagination()
const arrow = '<'
const first = 'Head'
</script>

<template>
    <BaseButton disabled>{{ total }} Rows</BaseButton>
    <BaseButton @click="head"  v-html="first"></BaseButton>
    <BaseButton @click="prev" v-html="arrow"></BaseButton>
    <BaseButton disabled>{{ page }} / {{ pages }}</BaseButton>
    <BaseButton @click="next">></BaseButton>
    <BaseButton @click="end">End</BaseButton>
</template>
<style scoped>
</style>