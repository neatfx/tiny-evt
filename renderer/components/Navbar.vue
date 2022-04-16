<script setup lang="ts">
import { RouterLink } from "vue-router"
</script>

<template>
  <nav>
    <RouterLink to="/" data-test-id="/">统计</RouterLink>
    <RouterLink to="/data-rows" data-test-id="/b">数据管理</RouterLink>
    <RouterLink to="/preferences" data-test-id="/d">设置</RouterLink>
  </nav>
</template>

<style scoped>
nav {
  display: grid;
}

nav a.router-link-exact-active {
  color:black;
  background-color: grey;
  font-size: small;
}

nav a {
  color: black;
  padding: 6px 10px 6px 10px;
  background-color: dimgray;
  cursor: default;
}
nav a:hover {
  background-color: grey;
}
</style>
