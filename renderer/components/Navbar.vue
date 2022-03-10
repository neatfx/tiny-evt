<template>
  <nav>
    <RouterLink to="/" data-test-id="/">NavA</RouterLink>
    <RouterLink to="/b" data-test-id="/b">NavB</RouterLink>
    <RouterLink to="/c" data-test-id="/c">NavC</RouterLink>
    <RouterLink to="/d" data-test-id="/d">NavD</RouterLink>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink } from "vue-router"

export default defineComponent({
  components: {
    RouterLink
  }
})
</script>

<style scoped>
nav {
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  row-gap: 5px;
  width: 120px;
  font-size: small;

  /* border: 1px solid #2d2f36; */
}

nav a.router-link-exact-active {
  color: lightgray;
  background-color: #2d2f36;
}

nav a {
  color: dimgray;
  padding: 5px 0 5px 10px;
  border: 1px solid gray;
  /* border-radius: 2px; */
}
nav a:hover {
  background-color: #2d2f36;
}
</style>
