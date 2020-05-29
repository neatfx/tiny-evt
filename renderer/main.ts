import { createApp, defineAsyncComponent } from 'vue'
import './index.css'
import router from "./router"

const app = createApp(defineAsyncComponent({
  loader: () => import('./App.vue'),
  delay: 200,
  timeout: 3000,
  // loadingComponent: PublicAPIComponent) 
  // errorComponent: PublicAPIComponent,
}))

app.use(router)
router.isReady().then(() => {
    app.mount('#app')
  })