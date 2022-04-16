<script setup lang="ts">
import type { Table } from 'dexie';

import { AppDB } from '@/db/index'

import BaseButton from '@comps/BaseButton.vue';

async function clearTables() {
  await AppDB.table('books').clear();
  await Promise.all(AppDB.tables.map((table: Table) => {
    table.clear()
  }));
}

async function deleteDatabase() {
  await AppDB.delete()
}

function switchPicPersisWay() {

}

function enableScheduledBackup() {

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