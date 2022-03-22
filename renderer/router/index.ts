import { createRouter, createWebHashHistory } from 'vue-router'
import ViewInsights from '../views/Insights.vue'
import ViewDataRows from '../views/DataRows.vue'
import ViewDataRowDetail from '../views/DataRowDetail.vue'
import ViewPreferences from '../views/Preferences.vue'

const routes = [
  { path: '/', component: ViewInsights },
  { path: '/data-rows', component: ViewDataRows },
  { path: '/data-row-detail/:id', component: ViewDataRowDetail, props: true },
  { path: '/preferences', component: ViewPreferences }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export { routes }
export default router
