import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import leaflet from '../node_modules/leaflet/dist/leaflet.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  leaflet,
  render: h => h(App)
}).$mount('#app')
