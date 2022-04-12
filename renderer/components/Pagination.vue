<script setup lang="ts">
import BaseButton from './BaseButton.vue';
import { usePagination } from './pagination';

const { total, head, prev, next, end, curPageStart, curPageEnd } = usePagination()
const arrow = '<'
const first = '首页'
</script>

<template>
    <BaseButton disabled class="page-number">{{ curPageStart }} - {{ curPageEnd }}</BaseButton>
    <BaseButton disabled class="page-number">共 {{ total }} 条数据</BaseButton>
    <BaseButton @click="head" v-html="first"></BaseButton>
    <BaseButton @click="prev" v-html="arrow"></BaseButton>
    <BaseButton @click="next">></BaseButton>
    <BaseButton @click="end" class="tail">末页</BaseButton>
</template>

<style scoped>
button {
    margin-right: 1px;
}
.tail {
    margin-right: 0px;
}
</style>