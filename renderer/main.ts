import { createApp, defineAsyncComponent } from 'vue'
import './styles/index.css'
import router from './router'

const app = createApp(
  defineAsyncComponent({
    loader: () => import('./layouts/App.vue'),
    delay: 200,
    timeout: 3000
    // loadingComponent: PublicAPIComponent)
    // errorComponent: PublicAPIComponent,
  })
)

app.use(router)
router.isReady().then(() => {
  app.mount('#app')

  navigator.getBattery().then(function(battery) {

    console.log("Battery charging? " + (battery.charging ? "Yes" : "No"));
    console.log("Battery level: " + battery.level * 100 + "%");
    console.log("Battery charging time: " + battery.chargingTime + " seconds");
    console.log("Battery discharging time: " + battery.dischargingTime + " seconds");
  
    battery.addEventListener('chargingchange', function() {
      console.log("Battery charging? " + (battery.charging ? "Yes" : "No"));
    });
  
    battery.addEventListener('levelchange', function() {
      console.log("Battery level: " + battery.level * 100 + "%");
    });
  
    battery.addEventListener('chargingtimechange', function() {
      console.log("Battery charging time: " + battery.chargingTime + " seconds");
    });
  
    battery.addEventListener('dischargingtimechange', function() {
      console.log("Battery discharging time: " + battery.dischargingTime + " seconds");
    });
  
  });
})

