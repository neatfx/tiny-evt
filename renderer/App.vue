<script setup lang="ts">
import { RouterView } from "vue-router"
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="wrapper">
    <div class="nav-wrapper">
      <Navbar></Navbar>
    </div>
    <div class="view-wrapper">
      <RouterView v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </RouterView>
    </div>
  </div>
</template>

<style>
@import "assets/base.css";

#app {
  /* border: 1px solid green; */
  height: 100vh;
  background-color: #333842;
}

.wrapper {
  display: grid;
  grid-template-columns: 135px 1fr;
  height: 100vh;
  /* border: 1px solid blue; */
}
.nav-wrapper {
  padding: 10px;

  /* border: 1px solid red; */
}
.view-wrapper {
  padding: 10px 5px 0;

  /* border: 1px solid red; */
}

/* .logo {
  display: block;
  margin: 0 auto 2rem;
} */

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

@media (min-width: 1024px) {
}
</style>
