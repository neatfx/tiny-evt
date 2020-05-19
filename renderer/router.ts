import { createRouter, createWebHashHistory } from "vue-router"

import ViewA from './components/ViewA.vue'
import ViewB from './components/ViewB.vue'
import ViewC from './components/ViewC.vue'
import ViewD from './components/ViewD.vue'

const routerHistory = createWebHashHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    { path: '/', component: ViewA as never },
    { path: '/b', component: ViewB as never},
    { path: '/c', component: ViewC as never},
    { path: '/d', component: ViewD  as never},
  ]
})

export default router