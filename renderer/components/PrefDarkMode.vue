<script setup lang='ts'>
import BaseButton from '../components/BaseButton.vue';

const { electronDarkMode } = window

const state = {
  themeSource: ''
}

async function toggleDarkMode() {
  const isDarkMode = await electronDarkMode.toggle()
  state.themeSource = isDarkMode ? 'Dark' : 'Light'
}

async function resetToSystem() {
  state.themeSource = await electronDarkMode.system()
}
</script>

<template>
  <div class="wrapper">
    <div id="theme-info">
      <span>Current Theme:</span>
      <span id="theme-source">{{ state.themeSource }}</span>
    </div>
    <BaseButton id="toggle-dark-mode" @click="toggleDarkMode">Toggle Dark Mode</BaseButton>
    <BaseButton id="reset-to-system" @click="resetToSystem">Reset to System Theme</BaseButton>
  </div>
</template>

<style scoped>
.wrapper{
  padding: 20px;
}
#theme-info {
  padding: 4px 5px;
  margin: 0 0 5px 2px;
}
</style>