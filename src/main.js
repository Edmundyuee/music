import Vue from 'vue'
import App from './App.vue'
import router from './router'
import elementUI from 'element-ui'
import axios from 'axios'
import store from './store/store'
import 'element-ui/lib/theme-chalk/index.css'
import VueTouch from 'vue-touch'
Vue.use(elementUI)
Vue.use(VueTouch,{name:'v-touch'})
Vue.prototype.$axios = axios;
axios.defaults.baseURL = '/api'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  elementUI,
  render: h => h(App)
}).$mount('#app')



