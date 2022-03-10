import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/',
    component: () => import('./views/ViewA.vue'),
    name: "Home",
    // meta: { title: "首页", icon: "el-icon-s-home" },
  },
  { path: '/b', component: () => import('./views/ViewB.vue')},
  { path: '/c', component: () => import('./views/ViewC.vue')},
  { path: '/d', component: () => import('./views/ViewD.vue')},
  { path: '/preferences', component: () => import('./views/Preferences.vue')}
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export { routes }
export default router
