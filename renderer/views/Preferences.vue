<script setup lang='ts'>
import DBExportImport from '../components/PrefDBExportImport.vue';
import PrefDarkMode from '../components/PrefDarkMode.vue'
import FolderPanel from '../components/FolderPanel.vue';
</script>

<template>
  <FolderPanel>
    <PrefDarkMode></PrefDarkMode>
  </FolderPanel>
  <FolderPanel>
    <DBExportImport></DBExportImport>
  </FolderPanel>
</template>

<style scoped>
</style>