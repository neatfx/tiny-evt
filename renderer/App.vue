<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"
</script>

<template>
  <div class="wrapper">
    <nav>
      <RouterLink to="/" data-test-id="/">NavA</RouterLink>
      <RouterLink to="/b" data-test-id="/b">NavB</RouterLink>
      <RouterLink to="/c" data-test-id="/c">NavC</RouterLink>
      <RouterLink to="/d" data-test-id="/d">NavD</RouterLink>
    </nav>
  </div>
  <RouterView></RouterView>
</template>

<style scoped>
@import "assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}

/* #root {
  display: grid;
  height: 100vh;
  grid-template-columns: 150px 1fr;
  background-color: #282c34;
} */
/* #content {
  margin-top: 50px;
  border: 1px solid red;
  padding: 15px;
  color: #666666;
} */

header {
  line-height: 1.5;
  /* max-height: 100vh; */
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
  background-color: hsla(160, 100%, 37%, 0.2);
}

nav a.router-link-exact-active:hover {
  /* background-color: transparent; */
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
