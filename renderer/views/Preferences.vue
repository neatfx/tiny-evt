<script setup lang='ts'>
import DBExportImport from '../components/PrefDBExportImport.vue';
import PrefDarkMode from '../components/PrefDarkMode.vue'
import FolderPanel from '../components/FolderPanel.vue';
</script>

<template>
  <FolderPanel>
    <template #header>
      <div class="header">View</div>
    </template>
    <template #body>
      <PrefDarkMode></PrefDarkMode>
    </template>
  </FolderPanel>
  <FolderPanel>
    <template #header>
      <div class="header">Database</div>
    </template>
    <template #body>
      <DBExportImport></DBExportImport>
    </template>
  </FolderPanel>
</template>

<style scoped>
.header {
  padding: 4px 20px;
  background-color: darkgray;
}
</style>