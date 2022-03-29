<script setup lang="ts">
import BaseButton from './BaseButton.vue';
import { usePagination } from './pagination';

const { total, pages, page, head, prev, next, end } = usePagination()
const arrow = '<'
const first = '首页'
</script>

<template>
    <BaseButton disabled>共 {{ total }} 条数据</BaseButton>
    <BaseButton @click="head" v-html="first"></BaseButton>
    <BaseButton @click="prev" v-html="arrow"></BaseButton>
    <BaseButton disabled class="page-number">{{ page }} / {{ pages }}</BaseButton>
    <BaseButton @click="next">></BaseButton>
    <BaseButton @click="end" class="tail">末页</BaseButton>
</template>
<style scoped>
button {
    margin-right: 2px;
}
.tail {
    margin-right: 0px;
}
.page-number {
    width: 70px;
}
</style>