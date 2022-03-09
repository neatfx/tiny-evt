import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/',
    component: () => import('./pages/ViewA.vue'),
    name: "Home",
    // meta: { title: "首页", icon: "el-icon-s-home" },
  },
  { path: '/b', component: () => import('./pages/ViewB.vue')},
  { path: '/c', component: () => import('./pages/ViewC.vue')},
  { path: '/d', component: () => import('./pages/ViewD.vue')},
  { path: '/preferences', component: () => import('./pages/Preferences.vue')}
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export { routes }
export default router
