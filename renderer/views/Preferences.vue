<script setup lang='ts'>
import DatabaseImportAndExport from '@comps/preferences/DatabaseImportAndExport.vue';
import DarkMode from '@comps/preferences/DarkMode.vue'
import FolderPanel from '@comps/FolderPanel.vue';
import Testing from '@comps/preferences/Testing.vue'
</script>

<template>
  <FolderPanel class="panel">
    <template #header>
      <div class="header">Testing</div>
    </template>
    <template #body>
      <Testing></Testing>
    </template>
  </FolderPanel>
  <FolderPanel class="panel">
    <template #header>
      <div class="header">数据管理</div>
    </template>
    <template #body>
      <DatabaseImportAndExport></DatabaseImportAndExport>
    </template>
  </FolderPanel>
  <FolderPanel class="panel">
    <template #header>
      <div class="header">用户界面</div>
    </template>
    <template #body>
      <DarkMode></DarkMode>
    </template>
  </FolderPanel>
</template>

<style scoped>
.panel {
  margin: 0 0 10px 60px;
}
.header {
  padding: 4px 15px;
  background-color: darkgray;
}
</style>