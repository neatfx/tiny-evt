<script setup lang='ts'>
import DatabaseImportAndExport from '../components/preferences/DatabaseImportAndExport.vue';
import DarkMode from '../components/preferences/DarkMode.vue'
import FolderPanel from '../components/FolderPanel.vue';
</script>

<template>
  <FolderPanel class="panel">
    <template #header>
      <div class="header">System</div>
    </template>
    <template #body>
      <DarkMode></DarkMode>
    </template>
  </FolderPanel>
  <FolderPanel class="panel">
    <template #header>
      <div class="header">Database</div>
    </template>
    <template #body>
      <DatabaseImportAndExport></DatabaseImportAndExport>
    </template>
  </FolderPanel>
</template>

<style scoped>
.panel{
  margin-bottom: 10px;
}
.header {
  padding: 4px 15px;
  background-color: darkgray;
}
</style>