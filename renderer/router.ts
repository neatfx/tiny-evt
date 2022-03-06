import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: () => import('./pages/ViewA.vue')},
    { path: '/b', component: () => import('./pages/ViewB.vue')},
    { path: '/c', component: () => import('./pages/ViewC.vue')},
    { path: '/d', component: () => import('./pages/ViewD.vue')},
    { path: '/preferences', component: () => import('./pages/Preferences.vue')}
  ]
})

export default router
