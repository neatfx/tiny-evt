<script setup lang='ts'>
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
  <div id="theme-info">
    <span>Current Theme:</span>
    <span id="theme-source">{{ state.themeSource }}</span>
  </div>
  <button id="toggle-dark-mode" @click="toggleDarkMode">Toggle Dark Mode</button>
  <button id="reset-to-system" @click="resetToSystem">Reset to System Theme</button>
</template>

<style scoped>
button {
  display: inline-block;
  background-color: dimgrey;
  border: none;
  padding: 7px 10px;
  margin: 0 2px;
  outline: none;
}
button:hover {
  background-color: lightgrey;
}
#theme-info {
  padding: 10px;
  border: 1px solid gray;
  margin: 0 0 5px 2px;
}
</style>