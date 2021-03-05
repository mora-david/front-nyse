import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import AxiosPlugin from 'vue-axios-cors';

Vue.use(axios, AxiosPlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
