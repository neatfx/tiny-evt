<script setup lang="ts">
import BaseButton from './BaseButton.vue';
import { usePagination } from './pagination';

const { total, pages, page, head, prev, next, end } = usePagination()

</script>

<template>
    <BaseButton class="page-info" disabled>{{ total }} Rows / {{ pages }} Pages / P {{ page }}</BaseButton>
    <BaseButton @click="head">Head</BaseButton>
    <BaseButton @click="prev">Prev</BaseButton>
    <BaseButton @click="next">Next</BaseButton>
    <BaseButton @click="end">End</BaseButton>
</template>
<style scoped>
/* .page-info{
    display: inline-block;
    padding: 2px 0;;
    background-color: red;
} */
</style>