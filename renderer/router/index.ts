import { createRouter, createWebHashHistory } from 'vue-router'
import ViewA from '../views/ViewA.vue'
import ViewB from '../views/ViewB.vue'
import ViewC from '../views/ViewC.vue'
import ViewD from '../views/ViewD.vue'
import ViewPreferences from '../views/ViewPreferences.vue'

const routes = [
  { path: '/', component: ViewA },
  { path: '/b', component: ViewB },
  { path: '/c', component: ViewC },
  { path: '/d', component: ViewD },
  { path: '/preferences', component: ViewPreferences }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export { routes }
export default router
