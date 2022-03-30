<script setup lang="ts">
import type { Table } from 'dexie';
import { TestingDB } from '../../db'
import BaseButton from '../BaseButton.vue';

async function clearTables() {
  await TestingDB.table('books').clear();
  await Promise.all(TestingDB.tables.map((table: Table) => {
    table.clear()
  }));
}

async function deleteDatabase() {
  await TestingDB.delete()
}
</script>

<template>
  <div class="wrapper">
    <BaseButton @click="clearTables">清空数据表</BaseButton>
    <BaseButton @click="deleteDatabase">删除数据库</BaseButton>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: auto;
  grid-auto-flow: column;
  justify-content: left;
  gap: 10px;
  padding: 20px 20px;
}
</style>