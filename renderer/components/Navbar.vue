<script setup lang="ts">
import { RouterLink } from "vue-router"
</script>

<template>
  <nav>
    <RouterLink to="/" data-test-id="/">Insights</RouterLink>
    <RouterLink to="/data-rows" data-test-id="/b">DataRows</RouterLink>
    <RouterLink to="/preferences" data-test-id="/d">Preferences</RouterLink>
  </nav>
</template>

<style scoped>
nav {
  display: grid;
}

nav a.router-link-exact-active {
  color:black;
  background-color: grey;
}

nav a {
  color: black;
  padding: 6px 15px;
  background-color: dimgray;
  cursor: default;
}
nav a:hover {
  background-color: grey;
}
</style>
