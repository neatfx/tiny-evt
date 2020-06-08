import { createRouter, createWebHashHistory } from 'vue-router'

import ViewA from './pages/ViewA.vue'
import ViewB from './pages/ViewB.vue'
import ViewC from './pages/ViewC.vue'
import ViewD from './pages/ViewD.vue'
import Preferences from './pages/Preferences.vue'

const routerHistory = createWebHashHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    { path: '/', component: ViewA as never },
    { path: '/b', component: ViewB as never },
    { path: '/c', component: ViewC as never },
    { path: '/d', component: ViewD as never },
    { path: '/preferences', component: Preferences as never }
  ]
})

export default router
