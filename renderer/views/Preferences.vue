<script setup lang='ts'>
import DBExportImport from '../components/PrefDBExportImport.vue';
import PrefDarkMode from '../components/PrefDarkMode.vue'
import FolderPanel from '../components/FolderPanel.vue';
</script>

<template>
  <FolderPanel class="panel">
    <template #header>
      <div class="header">System</div>
    </template>
    <template #body>
      <PrefDarkMode></PrefDarkMode>
    </template>
  </FolderPanel>
  <FolderPanel class="panel">
    <template #header>
      <div class="header">Database</div>
    </template>
    <template #body>
      <DBExportImport></DBExportImport>
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