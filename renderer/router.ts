import { createRouter, createWebHashHistory } from "vue-router"

import ViewA from './components/ViewA.vue'
import ViewB from './components/ViewB.vue'
import ViewC from './components/ViewC.vue'
import ViewD from './components/ViewD.vue'

const routerHistory = createWebHashHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    { path: '/', component: ViewA },
    { path: '/b', component: ViewB },
    { path: '/c', component: ViewC },
    { path: '/d', component: ViewD },
  ]
})

export default router