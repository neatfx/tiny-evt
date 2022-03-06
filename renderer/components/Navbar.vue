<template>
  <div id='nav'>
    <router-link to='/' :class="['/' === activeNav ? 'active' : '']" data-test-id="/"> NavA </router-link>
    <router-link to='/b' :class="['/b' === activeNav ? 'active' : '']" data-test-id='/b'> NavB </router-link>
    <router-link to='/c' :class="['/c' === activeNav ? 'active' : '']" data-test-id='/c'> NavC </router-link>
    <router-link to='/d' :class="['/d' === activeNav ? 'active' : '']" data-test-id='/d'> NavD </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const currentLocation = computed(() => {
      const { matched, ...rest } = route || {fullPath: '/c'}
      return rest.fullPath
    })
    watch(() => currentLocation, path => {
      console.log('watch', path)
    })
    return {
      activeNav: currentLocation,
    }
  }
})
</script>

<style scoped>
#nav {
  border: 1px solid blue;
  width: 150px;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  /* column-gap: 1px; */
  background-color: #21252b;
}
#nav a {
  text-align: center;
  color: #666666;
  /* background-color: #21252b; */
  text-decoration-line: none;
  padding: 10px;
}
#nav a:hover {
   background-color: #282c34;
   color:ghostwhite;
}
.active {
  background-color: #282c34;
}
/* .router-link-exact-active {
    color: ghostwhite; 
    background-color: #282c34;
} */
</style>
