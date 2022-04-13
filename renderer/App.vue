<script setup lang="ts">
import { RouterView } from "vue-router"
import { useContextMenu } from './components/contextMenu'
import BaseButton from '@comps/BaseButton.vue';
import FolderPanel from '@comps/FolderPanel.vue';

import Navbar from './components/Navbar.vue'
import Indicator from '@comps/Indicator.vue'
import { useBooksStore } from '@/stores'

useContextMenu();
const store = useBooksStore()
</script>

<template>
  <div class="app-wrapper">
    <FolderPanel title="MainNav" :isPopMenu="true" class="main-nav">
      <template #header>
        <BaseButton>导航</BaseButton>
      </template>
      <template #body>
        <Navbar></Navbar>
      </template>
    </FolderPanel>
    <div class="view-wrapper">
      <RouterView v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </RouterView>
    </div>
    <Teleport to="body">
      <Indicator :show="store.indicator"></Indicator>
    </Teleport>
  </div>
</template>

<style>
@import "assets/base.css";

.main-nav {
  position: fixed;
  margin: 7px 0 0 5px;
}

.app-wrapper {
  height: 100vh;
}

.view-wrapper {
  padding: 7px 5px;
}

a {
  text-decoration: none;
  transition: 0.4s;
}

@media (min-width: 1024px) {}
</style>
