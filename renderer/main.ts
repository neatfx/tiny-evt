import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue';
import router from './router'
import './assets/base.css'
import 'uno.css'

// normalize.css
import '@unocss/reset/normalize.css'
// reset.css by Eric Meyer https://meyerweb.com/eric/tools/css/reset/index.html
// import '@unocss/reset/eric-meyer.css'
// preflights from tailwind
// import '@unocss/reset/tailwind.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
