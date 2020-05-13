import { createRouter, createWebHistory } from "vue-router"

import NavA from './views/NavA.vue'
import NavB from './views/NavB.vue'
import NavC from './views/NavC.vue'
import NavD from './views/NavD.vue'
import NavDA from './views/NavDA.vue'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    { path: '/', component: NavA },
    { path: '/b', component: NavB },
    { path: '/c', component: NavC },
    { path: '/d', component: NavD, children: [
        {
          path:"",
          component: NavDA,
        }
      ]
    },
  ]
})

export default router