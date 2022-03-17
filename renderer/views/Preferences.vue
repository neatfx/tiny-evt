<script setup lang='ts'>
import DBExportImport from '../components/PrefDBExportImport.vue';
import PrefDarkMode from '../components/PrefDarkMode.vue'
import FolderPanel from '../components/FolderPanel.vue';
</script>

<template>
  <FolderPanel title="View">
    <PrefDarkMode></PrefDarkMode>
  </FolderPanel>
  <FolderPanel title="Database">
    <DBExportImport></DBExportImport>
  </FolderPanel>
</template>

<style scoped>
</style>